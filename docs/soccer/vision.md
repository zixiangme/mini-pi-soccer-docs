# 🎥 视觉系统 (dvision)

视觉系统是机器人足球应用的"眼睛"，负责实时感知场地环境、识别目标物体并进行自主定位。

## 📋 系统概述

dvision 模块基于计算机视觉技术，提供完整的场地感知能力：

- **实时目标检测**：识别足球、球门、障碍物、场地标记
- **机器人定位**：基于 AMCL 粒子滤波的自主定位
- **多相机支持**：兼容 USB 相机、GStreamer、ZED 立体相机
- **神经网络检测**：YOLO 深度学习模型
- **数据录制回放**：支持离线分析和算法优化

## 🎯 核心功能

### 1. 目标检测

#### 足球检测
- **检测方法**：颜色分割 + 形状匹配 + YOLO 神经网络
- **追踪算法**：卡尔曼滤波器平滑轨迹
- **输出信息**：
  - 球的位置（相对机器人坐标）
  - 球的速度和方向
  - 检测置信度

```yaml
# 配置示例：dvision/config/ball_detection.yaml
ball_detection:
  color_range:
    h_min: 0
    h_max: 20
    s_min: 100
    v_min: 100
  min_radius: 10
  max_radius: 100
  confidence_threshold: 0.7
```

#### 球门检测
- **检测目标**：己方球门（蓝色）、对方球门（黄色）
- **检测特征**：颜色、形状、位置关系
- **输出信息**：
  - 球门柱位置
  - 球门中心点
  - 距离和角度

#### 障碍物检测
- **检测对象**：对手机器人、裁判、场地边界
- **检测方法**：深度信息 + 颜色分割
- **避障策略**：实时路径规划

#### 场地标记检测
- **检测目标**：
  - 场地线（边线、中线、禁区线）
  - 圆圈（中圈、点球点）
  - 角点（场地四角）
- **用途**：辅助定位和导航

### 2. 机器人定位 (AMCL)

#### 定位原理
使用 **AMCL (Adaptive Monte Carlo Localization)** 粒子滤波算法：

1. **粒子初始化**：在场地上随机分布粒子
2. **运动更新**：根据里程计更新粒子位置
3. **观测更新**：根据视觉观测（场地线、球门）更新粒子权重
4. **重采样**：保留高权重粒子，淘汰低权重粒子
5. **位置估计**：加权平均得到机器人位置

#### 定位精度
- **位置精度**：±5cm
- **角度精度**：±3°
- **更新频率**：30Hz

```yaml
# 配置示例：dvision/config/localization.yaml
amcl:
  min_particles: 500
  max_particles: 5000
  kld_err: 0.01
  kld_z: 0.99
  update_min_d: 0.1
  update_min_a: 0.2
```

### 3. 相机系统

#### 支持的相机类型

**USB 相机 (V4L2)**
```bash
# 启动 USB 相机
roslaunch dvision default.launch camera_type:=v4l2 device:=/dev/video0
```

**GStreamer 流**
```bash
# 启动网络流
roslaunch dvision default.launch camera_type:=gstreamer \
  pipeline:="udpsrc port=5000 ! ..."
```

**ZED 立体相机**
```bash
# 启动 ZED 相机（支持深度信息）
roslaunch dvision default.launch camera_type:=zed
```

#### 相机标定

相机标定用于消除镜头畸变，提高检测精度。

**标定步骤：**

1. 打印棋盘格标定板
2. 运行标定程序：
```bash
rosrun dvision camera_calibration
```
3. 移动标定板采集多个角度的图像
4. 保存标定参数到配置文件

**标定参数示例：**
```yaml
camera_matrix:
  rows: 3
  cols: 3
  data: [615.123, 0.0, 320.0,
         0.0, 615.123, 240.0,
         0.0, 0.0, 1.0]
distortion_coefficients:
  rows: 1
  cols: 5
  data: [-0.123, 0.045, 0.001, -0.002, 0.0]
```

### 4. 图像处理流程

```
原始图像 → 畸变校正 → 颜色空间转换 → 目标检测 → 坐标转换 → 输出结果
   ↓           ↓            ↓            ↓          ↓          ↓
 640x480    去畸变      RGB→HSV      YOLO/传统   像素→世界   VisionInfo
```

#### 坐标系转换

**像素坐标 → 相机坐标 → 机器人坐标 → 世界坐标**

```python
# 坐标转换示例
def pixel_to_world(pixel_x, pixel_y, camera_matrix, robot_pose):
    # 1. 像素坐标 → 相机坐标
    camera_point = inverse_project(pixel_x, pixel_y, camera_matrix)

    # 2. 相机坐标 → 机器人坐标
    robot_point = camera_to_robot_transform(camera_point)

    # 3. 机器人坐标 → 世界坐标
    world_point = robot_to_world_transform(robot_point, robot_pose)

    return world_point
```

## 📊 输出数据格式

### VisionInfo 消息

```python
# ROS 消息定义
VisionInfo:
  header:
    stamp: 时间戳
    frame_id: "base_link"

  # 球信息
  ball:
    detected: True/False
    position: [x, y, z]  # 相对机器人
    velocity: [vx, vy]
    confidence: 0.95

  # 球门信息
  goals:
    - color: "yellow"  # 对方球门
      position: [x, y]
      distance: 3.5
      angle: 0.2
    - color: "blue"    # 己方球门
      position: [x, y]
      distance: 8.0
      angle: 3.14

  # 障碍物
  obstacles:
    - type: "robot"
      position: [x, y]
      radius: 0.2

  # 场地标记
  field_features:
    lines: [...]
    circles: [...]
    corners: [...]

  # 定位信息
  localization:
    position: [x, y, theta]  # 世界坐标
    confidence: 0.85
```

## 🔧 配置与调优

### 检测参数调优

**颜色阈值调整**
```bash
# 启动调试工具
rosrun dvision color_tuner
```

在 GUI 中调整 HSV 阈值，实时查看检测效果。

**YOLO 模型配置**
```yaml
yolo:
  model_path: "/path/to/yolo_model.pt"
  confidence_threshold: 0.5
  nms_threshold: 0.4
  input_size: [416, 416]
```

### 性能优化

**降低分辨率**
```yaml
camera:
  width: 640   # 降低到 320 可提升速度
  height: 480  # 降低到 240 可提升速度
  fps: 30
```

**ROI (感兴趣区域)**
```yaml
roi:
  enabled: true
  x: 0
  y: 240  # 只处理下半部分图像
  width: 640
  height: 240
```

## 🎬 录制与回放

### 录制视觉数据

```bash
# 录制所有视觉话题
rosbag record /vision_info /camera/image_raw /camera/camera_info
```

### 回放数据

```bash
# 回放录制的数据
roslaunch dvision replay.launch bag_file:=/path/to/data.bag
```

### 离线分析

```python
# Python 脚本分析录制数据
import rosbag

bag = rosbag.Bag('data.bag')
for topic, msg, t in bag.read_messages(topics=['/vision_info']):
    if msg.ball.detected:
        print(f"Ball at: {msg.ball.position}")
```

## 🐛 调试工具

### 可视化工具

```bash
# 启动 RViz 可视化
rosrun rviz rviz -d $(rospack find dvision)/rviz/vision.rviz
```

### 图像查看

```bash
# 查看原始图像
rosrun image_view image_view image:=/camera/image_raw

# 查看检测结果
rosrun image_view image_view image:=/dvision/debug_image
```

### 性能监控

```bash
# 查看话题频率
rostopic hz /vision_info

# 查看消息延迟
rostopic delay /vision_info
```

## 📈 性能指标

| 指标 | 数值 |
|------|------|
| 检测帧率 | 30 FPS |
| 球检测精度 | 95% |
| 定位精度 | ±5cm |
| 处理延迟 | <50ms |
| CPU 占用 | ~40% |

## 🔗 相关文档

- [行为决策系统](/soccer/behavior) - 如何使用视觉信息做决策
- [配置管理](/soccer/config) - 视觉参数配置详解
- [完整教程](/tutorials/) - 从零开始部署视觉系统

## 💡 常见问题

**Q: 球检测不准确怎么办？**
A: 调整颜色阈值，确保光照条件良好，使用 `color_tuner` 工具调优。

**Q: 定位漂移怎么办？**
A: 检查场地标记是否清晰，增加粒子数量，调整 AMCL 参数。

**Q: 帧率太低怎么办？**
A: 降低图像分辨率，使用 ROI，关闭不必要的检测功能。

**Q: 如何添加新的检测目标？**
A: 参考现有检测器代码，实现新的检测类，在配置文件中启用。
