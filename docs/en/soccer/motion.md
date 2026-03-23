# Motion Control

The Mini Pi+ soccer application's motion control module provides motion algorithms optimized specifically for soccer competitions.

## Overview

The motion control module contains the following core features:

- 🚶 **Omnidirectional Walking**: Movement in any direction
- ⚽ **Kicking Actions**: Multiple kick types and power control
- 🧤 **Goalkeeper Actions**: Saves, positioning, rushing out
- ⚖️ **Balance Control**: Dynamic balance algorithm to prevent falls
- 🎯 **Precision Positioning**: Position estimation based on odometry

## Omnidirectional Walking

### Basic Usage

```python
from minipi_soccer import SoccerRobot

robot = SoccerRobot()
robot.connect()

# Omnidirectional walk: forward 0.5m, left 0.2m, counterclockwise 30 degrees
robot.motion.omnidirectional_walk(
    forward=0.5,    # Forward distance (meters)
    left=0.2,       # Left shift distance (meters)
    turn=30,        # Rotation angle (degrees)
    speed=0.1       # Speed (meters/second)
)
```

### Walk to Target Point

```python
# Walk to specified coordinates (relative to current position)
target_x = 1.0  # 1 meter ahead
target_y = 0.5  # 0.5 meters to the left

robot.motion.walk_to_point(target_x, target_y, speed=0.12)
```

### Walk While Facing Target

```python
# Walk while maintaining facing direction toward target
ball_position = (1.5, 0.3)  # Ball position

robot.motion.walk_to_point_facing(
    target=ball_position,
    face_target=True,  # Always face the target
    speed=0.1
)
```

## Kicking Actions

### Instep Kick

The most common kick type — powerful and accurate.

```python
# Right foot instep kick
robot.motion.kick_forward(
    foot='right',      # 'left' or 'right'
    power=0.8,         # Power 0.0-1.0
    direction=0        # Direction angle (degrees)
)
```

### Inside Kick

Suitable for passing and precise shooting.

```python
# Left foot inside kick
robot.motion.kick_inside(
    foot='left',
    power=0.6,
    direction=15  # 15 degrees to the right
)
```

### Chip Kick

Kick the ball high, over obstacles.

```python
# Chip kick
robot.motion.kick_chip(
    foot='right',
    power=0.7,
    height=0.3  # Target height (meters)
)
```

### Smart Kick

Automatically chooses kick type based on target.

```python
# Kick toward goal
goal_position = (5.0, 0.0)  # Goal position

robot.motion.smart_kick(
    target=goal_position,
    power=0.9,
    prefer_foot='right'  # Preferred foot
)
```

## Goalkeeper Actions

### Goalkeeper Stance

```python
# Basic goalkeeper stance
robot.motion.goalkeeper_stance()
```

### Dive Save

```python
# Dive left
robot.motion.dive_left(
    distance=0.5,  # Dive distance (meters)
    speed='fast'   # 'slow', 'medium', 'fast'
)

# Dive right
robot.motion.dive_right(distance=0.5, speed='fast')
```

### Rush Out

```python
# Goalkeeper rush
robot.motion.goalkeeper_rush(
    target=ball_position,
    speed=0.15  # Rush speed
)
```

## Balance Control

### Enable Dynamic Balance

```python
# Enable balance control
robot.motion.enable_balance(True)

# Set balance parameters
robot.motion.set_balance_params(
    kp=0.5,      # Proportional gain
    ki=0.1,      # Integral gain
    kd=0.05      # Derivative gain
)
```

### Fall Recovery

```python
# Detect if fallen
if robot.motion.is_fallen():
    print("Robot has fallen!")

    # Auto get-up
    if robot.motion.get_fallen_direction() == 'forward':
        robot.motion.get_up_from_front()
    else:
        robot.motion.get_up_from_back()
```

## Position Estimation

### Odometry

```python
# Get current position (relative to starting point)
position = robot.motion.get_position()
print(f"Position: X={position.x:.2f}m, Y={position.y:.2f}m")
print(f"Heading: {position.theta:.1f}°")

# Reset odometry
robot.motion.reset_odometry()
```

### Velocity Control

```python
# Set walking velocity (meters/second)
robot.motion.set_velocity(
    vx=0.1,   # Forward velocity
    vy=0.05,  # Sideward velocity
    vtheta=10 # Rotation velocity (degrees/second)
)

# Stop motion
robot.motion.stop()
```

## Advanced Features

### Action Sequences

```python
from minipi_soccer.motion import MotionSequence

# Create action sequence
sequence = MotionSequence()

# Add actions
sequence.add_walk(forward=0.5, speed=0.1)
sequence.add_turn(angle=45)
sequence.add_kick(foot='right', power=0.8)

# Execute sequence
robot.motion.execute_sequence(sequence)
```

### Custom Actions

```python
# Define custom action
def custom_celebration():
    """Celebration action"""
    robot.motion.stand()
    time.sleep(0.5)

    # Raise both arms
    robot.motion.set_arm_position('left', angle=90)
    robot.motion.set_arm_position('right', angle=90)
    time.sleep(1)

    # Jump
    robot.motion.jump(height=0.05)
    time.sleep(0.5)

    # Return to initial pose
    robot.motion.init_pose()

# Execute custom action
custom_celebration()
```

### Path Tracking

```python
# Define waypoints
waypoints = [
    (0.5, 0.0),
    (1.0, 0.5),
    (1.5, 0.5),
    (2.0, 0.0)
]

# Follow path
robot.motion.follow_path(
    waypoints=waypoints,
    speed=0.12,
    tolerance=0.05  # Arrival tolerance (meters)
)
```

## Performance Optimization

### Adjust Gait Parameters

```python
# Set gait parameters
robot.motion.set_gait_params(
    step_height=0.03,    # Foot lift height (meters)
    step_length=0.08,    # Step length (meters)
    step_frequency=2.0   # Step frequency (Hz)
)
```

### Energy Optimization

```python
# Enable power saving mode
robot.motion.set_power_mode('eco')  # 'eco', 'balanced', 'performance'

# Auto idle
robot.motion.enable_auto_idle(
    timeout=30  # Enter idle after 30 seconds of inactivity
)
```

## Practical Examples

### Example 1: Chase and Shoot

```python
def chase_and_shoot(robot, ball_pos, goal_pos):
    """Chase ball and shoot"""

    # 1. Walk to ball
    robot.motion.walk_to_point_facing(
        target=ball_pos,
        face_target=True,
        speed=0.12
    )

    # 2. Adjust position so ball is in front of feet
    robot.motion.align_to_ball(ball_pos)

    # 3. Aim at goal
    robot.motion.face_target(goal_pos)

    # 4. Shoot
    robot.motion.smart_kick(
        target=goal_pos,
        power=0.9
    )
```

### Example 2: Goalkeeper Defense

```python
def goalkeeper_defend(robot, ball_pos, goal_pos):
    """Goalkeeper defense"""

    # 1. Calculate optimal position
    optimal_pos = robot.motion.calculate_goalkeeper_position(
        ball_pos, goal_pos
    )

    # 2. Move to position
    robot.motion.walk_to_point(optimal_pos, speed=0.1)

    # 3. Goalkeeper stance
    robot.motion.goalkeeper_stance()

    # 4. If ball approaches, dive
    if distance_to_ball(ball_pos) < 0.5:
        if ball_pos[1] > 0:  # Ball on left side
            robot.motion.dive_left(distance=0.4, speed='fast')
        else:  # Ball on right side
            robot.motion.dive_right(distance=0.4, speed='fast')
```

## Debugging Tips

### Visualize Motion Trajectory

```python
# Enable trajectory logging
robot.motion.enable_trajectory_logging(True)

# Execute action
robot.motion.walk_forward(distance=1.0)

# Get trajectory data
trajectory = robot.motion.get_trajectory()

# Plot trajectory
import matplotlib.pyplot as plt
plt.plot([p.x for p in trajectory], [p.y for p in trajectory])
plt.show()
```

### Performance Monitoring

```python
# Get motion statistics
stats = robot.motion.get_statistics()
print(f"Average speed: {stats.avg_speed:.2f} m/s")
print(f"Max acceleration: {stats.max_accel:.2f} m/s²")
print(f"Power consumption: {stats.power_consumption:.1f} W")
```

## API Reference

For complete motion control API documentation, see [API Documentation](/en/guide/api#motion).

## Next Steps

- Learn [Vision System](/en/soccer/vision)
- Understand [Behavior Decision](/en/soccer/behavior)
- View [Configuration Management](/en/soccer/config)
