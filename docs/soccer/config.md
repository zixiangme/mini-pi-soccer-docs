# ⚙️ 配置管理系统 (dconfig)

配置管理系统提供集中式的参数管理，支持多机器人配置和运行时热重载。

## 📋 系统概述

dconfig 模块的核心功能：

- **集中式配置**：所有模块参数统一管理
- **多机器人支持**：每个机器人独立配置
- **运行时热重载**：无需重启即可更新参数
- **配置监控**：自动检测配置文件变化

## 📁 配置文件结构

```
RoboCup_Workspace/core/src/dconfig/
├── constant.yml          # 场地常量（所有机器人共享）
├── global.yml            # 全局配置
├── 1/                    # 机器人1的配置
│   ├── dvision.yaml      # 视觉参数
│   ├── dmotion.yaml      # 运动参数
│   └── dancer_io.yaml    # 硬件参数
├── 2/                    # 机器人2的配置
│   ├── dvision.yaml
│   ├── dmotion.yaml
│   └── dancer_io.yaml
├── 3/                    # 机器人3的配置
├── 4/                    # 机器人4的配置
├── 5/                    # 机器人5的配置
└── 6/                    # 机器人6的配置
```

## 🏟️ 场地常量配置

### constant.yml

定义球场几何参数，所有机器人共享。

```yaml
dbehavior:
  geometry:
    # 球场尺寸（单位：厘米）
    field_length: 900        # 球场长度
    field_width: 600         # 球场宽度

    # 球门参数
    goal_depth: 60           # 球门深度
    goal_width: 260          # 球门宽度
    goal_height: 180         # 球门高度

    # 禁区参数
    goal_area_length: 20     # 小禁区长度
    goal_area_width: 300     # 小禁区宽度
    penalty_mark_distance: 150  # 点球点距离

    # 场地标记
    center_circle_diameter: 150  # 中圈直径
    border_strip_width: 70       # 边界宽度
    line_width: 5                # 线宽

  robot:
    # 机器人参数
    num_player: 6            # 队伍人数
    max_pitch: 70            # 最大俯仰角
    min_pitch: -15           # 最小俯仰角
    max_yaw: 75              # 最大偏航角
    min_yaw: -75             # 最小偏航角
    walk_speed: 450 / 26     # 行走速度
    turn_speed: 10           # 转向速度

  team:
    teaminfo_outdated: 0.5   # 团队信息过期时间
    ball_share_enabled: False  # 是否共享球信息
    pace: False              # 是否使用节奏控制
```

## 🌍 全局配置

### global.yml

定义比赛相关的全局参数。

```yaml
ZJUDancer:
  # 仿真模式
  Simulation: false
  OfflineRecord: false
  OfflineReplay: false

  # 角色设置
  Role: GCStriker          # 机器人角色
  # 可选值：Striker, Defender, Goalkeeper, GCStriker, GCDefender, GCGoalkeeper

  # 进攻方向
  AttackRight: True        # True: 进攻右侧球门, False: 进攻左侧球门
  AlongGrass: False        # 是否沿草地方向

  # 比赛控制器
  UseGameController: True  # 是否使用比赛控制器
  GameControllerAddress: 192.168.1.84  # 裁判盒IP
  TeamNumber: 17           # 队伍编号
  TeamCyan: true           # 队伍颜色

  # 运动参数
  MotionSimDelay: 5000     # 运动仿真延迟
  ucpBroadcastAddress: "255.255.255.255"  # 广播地址
  BroadcastMVInfo: False   # 是否广播视觉信息
  VisionOnlyMode: False    # 仅视觉模式
```

## 🤖 机器人专属配置

### 视觉配置 (dvision.yaml)

```yaml
camera:
  # 相机参数
  width: 640
  height: 480
  fps: 30
  device: "/dev/video0"

  # 相机内参
  camera_matrix:
    fx: 615.123
    fy: 615.123
    cx: 320.0
    cy: 240.0

  # 畸变系数
  distortion:
    k1: -0.123
    k2: 0.045
    p1: 0.001
    p2: -0.002
    k3: 0.0

detection:
  # 球检测
  ball:
    color_range:
      h_min: 0
      h_max: 20
      s_min: 100
      v_min: 100
    min_radius: 10
    max_radius: 100
    confidence_threshold: 0.7

  # 球门检测
  goal:
    yellow:  # 对方球门
      h_min: 20
      h_max: 40
    blue:    # 己方球门
      h_min: 100
      h_max: 120

localization:
  # AMCL 参数
  min_particles: 500
  max_particles: 5000
  kld_err: 0.01
  update_min_d: 0.1
  update_min_a: 0.2
```

### 运动配置 (dmotion.yaml)

```yaml
motion:
  # 行走参数
  walk:
    step_height: 0.02
    step_length: 0.04
    step_frequency: 2.0
    body_height: 0.25
    max_forward_speed: 0.3
    max_sideward_speed: 0.2
    max_turn_speed: 0.5

  # 踢球参数
  kick:
    forward_power: 0.8
    side_power: 0.6
    chip_power: 0.7
    kick_duration: 0.3

  # 平衡参数
  balance:
    com_offset_x: 0.0
    com_offset_y: 0.0
    gyro_gain: 0.5
    ankle_gain: 0.3
```

### 硬件配置 (dancer_io.yaml)

```yaml
hardware:
  # IMU 参数
  imu:
    enabled: true
    update_rate: 100  # Hz
    calibration:
      gyro_bias: [0.01, -0.02, 0.00]
      accel_bias: [0.0, 0.0, 9.81]

  # 电机参数
  motors:
    max_torque: 2.5  # Nm
    max_speed: 6.0   # rad/s
    position_p_gain: 32.0
    position_i_gain: 0.0
    position_d_gain: 0.0
```

## 🔄 运行时热重载

### Config Watchdog

dconfig 提供配置监控服务，自动检测文件变化并重新加载。

**启动配置监控：**
```bash
roslaunch dconfig default.launch robot_id:=1
```

**工作原理：**
1. 监控配置文件目录
2. 检测文件修改事件
3. 重新加载配置
4. 通知相关模块更新参数

**Python 示例：**
```python
import rospy
from dconfig import ConfigManager

# 创建配置管理器
config = ConfigManager(robot_id=1)

# 注册配置更新回调
def on_config_update(config_name, new_value):
    print(f"Config updated: {config_name} = {new_value}")

config.register_callback('dvision.ball.confidence_threshold',
                         on_config_update)

# 获取配置值
threshold = config.get('dvision.ball.confidence_threshold')

# 更新配置值
config.set('dvision.ball.confidence_threshold', 0.8)
```

## 🛠️ 配置工具

### 查看配置

```bash
# 查看所有配置
rosrun dconfig show_config --robot_id 1

# 查看特定模块配置
rosrun dconfig show_config --robot_id 1 --module dvision

# 查看特定参数
rosrun dconfig get_param --robot_id 1 --key dvision.ball.confidence_threshold
```

### 修改配置

```bash
# 修改参数
rosrun dconfig set_param --robot_id 1 \
  --key dvision.ball.confidence_threshold \
  --value 0.8

# 从文件加载配置
rosrun dconfig load_config --robot_id 1 --file /path/to/config.yaml
```

### 配置验证

```bash
# 验证配置文件语法
rosrun dconfig validate_config --file constant.yml

# 检查配置完整性
rosrun dconfig check_config --robot_id 1
```

## 📝 配置最佳实践

### 1. 机器人标定

每个机器人都应该单独标定：

**相机标定：**
```bash
rosrun dvision camera_calibration --robot_id 1
```

**IMU 标定：**
```bash
rosrun dancer_io imu_calibration --robot_id 1
```

**运动参数调优：**
```bash
rosrun dmotion motion_tuning --robot_id 1
```

### 2. 配置备份

定期备份配置文件：

```bash
# 备份配置
tar -czf config_backup_$(date +%Y%m%d).tar.gz dconfig/

# 恢复配置
tar -xzf config_backup_20260313.tar.gz
```

### 3. 版本控制

使用 Git 管理配置文件：

```bash
cd RoboCup_Workspace/core/src/dconfig
git add .
git commit -m "Update robot 1 vision parameters"
git push
```

## 🔗 相关文档

- [视觉系统](/soccer/vision) - 视觉参数配置
- [行为决策](/soccer/behavior) - 行为参数配置
- [运动控制](/soccer/motion) - 运动参数配置
- [完整教程](/tutorials/) - 配置实战指南

## 💡 常见问题

**Q: 如何为新机器人创建配置？**
A: 复制现有机器人配置目录，修改机器人特定参数（如相机标定）。

**Q: 配置修改后不生效怎么办？**
A: 检查 config_watchdog 是否运行，手动重启相关模块。

**Q: 如何在多个机器人间共享配置？**
A: 将通用参数放在 constant.yml 和 global.yml，机器人特定参数放在各自目录。

**Q: 配置文件格式错误怎么办？**
A: 使用 `validate_config` 工具检查语法，确保 YAML 格式正确。
