# 运动控制

Mini Pi+ 足球应用的运动控制模块提供了专为足球竞赛优化的运动算法。

## 概述

运动控制模块包含以下核心功能：

- 🚶 **全向行走**：支持任意方向的移动
- ⚽ **踢球动作**：多种踢球方式和力度控制
- 🧤 **守门动作**：扑救、站位、出击
- ⚖️ **平衡控制**：动态平衡算法，防止摔倒
- 🎯 **精确定位**：基于里程计的位置估计

## 全向行走

### 基本用法

```python
from minipi_soccer import SoccerRobot

robot = SoccerRobot()
robot.connect()

# 全向行走：向前 0.5m，向左 0.2m，同时逆时针旋转 30 度
robot.motion.omnidirectional_walk(
    forward=0.5,    # 前进距离（米）
    left=0.2,       # 左移距离（米）
    turn=30,        # 旋转角度（度）
    speed=0.1       # 速度（米/秒）
)
```

### 走向目标点

```python
# 走向指定坐标（相对于当前位置）
target_x = 1.0  # 前方 1 米
target_y = 0.5  # 左侧 0.5 米

robot.motion.walk_to_point(target_x, target_y, speed=0.12)
```

### 面向目标行走

```python
# 边走边保持面向目标
ball_position = (1.5, 0.3)  # 球的位置

robot.motion.walk_to_point_facing(
    target=ball_position,
    face_target=True,  # 始终面向目标
    speed=0.1
)
```

## 踢球动作

### 正脚背踢球

最常用的踢球方式，力量大，精度高。

```python
# 右脚正脚背踢球
robot.motion.kick_forward(
    foot='right',      # 'left' 或 'right'
    power=0.8,         # 力度 0.0-1.0
    direction=0        # 方向角度（度）
)
```

### 内脚背踢球

适合传球和精确射门。

```python
# 左脚内脚背踢球
robot.motion.kick_inside(
    foot='left',
    power=0.6,
    direction=15  # 向右 15 度
)
```

### 挑射

将球踢高，越过障碍物。

```python
# 挑射
robot.motion.kick_chip(
    foot='right',
    power=0.7,
    height=0.3  # 目标高度（米）
)
```

### 智能踢球

根据目标自动选择踢球方式。

```python
# 向球门踢球
goal_position = (5.0, 0.0)  # 球门位置

robot.motion.smart_kick(
    target=goal_position,
    power=0.9,
    prefer_foot='right'  # 优先使用的脚
)
```

## 守门动作

### 守门员站位

```python
# 守门员基本站位
robot.motion.goalkeeper_stance()
```

### 扑救动作

```python
# 向左扑救
robot.motion.dive_left(
    distance=0.5,  # 扑救距离（米）
    speed='fast'   # 'slow', 'medium', 'fast'
)

# 向右扑救
robot.motion.dive_right(distance=0.5, speed='fast')
```

### 出击

```python
# 守门员出击
robot.motion.goalkeeper_rush(
    target=ball_position,
    speed=0.15  # 出击速度
)
```

## 平衡控制

### 启用动态平衡

```python
# 启用平衡控制
robot.motion.enable_balance(True)

# 设置平衡参数
robot.motion.set_balance_params(
    kp=0.5,      # 比例增益
    ki=0.1,      # 积分增益
    kd=0.05      # 微分增益
)
```

### 摔倒恢复

```python
# 检测是否摔倒
if robot.motion.is_fallen():
    print("机器人摔倒了！")

    # 自动起身
    if robot.motion.get_fallen_direction() == 'forward':
        robot.motion.get_up_from_front()
    else:
        robot.motion.get_up_from_back()
```

## 位置估计

### 里程计

```python
# 获取当前位置（相对于起始点）
position = robot.motion.get_position()
print(f"位置: X={position.x:.2f}m, Y={position.y:.2f}m")
print(f"朝向: {position.theta:.1f}°")

# 重置里程计
robot.motion.reset_odometry()
```

### 速度控制

```python
# 设置行走速度（米/秒）
robot.motion.set_velocity(
    vx=0.1,   # 前进速度
    vy=0.05,  # 侧移速度
    vtheta=10 # 旋转速度（度/秒）
)

# 停止运动
robot.motion.stop()
```

## 高级功能

### 动作序列

```python
from minipi_soccer.motion import MotionSequence

# 创建动作序列
sequence = MotionSequence()

# 添加动作
sequence.add_walk(forward=0.5, speed=0.1)
sequence.add_turn(angle=45)
sequence.add_kick(foot='right', power=0.8)

# 执行序列
robot.motion.execute_sequence(sequence)
```

### 自定义动作

```python
# 定义自定义动作
def custom_celebration():
    """庆祝动作"""
    robot.motion.stand()
    time.sleep(0.5)

    # 举起双臂
    robot.motion.set_arm_position('left', angle=90)
    robot.motion.set_arm_position('right', angle=90)
    time.sleep(1)

    # 跳跃
    robot.motion.jump(height=0.05)
    time.sleep(0.5)

    # 恢复
    robot.motion.init_pose()

# 执行自定义动作
custom_celebration()
```

### 轨迹跟踪

```python
# 定义路径点
waypoints = [
    (0.5, 0.0),
    (1.0, 0.5),
    (1.5, 0.5),
    (2.0, 0.0)
]

# 跟踪轨迹
robot.motion.follow_path(
    waypoints=waypoints,
    speed=0.12,
    tolerance=0.05  # 到达容差（米）
)
```

## 性能优化

### 调整步态参数

```python
# 设置步态参数
robot.motion.set_gait_params(
    step_height=0.03,    # 抬脚高度（米）
    step_length=0.08,    # 步长（米）
    step_frequency=2.0   # 步频（Hz）
)
```

### 能耗优化

```python
# 启用节能模式
robot.motion.set_power_mode('eco')  # 'eco', 'balanced', 'performance'

# 自动待机
robot.motion.enable_auto_idle(
    timeout=30  # 30 秒无动作后进入待机
)
```

## 实战示例

### 示例 1：追球并射门

```python
def chase_and_shoot(robot, ball_pos, goal_pos):
    """追球并射门"""

    # 1. 走向球
    robot.motion.walk_to_point_facing(
        target=ball_pos,
        face_target=True,
        speed=0.12
    )

    # 2. 调整位置，使球在脚前
    robot.motion.align_to_ball(ball_pos)

    # 3. 瞄准球门
    robot.motion.face_target(goal_pos)

    # 4. 射门
    robot.motion.smart_kick(
        target=goal_pos,
        power=0.9
    )
```

### 示例 2：守门员防守

```python
def goalkeeper_defend(robot, ball_pos, goal_pos):
    """守门员防守"""

    # 1. 计算最佳站位
    optimal_pos = robot.motion.calculate_goalkeeper_position(
        ball_pos, goal_pos
    )

    # 2. 移动到站位
    robot.motion.walk_to_point(optimal_pos, speed=0.1)

    # 3. 守门员姿态
    robot.motion.goalkeeper_stance()

    # 4. 如果球靠近，扑救
    if distance_to_ball(ball_pos) < 0.5:
        if ball_pos[1] > 0:  # 球在左侧
            robot.motion.dive_left(distance=0.4, speed='fast')
        else:  # 球在右侧
            robot.motion.dive_right(distance=0.4, speed='fast')
```

## 调试技巧

### 可视化运动轨迹

```python
# 启用轨迹记录
robot.motion.enable_trajectory_logging(True)

# 执行动作
robot.motion.walk_forward(distance=1.0)

# 获取轨迹数据
trajectory = robot.motion.get_trajectory()

# 绘制轨迹
import matplotlib.pyplot as plt
plt.plot([p.x for p in trajectory], [p.y for p in trajectory])
plt.show()
```

### 性能监控

```python
# 获取运动统计
stats = robot.motion.get_statistics()
print(f"平均速度: {stats.avg_speed:.2f} m/s")
print(f"最大加速度: {stats.max_accel:.2f} m/s²")
print(f"能耗: {stats.power_consumption:.1f} W")
```

## API 参考

完整的运动控制 API 文档请参考 [API 文档](/guide/api#motion)。

## 下一步

- 学习 [视觉识别](/soccer/vision)
- 了解 [策略规划](/soccer/strategy)
- 查看 [踢球教程](/tutorials/kick)
