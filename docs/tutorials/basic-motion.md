# 基础动作控制

本教程将教你如何控制 Mini Pi+ 机器人的基本动作。

## 学习目标

完成本教程后，你将能够：
- ✅ 连接和初始化机器人
- ✅ 控制机器人站立和蹲下
- ✅ 实现前进、后退和转向
- ✅ 读取传感器数据

## 前置要求

- 完成 [环境配置](/guide/setup)
- Mini Pi+ 机器人一台
- 基础 Python 知识

## 第一步：连接机器人

创建一个新的 Python 文件 `basic_motion.py`：

```python
from minipi import Robot
from minipi.motion import Motion
import time

# 初始化机器人
robot = Robot()

# 连接机器人
print("正在连接机器人...")
if robot.connect():
    print("✅ 连接成功！")
    print(f"机器人 ID: {robot.get_id()}")
    print(f"电池电量: {robot.get_battery()}%")
else:
    print("❌ 连接失败，请检查连接")
    exit(1)

# 初始化运动控制模块
motion = Motion(robot)
```

运行程序，确保能够成功连接机器人。

## 第二步：基本姿态控制

### 站立姿态

```python
# 让机器人站立
print("站立...")
motion.stand()
time.sleep(2)
```

### 蹲下姿态

```python
# 让机器人蹲下
print("蹲下...")
motion.crouch()
time.sleep(2)
```

### 初始姿态

```python
# 回到初始姿态
print("初始姿态...")
motion.init_pose()
time.sleep(2)
```

## 第三步：行走控制

### 前进

```python
# 前进 0.5 米
print("前进...")
motion.walk_forward(distance=0.5, speed=0.1)
time.sleep(3)
```

参数说明：
- `distance`: 行走距离（米）
- `speed`: 行走速度（米/秒），范围 0.05-0.15

### 后退

```python
# 后退 0.3 米
print("后退...")
motion.walk_backward(distance=0.3, speed=0.08)
time.sleep(3)
```

### 侧移

```python
# 向左侧移 0.2 米
print("左侧移...")
motion.walk_left(distance=0.2, speed=0.08)
time.sleep(3)

# 向右侧移 0.2 米
print("右侧移...")
motion.walk_right(distance=0.2, speed=0.08)
time.sleep(3)
```

## 第四步：转向控制

### 原地转向

```python
# 向左转 90 度
print("左转 90 度...")
motion.turn_left(angle=90)
time.sleep(2)

# 向右转 90 度
print("右转 90 度...")
motion.turn_right(angle=90)
time.sleep(2)
```

### 转向到指定角度

```python
# 转向到 45 度（相对于初始方向）
print("转向 45 度...")
motion.turn_to(angle=45)
time.sleep(2)
```

## 第五步：组合动作

将多个动作组合成一个序列：

```python
def square_walk():
    """走一个正方形"""
    print("开始走正方形...")

    for i in range(4):
        print(f"第 {i+1} 边")
        # 前进
        motion.walk_forward(distance=0.5, speed=0.1)
        time.sleep(3)

        # 右转 90 度
        motion.turn_right(angle=90)
        time.sleep(2)

    print("完成！")

# 执行正方形行走
square_walk()
```

## 第六步：读取传感器数据

### 读取 IMU 数据

```python
# 获取姿态角度
orientation = robot.get_orientation()
print(f"Roll: {orientation.roll:.2f}°")
print(f"Pitch: {orientation.pitch:.2f}°")
print(f"Yaw: {orientation.yaw:.2f}°")

# 获取加速度
accel = robot.get_acceleration()
print(f"加速度: X={accel.x:.2f}, Y={accel.y:.2f}, Z={accel.z:.2f}")
```

### 读取力传感器

```python
# 获取脚底压力
left_foot = robot.get_foot_pressure('left')
right_foot = robot.get_foot_pressure('right')

print(f"左脚压力: {left_foot:.2f} N")
print(f"右脚压力: {right_foot:.2f} N")
```

### 读取电池状态

```python
battery = robot.get_battery()
voltage = robot.get_voltage()

print(f"电池电量: {battery}%")
print(f"电池电压: {voltage:.2f} V")
```

## 完整示例程序

将所有内容整合到一起：

```python
from minipi import Robot
from minipi.motion import Motion
import time

def main():
    # 连接机器人
    robot = Robot()
    if not robot.connect():
        print("连接失败")
        return

    print(f"✅ 已连接，电池: {robot.get_battery()}%")

    # 初始化运动控制
    motion = Motion(robot)

    try:
        # 1. 站立
        print("\n1. 站立")
        motion.stand()
        time.sleep(2)

        # 2. 前进
        print("\n2. 前进 0.5 米")
        motion.walk_forward(distance=0.5, speed=0.1)
        time.sleep(3)

        # 3. 转向
        print("\n3. 右转 90 度")
        motion.turn_right(angle=90)
        time.sleep(2)

        # 4. 侧移
        print("\n4. 左侧移 0.3 米")
        motion.walk_left(distance=0.3, speed=0.08)
        time.sleep(3)

        # 5. 读取传感器
        print("\n5. 传感器数据")
        orientation = robot.get_orientation()
        print(f"姿态: Roll={orientation.roll:.1f}°, "
              f"Pitch={orientation.pitch:.1f}°, "
              f"Yaw={orientation.yaw:.1f}°")

        # 6. 回到初始姿态
        print("\n6. 回到初始姿态")
        motion.init_pose()
        time.sleep(2)

        print("\n✅ 教程完成！")

    except KeyboardInterrupt:
        print("\n程序被中断")

    finally:
        # 断开连接
        robot.disconnect()
        print("已断开连接")

if __name__ == "__main__":
    main()
```

## 运行程序

```bash
python basic_motion.py
```

## 常见问题

### 机器人动作不稳定

1. 检查地面是否平整
2. 确认电池电量充足（>30%）
3. 降低行走速度

### 连接超时

1. 检查 USB 连接
2. 重启机器人
3. 检查驱动程序

### 动作执行失败

```python
# 添加错误处理
try:
    motion.walk_forward(distance=0.5)
except Exception as e:
    print(f"动作执行失败: {e}")
```

## 进阶练习

1. **练习 1**: 让机器人走一个圆形
2. **练习 2**: 实现一个"巡逻"功能，在两点之间来回走动
3. **练习 3**: 根据 IMU 数据，让机器人保持平衡

## 下一步

恭喜完成基础动作控制教程！接下来你可以：

- 学习 [踢球动作](/tutorials/kick)
- 了解 [视觉识别](/soccer/vision)
- 查看 [运动控制 API](/guide/api)

## 参考资料

- [Motion API 文档](/guide/api#motion)
- [传感器 API 文档](/guide/api#sensors)
- [示例代码库](https://github.com/your-repo/mini-pi-examples)
