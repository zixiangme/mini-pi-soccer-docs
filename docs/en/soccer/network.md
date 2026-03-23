# 🌐 Network Communication System (dnetwork)

The network communication system handles communication between robots, the game controller, and teammates, enabling team coordination and game rule compliance.

## 📋 System Overview

The dnetwork module provides two core functions:

- **GameController Communication**: Receive referee commands and game state
- **Team Communication**: Information sharing and coordination between robots

## 🎮 Game Controller (GameController)

### RoboCup SPL Protocol

GameController uses the RoboCup SPL (Standard Platform League) protocol, broadcasting game information via UDP.

**Protocol Features:**
- UDP Port: 3838
- Broadcast Frequency: 2 Hz
- Data Format: Binary struct

### Game States

**Game Phases:**
```python
GAME_STATE = {
    'INITIAL': 0,      # Initial state
    'READY': 1,        # Ready
    'SET': 2,          # Set for kickoff
    'PLAYING': 3,      # Playing
    'FINISHED': 4      # Finished
}
```

**Secondary States:**
```python
SECONDARY_STATE = {
    'NORMAL': 0,           # Normal play
    'PENALTYSHOOT': 1,     # Penalty shootout
    'OVERTIME': 2,         # Overtime
    'TIMEOUT': 3           # Timeout
}
```

### GCInfo Message

```python
GCInfo:
  # Game information
  game_state: 'PLAYING'
  secondary_state: 'NORMAL'
  first_half: True
  kick_off_team: 'blue'

  # Time information
  secs_remaining: 600      # Remaining time (seconds)
  secondary_time: 0

  # Own team information
  team:
    team_number: 17
    team_color: 'blue'
    score: 2
    penalty_shot: 0
    single_shots: 0

    # Robot states
    players:
      - number: 1
        penalty: 'NONE'      # Penalty status
        secs_till_unpenalised: 0
      - number: 2
        penalty: 'NONE'
      # ...

  # Opponent team information
  opponent:
    team_number: 18
    team_color: 'red'
    score: 1
    # ...
```

### Penalty States

```python
PENALTY = {
    'NONE': 0,                      # No penalty
    'SPL_ILLEGAL_BALL_CONTACT': 1,  # Illegal ball contact
    'SPL_PLAYER_PUSHING': 2,        # Pushing
    'SPL_ILLEGAL_MOTION_IN_SET': 3, # Illegal motion in SET
    'SPL_INACTIVE_PLAYER': 4,       # Inactive player
    'SPL_ILLEGAL_DEFENDER': 5,      # Illegal defender
    'SPL_LEAVING_THE_FIELD': 6,     # Leaving the field
    'SPL_KICK_OFF_GOAL': 7,         # Kickoff directly into goal
    'SPL_REQUEST_FOR_PICKUP': 8,    # Request for pickup
    'SUBSTITUTE': 14,               # Substitute
    'MANUAL': 15                    # Manual penalty
}
```

## 📡 Team Communication

### Communication Protocol

Robots broadcast team information using the SPL team communication protocol.

**Communication Parameters:**
- UDP Port: 10000 + team_number
- Broadcast Frequency: 10 Hz
- Range: Local network

### TeamInfo Message

```python
TeamInfo:
  # Robot identification
  robot_id: 1
  team_number: 17

  # Position information
  pose:
    x: 1.5       # World coordinates X (meters)
    y: 0.3       # World coordinates Y (meters)
    theta: 0.1   # Heading (radians)

  # Ball information
  ball:
    detected: True
    position: [2.1, 0.5]  # World coordinates
    velocity: [0.1, 0.0]
    timestamp: 1234567890

  # Role information
  role: 'Striker'
  intention: 'chasing_ball'

  # Status
  fallen: False
  battery: 0.85
  timestamp: 1234567890
```

### Teammate Information Access

```python
# Get all teammate information
teammates = dnetwork.get_teammates()

for robot in teammates:
    print(f"Robot {robot.robot_id}:")
    print(f"  Position: ({robot.pose.x:.1f}, {robot.pose.y:.1f})")
    print(f"  Role: {robot.role}")
    print(f"  Ball seen: {robot.ball.detected}")

# Get closest teammate
closest = dnetwork.get_closest_teammate(my_position)
```

## 🔧 Configuration

### Network Configuration

```yaml
# dconfig/global.yml
ZJUDancer:
  # Team settings
  TeamNumber: 17                # Team number (must be unique)
  UseGameController: true       # Listen to referee box
  GameControllerAddress: "192.168.1.100"  # Referee box IP

  # Communication settings
  TeamCommunication:
    enabled: true
    port_offset: 10000          # Port = 10000 + TeamNumber
    broadcast_rate: 10          # Hz
    timeout: 2.0                # Teammate data expiry (seconds)
```

### Role Configuration

```yaml
# dconfig/global.yml
ZJUDancer:
  # Role configuration
  Role: GCStriker    # GC prefix = listen to GameController
  AttackRight: True  # True = attack right goal, False = attack left
  RobotID: 1        # Robot number
```

::: tip Note
Adding the `GC` prefix before the role name (e.g., `GCStriker`) enables GameController command listening. `UseGameController` must also be set to `true`.
:::

## 📊 Using Network Information for Decisions

### Ball Information Fusion

When multiple robots see the ball, fuse the information for more accurate estimation:

```python
def fuse_ball_position(my_ball, teammates):
    """Fuse ball position from multiple robots"""
    observations = []

    # Add own observation
    if my_ball.detected:
        observations.append({
            'position': my_ball.position,
            'confidence': my_ball.confidence,
            'timestamp': my_ball.timestamp
        })

    # Add teammate observations
    for teammate in teammates:
        if teammate.ball.detected:
            age = current_time() - teammate.ball.timestamp
            if age < 1.0:  # Only use recent data
                observations.append({
                    'position': teammate.ball.position,
                    'confidence': 0.8 * (1 - age),  # Decay with age
                    'timestamp': teammate.ball.timestamp
                })

    if not observations:
        return None

    # Weighted average
    total_weight = sum(o['confidence'] for o in observations)
    fused_x = sum(o['position'][0] * o['confidence'] for o in observations) / total_weight
    fused_y = sum(o['position'][1] * o['confidence'] for o in observations) / total_weight

    return [fused_x, fused_y]
```

### Role Conflict Avoidance

```python
def resolve_role_conflict(my_robot, teammates):
    """Resolve role conflicts between robots"""
    strikers = [r for r in teammates if r.role == 'Striker']

    # If already has striker, become supporter
    if strikers and my_robot.role == 'Striker':
        # Keep role for robot closest to ball
        ball_pos = get_ball_position()
        closest_striker = min(strikers, key=lambda r: distance(r.pose, ball_pos))

        if distance(my_robot.pose, ball_pos) > distance(closest_striker.pose, ball_pos):
            my_robot.role = 'Supporter'
```

## 🚀 Launch and Configuration

### Launch Network Module

```bash
# Launch full system (includes network module)
roslaunch dlaunch all.launch robot_id:=1

# Or launch network module separately
roslaunch dnetwork default.launch robot_id:=1
```

### Parameter Setting

```bash
# Set robot ID via environment variable
export ZJUDANCER_ROBOTID=1

# Set team number via command line
roslaunch dnetwork default.launch team_number:=17
```

## 📊 Monitoring Tools

### View GameController Status

```bash
# View GC messages
rostopic echo /gc_info

# View message frequency
rostopic hz /gc_info
```

### View Team Information

```bash
# View team messages
rostopic echo /team_info

# View all teammate information
rostopic echo /teammates_info
```

### Network Diagnostics

```bash
# Check UDP ports
netstat -an | grep 3838
netstat -an | grep 10017

# Test network connectivity
ping <gamecontroller_ip>
```

## 📈 Performance Metrics

| Metric | Value |
|--------|-------|
| GC Receive Frequency | 2 Hz |
| Team Broadcast Frequency | 10 Hz |
| Communication Latency | <50ms |
| Packet Loss Rate | <1% |

## 🔗 Related Documentation

- [Behavior Decision](/en/soccer/behavior) - Using network information for decision making
- [Configuration Management](/en/soccer/config) - Network parameter configuration
- [Complete Tutorial](/en/tutorials/) - Network communication in practice

## 💡 FAQ

**Q: Not receiving GameController messages, what should I do?**
A: Check network connection, confirm team_number is correctly configured, check firewall settings.

**Q: High team communication latency, what should I do?**
A: Reduce broadcast frequency, reduce message size, check network quality.

**Q: How to debug network communication?**
A: Use Wireshark for packet capture analysis, check ROS logs, use rostopic tools for monitoring.

**Q: Multiple robots have role conflicts, what should I do?**
A: Implement role coordination algorithm, use priority mechanism, periodically synchronize role information.
