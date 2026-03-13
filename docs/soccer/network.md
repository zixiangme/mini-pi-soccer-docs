# 🌐 网络通信系统 (dnetwork)

网络通信系统负责机器人与比赛控制器、队友之间的通信，实现团队协作和比赛规则遵守。

## 📋 系统概述

dnetwork 模块提供两大核心功能：

- **GameController 通信**：接收裁判指令和比赛状态
- **Team 通信**：机器人间信息共享和协作

## 🎮 比赛控制器 (GameController)

### RoboCup SPL 协议

GameController 使用 RoboCup SPL（标准平台联赛）协议，通过 UDP 广播发送比赛信息。

**协议特点：**
- UDP 端口：3838
- 广播频率：2 Hz
- 数据格式：二进制结构体

### 比赛状态

**比赛阶段：**
```python
GAME_STATE = {
    'INITIAL': 0,      # 初始状态
    'READY': 1,        # 就绪
    'SET': 2,          # 准备开球
    'PLAYING': 3,      # 比赛中
    'FINISHED': 4      # 结束
}
```

**次要状态：**
```python
SECONDARY_STATE = {
    'NORMAL': 0,           # 正常比赛
    'PENALTYSHOOT': 1,     # 点球大战
    'OVERTIME': 2,         # 加时赛
    'TIMEOUT': 3           # 暂停
}
```

### GCInfo 消息

```python
GCInfo:
  # 比赛信息
  game_state: 'PLAYING'
  secondary_state: 'NORMAL'
  first_half: True
  kick_off_team: 'blue'

  # 时间信息
  secs_remaining: 600      # 剩余时间（秒）
  secondary_time: 0

  # 己方队伍信息
  team:
    team_number: 17
    team_color: 'blue'
    score: 2
    penalty_shot: 0
    single_shots: 0

    # 机器人状态
    players:
      - number: 1
        penalty: 'NONE'      # 罚下状态
        secs_till_unpenalised: 0
      - number: 2
        penalty: 'NONE'
      # ...

  # 对方队伍信息
  opponent:
    team_number: 18
    team_color: 'red'
    score: 1
    # ...
```

### 罚下状态

```python
PENALTY = {
    'NONE': 0,                    # 无罚下
    'SPL_ILLEGAL_BALL_CONTACT': 1,  # 非法接触球
    'SPL_PLAYER_PUSHING': 2,        # 推搡
    'SPL_ILLEGAL_MOTION_IN_SET': 3, # SET阶段非法移动
    'SPL_INACTIVE_PLAYER': 4,       # 不活跃
    'SPL_ILLEGAL_DEFENDER': 5,      # 非法防守
    'SPL_LEAVING_THE_FIELD': 6,     # 离开场地
    'SPL_KICK_OFF_GOAL': 7,         # 开球直接进球
    'SPL_REQUEST_FOR_PICKUP': 8,    # 请求拾起
    'SUBSTITUTE': 14,               # 替补
    'MANUAL': 15                    # 手动罚下
}
```

### 使用示例

```python
# 订阅 GameController 信息
def gc_callback(gc_info):
    if gc_info.game_state == 'PLAYING':
        # 比赛中
        robot.execute_behavior()
    elif gc_info.game_state == 'READY':
        # 就绪阶段，走到初始位置
        robot.walk_to_initial_position()
    elif gc_info.game_state == 'SET':
        # 准备开球，保持静止
        robot.stop()

    # 检查是否被罚下
    my_player = gc_info.team.players[robot_id - 1]
    if my_player.penalty != 'NONE':
        robot.penalized = True
        robot.stop()

rospy.Subscriber('/gc_info', GCInfo, gc_callback)
```

## 👥 团队通信 (Team)

### 信息共享

机器人通过 UDP 广播共享信息：

**TeamInfo 消息：**
```python
TeamInfo:
  # 发送者信息
  robot_id: 2
  team_number: 17

  # 位置信息
  pose:
    x: 2.5
    y: 1.0
    theta: 0.5
  pose_confidence: 0.85

  # 球信息
  ball:
    x: 3.0
    y: 0.5
    age: 0.2          # 最后看到球的时间
    confidence: 0.9

  # 角色信息
  role: 'Striker'

  # 目标信息
  target:
    x: 4.0
    y: 0.0

  # 状态信息
  fallen: False
  battery: 0.75
```

### 通信协议

**UDP 广播：**
- 端口：10000 + team_number
- 频率：10 Hz
- 数据格式：JSON 或 Protobuf

**示例代码：**
```python
import socket
import json

# 创建 UDP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)

# 广播团队信息
def broadcast_team_info(team_info):
    data = json.dumps(team_info).encode()
    sock.sendto(data, ('<broadcast>', 10017))

# 接收团队信息
def receive_team_info():
    sock.bind(('', 10017))
    data, addr = sock.recvfrom(1024)
    team_info = json.loads(data.decode())
    return team_info
```

### 团队协作策略

**球权判断：**
```python
def determine_ball_owner(team_infos):
    best_robot = None
    best_score = -1

    for info in team_infos:
        if info.ball.age < 1.0:  # 1秒内看到球
            # 计算得分：距离近、置信度高
            score = info.ball.confidence / (info.ball.age + 0.1)
            if score > best_score:
                best_score = score
                best_robot = info.robot_id

    return best_robot
```

**角色协调：**
```python
def coordinate_roles(team_infos, ball_position):
    roles = {}

    # 最近的机器人当前锋
    distances = [(info.robot_id, distance(info.pose, ball_position))
                 for info in team_infos]
    striker_id = min(distances, key=lambda x: x[1])[0]
    roles[striker_id] = 'Striker'

    # 其他机器人分配角色
    for info in team_infos:
        if info.robot_id == striker_id:
            continue
        if info.pose.x < 0:  # 后场
            roles[info.robot_id] = 'Defender'
        else:  # 前场
            roles[info.robot_id] = 'Supporter'

    return roles
```

## 🔧 配置

### GameController 配置

```yaml
# dnetwork/config/gamecontroller.yaml
gamecontroller:
  enabled: true
  port: 3838
  team_number: 17
  team_color: 'blue'

  # 机器人编号
  player_number: 1

  # 超时设置
  timeout: 5.0  # 秒
```

### Team 通信配置

```yaml
# dnetwork/config/team.yaml
team:
  enabled: true
  port: 10017
  broadcast_rate: 10  # Hz

  # 信息过期时间
  info_timeout: 2.0  # 秒

  # 通信范围
  max_distance: 20.0  # 米
```

## 🚀 启动网络通信

```bash
# 启动 GameController 和 Team 通信
roslaunch dnetwork default.launch team_number:=17 robot_id:=1

# 仅启动 GameController
roslaunch dnetwork gamecontroller.launch

# 仅启动 Team 通信
roslaunch dnetwork team.launch
```

## 📊 监控工具

### 查看 GameController 状态

```bash
# 查看 GC 消息
rostopic echo /gc_info

# 查看消息频率
rostopic hz /gc_info
```

### 查看团队信息

```bash
# 查看团队消息
rostopic echo /team_info

# 查看所有队友信息
rostopic echo /teammates_info
```

### 网络诊断

```bash
# 检查 UDP 端口
netstat -an | grep 3838
netstat -an | grep 10017

# 测试网络连通性
ping <gamecontroller_ip>
```

## 📈 性能指标

| 指标 | 数值 |
|------|------|
| GC 接收频率 | 2 Hz |
| Team 广播频率 | 10 Hz |
| 通信延迟 | <50ms |
| 丢包率 | <1% |

## 🔗 相关文档

- [行为决策](/soccer/behavior) - 使用网络信息做决策
- [配置管理](/soccer/config) - 网络参数配置
- [完整教程](/tutorials/) - 网络通信实战

## 💡 常见问题

**Q: 收不到 GameController 消息怎么办？**
A: 检查网络连接，确认 team_number 配置正确，检查防火墙设置。

**Q: 团队通信延迟高怎么办？**
A: 降低广播频率，减少消息大小，检查网络质量。

**Q: 如何调试网络通信？**
A: 使用 Wireshark 抓包分析，查看 ROS 日志，使用 rostopic 工具监控。

**Q: 多个机器人角色冲突怎么办？**
A: 实现角色协调算法，使用优先级机制，定期同步角色信息。
