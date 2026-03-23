# 🧠 Behavior Decision System (dbehavior)

The behavior decision system is the "brain" of the robot soccer application, responsible for making intelligent decisions based on the game situation and controlling robot behavior and strategy.

## 📋 System Overview

The dbehavior module is based on behavior tree architecture, providing a hierarchical decision framework:

- **Behavior Tree Engine**: Flexible task scheduling and execution
- **Multi-role Support**: Striker, Defender, Goalkeeper, PenaltyKicker
- **Skill System**: Reusable action primitives
- **Team Coordination**: Multi-robot role assignment and coordination
- **Game State Management**: Responding to referee commands

## 🎯 Core Concepts

### 1. Behavior Tree

A behavior tree is a hierarchical decision structure composed of nodes:

**Node Types:**
- **Sequence**: Execute child nodes in order; succeeds only if all succeed
- **Selector**: Try child nodes in order; succeeds if any one succeeds
- **Parallel**: Execute multiple child nodes simultaneously
- **Decorator**: Modify child node behavior (repeat, invert, etc.)
- **Action**: Execute a specific action
- **Condition**: Check a condition

**Example Behavior Tree:**
```
Striker
├─ Selector
   ├─ Sequence [Shoot]
   │  ├─ Condition: Ball nearby?
   │  ├─ Condition: Aligned with goal?
   │  └─ Action: Kick ball
   ├─ Sequence [Chase ball]
   │  ├─ Condition: Ball visible?
   │  └─ Action: Walk to ball
   └─ Action: Search for ball
```

### 2. Role System

#### Striker
**Responsibility**: Active attacking, chasing and shooting

**Behavior Priority:**
1. Ball at feet and aligned with goal → Shoot
2. Ball visible → Chase ball
3. Teammate has possession → Position for pass
4. Otherwise → Search for ball

**Configuration Parameters:**
```yaml
striker:
  kick_distance: 0.15  # Kick distance threshold
  approach_speed: 0.3  # Speed when approaching ball
  shoot_angle: 0.3     # Shooting angle tolerance
```

#### Defender
**Responsibility**: Defensive positioning, intercepting opponents

**Behavior Priority:**
1. Opponent approaching with ball → Intercept
2. Ball in defensive zone → Clear ball
3. Otherwise → Defensive positioning

**Positioning Strategy:**
- Stay between ball and own goal
- 1-2 meters from goal
- Adjust position based on ball location

#### Goalkeeper
**Responsibility**: Guard the goal, save shots

**Behavior Priority:**
1. Ball approaching fast → Save
2. Ball in penalty area → Rush out
3. Otherwise → Goalkeeper positioning

**Save Strategy:**
```python
def dive_direction(ball_position, ball_velocity):
    # Predict ball trajectory
    predicted_pos = ball_position + ball_velocity * 0.5

    # Determine dive direction
    if predicted_pos.x < -0.2:
        return "left"
    elif predicted_pos.x > 0.2:
        return "right"
    else:
        return "center"
```

#### PenaltyKicker
**Responsibility**: Penalty shootout specific strategy

**Execution Flow:**
1. Align with goal
2. Choose shot angle (left/right/center)
3. Approach run
4. Shoot

### 3. Skill System

Skills are reusable action primitives that encapsulate specific execution logic.

**Common Skills:**

**WalkToBall**
```python
class WalkToBall(Skill):
    def execute(self, blackboard):
        ball = blackboard.get('ball_position')
        robot = blackboard.get('robot_position')

        # Calculate target position (behind ball)
        target = ball - normalize(ball - robot) * 0.2

        # Send walking command
        self.motion.walk_to(target)

        # Check if arrived
        if distance(robot, target) < 0.05:
            return Status.SUCCESS
        return Status.RUNNING
```

**KickBall**
```python
class KickBall(Skill):
    def execute(self, blackboard):
        goal = blackboard.get('opponent_goal')
        ball = blackboard.get('ball_position')

        # Calculate kick direction
        kick_direction = normalize(goal - ball)

        # Choose kick type
        if abs(kick_direction.angle) < 0.2:
            kick_type = "forward"  # Instep kick
        else:
            kick_type = "side"     # Inside kick

        # Execute kick
        self.motion.kick(kick_type, power=0.8)
        return Status.SUCCESS
```

**SearchBall**
```python
class SearchBall(Skill):
    def execute(self, blackboard):
        # Rotate in place to search
        self.motion.turn(speed=0.3)

        # Check if ball found
        if blackboard.get('ball_detected'):
            return Status.SUCCESS
        return Status.RUNNING
```

### 4. Blackboard System

The blackboard is a mechanism for sharing data between behavior tree nodes.

**Stored Data:**
```python
blackboard = {
    # Vision information
    'ball_position': [x, y],
    'ball_detected': True,
    'opponent_goal': [x, y],
    'own_goal': [x, y],
    'obstacles': [...],

    # Robot state
    'robot_position': [x, y, theta],
    'robot_fallen': False,
    'battery_level': 0.85,

    # Game information
    'game_state': 'playing',
    'team_color': 'blue',
    'role': 'striker',

    # Team information
    'teammates': [...],
    'ball_owner': 'robot_2',
}
```

## 🎮 Game State Management

### Game Phases

**Initial**
- Robot stands, waits for ready signal
- Movement not allowed

**Ready**
- Robot walks to initial position
- Preparing for kickoff

**Set**
- Stay still
- Waiting for kickoff whistle

**Playing**
- Execute role behavior
- Autonomous decision making and action

**Finished**
- Stop all actions
- Wait for next round

### Referee Command Response

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

## 🤝 Team Coordination

### Role Assignment

**Dynamic Role Assignment Algorithm:**
```python
def assign_roles(team_robots, ball_position):
    # Calculate each robot's distance to ball
    distances = [distance(r.position, ball_position) for r in team_robots]

    # Closest robot becomes striker
    striker_idx = distances.index(min(distances))
    team_robots[striker_idx].role = 'Striker'

    # Assign roles to other robots based on position
    for i, robot in enumerate(team_robots):
        if i == striker_idx:
            continue
        if robot.position.y < 0:  # Defensive half
            robot.role = 'Defender'
        else:  # Attacking half
            robot.role = 'Supporter'
```

### Information Sharing

Robots share information over the network:
- Ball position
- Own position
- Current role
- Target position

## 🔧 Configuration and Tuning

### Behavior Parameter Configuration

```yaml
# dbehavior/config/behavior.yaml
behavior:
  # Decision frequency
  update_rate: 30  # Hz

  # Role parameters
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

  # Skill parameters
  skills:
    walk_speed: 0.25
    turn_speed: 0.5
    kick_power: 0.8
```

### Debugging Tools

**Behavior Tree Visualization:**
```bash
# Start behavior tree visualization tool
rosrun dbehavior behavior_tree_viewer
```

**Log Output:**
```python
# Add logging in code
self.logger.info(f"Executing skill: {skill_name}")
self.logger.debug(f"Blackboard: {blackboard}")
```

## 📊 Performance Metrics

| Metric | Value |
|--------|-------|
| Decision Frequency | 30 Hz |
| Response Latency | <100ms |
| CPU Usage | ~20% |
| Role Switch Time | <1s |

## 🔗 Related Documentation

- [Vision System](/en/soccer/vision) - Provides perception information for decision making
- [Motion Control](/en/soccer/motion) - Executes decision commands
- [Network Communication](/en/soccer/network) - Team coordination communication

## 💡 FAQ

**Q: How to add a new role?**
A: Create a new behavior tree file, implement role logic, and register in configuration.

**Q: How to adjust decision priorities?**
A: Modify behavior tree structure, adjust the order of child nodes in Selector nodes.

**Q: Robot reacts too slowly, what should I do?**
A: Increase update_rate, optimize skill execution efficiency, reduce unnecessary computation.

**Q: How to implement a new skill?**
A: Inherit from the Skill base class, implement the execute method, and register in the skill library.
