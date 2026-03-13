# 🧠 行为决策系统 (dbehavior)

行为决策系统是机器人足球应用的"大脑"，负责根据场上情况做出智能决策，控制机器人的行为和策略。

## 📋 系统概述

dbehavior 模块基于行为树架构，提供分层的决策框架：

- **行为树引擎**：灵活的任务调度和执行
- **多角色支持**：前锋、后卫、守门员、点球手
- **技能系统**：可复用的动作原语
- **团队协作**：多机器人角色分配和协调
- **比赛状态管理**：响应裁判指令

## 🎯 核心概念

### 1. 行为树 (Behavior Tree)

行为树是一种分层决策结构，由节点组成：

**节点类型：**
- **Sequence（顺序）**：依次执行子节点，全部成功才成功
- **Selector（选择）**：依次尝试子节点，一个成功即成功
- **Parallel（并行）**：同时执行多个子节点
- **Decorator（装饰）**：修改子节点行为（重复、反转等）
- **Action（动作）**：执行具体动作
- **Condition（条件）**：检查条件

**示例行为树：**
```
Striker (前锋)
├─ Selector
   ├─ Sequence [踢球]
   │  ├─ Condition: 球在附近?
   │  ├─ Condition: 对准球门?
   │  └─ Action: 踢球
   ├─ Sequence [追球]
   │  ├─ Condition: 看到球?
   │  └─ Action: 走向球
   └─ Action: 搜索球
```

### 2. 角色系统

#### Striker (前锋)
**职责**：主动进攻，追球射门

**行为优先级：**
1. 如果球在脚下且对准球门 → 射门
2. 如果看到球 → 追球
3. 如果球权在队友 → 跑位接应
4. 否则 → 搜索球

**配置参数：**
```yaml
striker:
  kick_distance: 0.15  # 踢球距离阈值
  approach_speed: 0.3  # 接近球的速度
  shoot_angle: 0.3     # 射门角度容差
```

#### Defender (后卫)
**职责**：防守站位，拦截对手

**行为优先级：**
1. 如果对手带球接近 → 拦截
2. 如果球在防守区域 → 清除
3. 否则 → 防守站位

**站位策略：**
- 保持在球和己方球门之间
- 距离球门 1-2 米
- 根据球的位置调整站位

#### Goalkeeper (守门员)
**职责**：守护球门，扑救射门

**行为优先级：**
1. 如果球快速接近 → 扑救
2. 如果球在禁区内 → 出击
3. 否则 → 守门站位

**扑救策略：**
```python
def dive_direction(ball_position, ball_velocity):
    # 预测球的轨迹
    predicted_pos = ball_position + ball_velocity * 0.5

    # 判断扑救方向
    if predicted_pos.x < -0.2:
        return "left"
    elif predicted_pos.x > 0.2:
        return "right"
    else:
        return "center"
```

#### PenaltyKicker (点球手)
**职责**：点球大战专用策略

**执行流程：**
1. 对准球门
2. 选择射门角度（左/右/中）
3. 助跑
4. 射门

### 3. 技能系统 (Skills)

技能是可复用的动作原语，封装了具体的执行逻辑。

**常用技能：**

**WalkToBall（走向球）**
```python
class WalkToBall(Skill):
    def execute(self, blackboard):
        ball = blackboard.get('ball_position')
        robot = blackboard.get('robot_position')

        # 计算目标位置（球后方）
        target = ball - normalize(ball - robot) * 0.2

        # 发送行走指令
        self.motion.walk_to(target)

        # 检查是否到达
        if distance(robot, target) < 0.05:
            return Status.SUCCESS
        return Status.RUNNING
```

**KickBall（踢球）**
```python
class KickBall(Skill):
    def execute(self, blackboard):
        goal = blackboard.get('opponent_goal')
        ball = blackboard.get('ball_position')

        # 计算踢球方向
        kick_direction = normalize(goal - ball)

        # 选择踢球方式
        if abs(kick_direction.angle) < 0.2:
            kick_type = "forward"  # 正脚背
        else:
            kick_type = "side"     # 内脚背

        # 执行踢球
        self.motion.kick(kick_type, power=0.8)
        return Status.SUCCESS
```

**SearchBall（搜索球）**
```python
class SearchBall(Skill):
    def execute(self, blackboard):
        # 原地旋转搜索
        self.motion.turn(speed=0.3)

        # 检查是否找到球
        if blackboard.get('ball_detected'):
            return Status.SUCCESS
        return Status.RUNNING
```

### 4. 黑板系统 (Blackboard)

黑板是行为树节点间共享数据的机制。

**存储的数据：**
```python
blackboard = {
    # 视觉信息
    'ball_position': [x, y],
    'ball_detected': True,
    'opponent_goal': [x, y],
    'own_goal': [x, y],
    'obstacles': [...],

    # 机器人状态
    'robot_position': [x, y, theta],
    'robot_fallen': False,
    'battery_level': 0.85,

    # 比赛信息
    'game_state': 'playing',
    'team_color': 'blue',
    'role': 'striker',

    # 团队信息
    'teammates': [...],
    'ball_owner': 'robot_2',
}
```

## 🎮 比赛状态管理

### 比赛阶段

**Initial（初始）**
- 机器人站立，等待就绪信号
- 不允许移动

**Ready（就绪）**
- 机器人走到初始位置
- 准备开球

**Set（准备）**
- 保持静止
- 等待开球哨声

**Playing（比赛中）**
- 执行角色行为
- 自主决策和行动

**Finished（结束）**
- 停止所有动作
- 等待下一轮

### 裁判指令响应

```python
def handle_game_controller(gc_info):
    if gc_info.state == 'INITIAL':
        robot.stand()
    elif gc_info.state == 'READY':
        robot.walk_to_initial_position()
    elif gc_info.state == 'SET':
        robot.stop()
    elif gc_info.state == 'PLAYING':
        robot.execute_role_behavior()
    elif gc_info.state == 'FINISHED':
        robot.celebrate() if gc_info.team_won else robot.stand()
```

## 🤝 团队协作

### 角色分配

**动态角色分配算法：**
```python
def assign_roles(team_robots, ball_position):
    # 计算每个机器人到球的距离
    distances = [distance(r.position, ball_position) for r in team_robots]

    # 最近的机器人当前锋
    striker_idx = distances.index(min(distances))
    team_robots[striker_idx].role = 'Striker'

    # 其他机器人根据位置分配角色
    for i, robot in enumerate(team_robots):
        if i == striker_idx:
            continue
        if robot.position.y < 0:  # 后场
            robot.role = 'Defender'
        else:  # 前场
            robot.role = 'Supporter'
```

### 信息共享

机器人通过网络共享信息：
- 球的位置
- 自身位置
- 当前角色
- 目标位置

## 🔧 配置与调优

### 行为参数配置

```yaml
# dbehavior/config/behavior.yaml
behavior:
  # 决策频率
  update_rate: 30  # Hz

  # 角色参数
  striker:
    aggressive: 0.8
    kick_distance: 0.15
    approach_speed: 0.3

  defender:
    defensive_distance: 2.0
    intercept_threshold: 1.0

  goalkeeper:
    dive_threshold: 0.5
    position_offset: 0.3

  # 技能参数
  skills:
    walk_speed: 0.25
    turn_speed: 0.5
    kick_power: 0.8
```

### 调试工具

**行为树可视化：**
```bash
# 启动行为树可视化工具
rosrun dbehavior behavior_tree_viewer
```

**日志输出：**
```python
# 在代码中添加日志
self.logger.info(f"Executing skill: {skill_name}")
self.logger.debug(f"Blackboard: {blackboard}")
```

## 📊 性能指标

| 指标 | 数值 |
|------|------|
| 决策频率 | 30 Hz |
| 响应延迟 | <100ms |
| CPU 占用 | ~20% |
| 角色切换时间 | <1s |

## 🔗 相关文档

- [视觉系统](/soccer/vision) - 提供决策所需的感知信息
- [运动控制](/soccer/motion) - 执行决策指令
- [网络通信](/soccer/network) - 团队协作通信

## 💡 常见问题

**Q: 如何添加新的角色？**
A: 创建新的行为树文件，实现角色逻辑，在配置中注册。

**Q: 如何调整决策优先级？**
A: 修改行为树结构，调整 Selector 节点中子节点的顺序。

**Q: 机器人反应太慢怎么办？**
A: 提高 update_rate，优化技能执行效率，减少不必要的计算。

**Q: 如何实现新的技能？**
A: 继承 Skill 基类，实现 execute 方法，在技能库中注册。
