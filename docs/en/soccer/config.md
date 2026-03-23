# ⚙️ Configuration Management System (dconfig)

The configuration management system provides centralized parameter management, supporting multi-robot configuration and runtime hot reload.

## 📋 System Overview

Core functions of the dconfig module:

- **Centralized Configuration**: Unified management of all module parameters
- **Multi-robot Support**: Independent configuration for each robot
- **Runtime Hot Reload**: Update parameters without restarting
- **Configuration Monitoring**: Automatic detection of configuration file changes

## 📁 Configuration File Structure

```
RoboCup_Workspace/core/src/dconfig/
├── constant.yml          # Field constants (shared by all robots)
├── global.yml            # Global configuration
├── 1/                    # Robot 1 configuration
│   ├── dvision.yaml      # Vision parameters
│   ├── dmotion.yaml      # Motion parameters
│   └── dancer_io.yaml    # Hardware parameters
├── 2/                    # Robot 2 configuration
│   ├── dvision.yaml
│   ├── dmotion.yaml
│   └── dancer_io.yaml
├── 3/                    # Robot 3 configuration
├── 4/                    # Robot 4 configuration
├── 5/                    # Robot 5 configuration
└── 6/                    # Robot 6 configuration
```

## 🏟️ Field Constants Configuration

### constant.yml

Defines field geometry parameters, shared by all robots.

```yaml
dbehavior:
  geometry:
    # Field dimensions (unit: centimeters)
    field_length: 900        # Field length
    field_width: 600         # Field width

    # Goal parameters
    goal_depth: 60           # Goal depth
    goal_width: 260          # Goal width
    goal_height: 180         # Goal height

    # Penalty area
    goal_area_length: 20     # Goal area length
    goal_area_width: 300     # Goal area width
    penalty_mark_distance: 150  # Penalty mark distance

    # Field markers
    center_circle_diameter: 150  # Center circle diameter
    border_strip_width: 70       # Border strip width
    line_width: 5                # Line width

  robot:
    # Robot parameters
    num_player: 6            # Team size
    max_pitch: 70            # Max pitch angle
    min_pitch: -15           # Min pitch angle
    max_yaw: 75              # Max yaw angle
    min_yaw: -75             # Min yaw angle
    walk_speed: 450 / 26     # Walking speed
    turn_speed: 10           # Turning speed

  team:
    teaminfo_outdated: 0.5   # Team info expiry time
    ball_share_enabled: False  # Enable ball sharing
    pace: False              # Enable pace control
```

## 🌍 Global Configuration

### global.yml

Defines game-related global parameters.

```yaml
ZJUDancer:
  # Simulation mode
  Simulation: false
  OfflineRecord: false

  # Robot settings
  RobotID: 1              # Robot number (1-6)
  Role: GCStriker         # Role: Striker/Defender/GoalKeeper (GC prefix = use GameController)
  AttackRight: True       # True = attack right goal

  # GameController settings
  UseGameController: true
  GameControllerAddress: "192.168.1.100"
  TeamNumber: 17

  # Debug settings
  Debug: false
  LogLevel: "INFO"
```

::: tip Role Configuration
Available roles: `Striker`, `Defender`, `GoalKeeper`
Add `GC` prefix to listen to referee box commands, e.g. `GCStriker`
:::

::: warning AttackRight
`UseGameController` and `GC` prefix must be changed together.
:::

## 🤖 Per-Robot Configuration

### Vision Parameters (dvision.yaml)

```yaml
dvision:
  camera:
    device: "/dev/video0"
    width: 640
    height: 480
    fps: 30

  # Camera intrinsics (unique per robot, requires calibration)
  camera_matrix:
    fx: 615.123
    fy: 615.123
    cx: 320.0
    cy: 240.0

  distortion:
    k1: -0.123
    k2: 0.045
    p1: 0.001
    p2: -0.002

  # Detection parameters
  ball_detection:
    confidence_threshold: 0.7
    min_radius: 10
    max_radius: 100
```

### Motion Parameters (dmotion.yaml)

```yaml
dmotion:
  walk:
    max_speed: 0.3          # Max walking speed (m/s)
    acceleration: 0.1       # Acceleration
    step_height: 0.03       # Foot lift height

  balance:
    kp: 0.5
    ki: 0.1
    kd: 0.05

  kick:
    power_scale: 1.0        # Kick power multiplier
    direction_offset: 0.0   # Direction correction offset
```

## 🔄 Runtime Hot Reload

### Modifying Parameters at Runtime

```bash
# Modify a single parameter
rosservice call /dconfig/set_param \
  '{key: "dbehavior.striker.kick_distance", value: "0.2"}'

# Reload entire configuration file
rosservice call /dconfig/reload_file \
  '{file: "global.yml"}'

# Reload all configurations
rosservice call /dconfig/reload_all '{}'
```

### Listen to Configuration Changes

```python
import rospy
from dconfig.msg import ConfigUpdate

def on_config_update(msg):
    print(f"Config updated: {msg.key} = {msg.value}")
    # Update local variables
    if msg.key == "striker.kick_distance":
        self.kick_distance = float(msg.value)

rospy.Subscriber('/dconfig/updates', ConfigUpdate, on_config_update)
```

## 📊 Role Starting Position Configuration

### role.yml

Defines each role's starting position on the field.

```yaml
# dbehavior/config/role.yml
Striker:
  start_pos: [-100, -200]    # Starting position (cm, field coordinates)
  kickoff_pos: [-50, 0]      # Position after entering field

Defender:
  start_pos: [-100, 200]
  kickoff_pos: [-200, 0]

GoalKeeper:
  start_pos: [-420, 0]
  kickoff_pos: [-420, 0]
```

::: tip Coordinate System
Robot faces the positive Y-axis when entering. Right is positive X-axis. Origin is field center.
Coordinates assume own half is left half (AttackRight=True). When AttackRight=True, start_pos is mirrored about Y-axis.
:::

## 🛠️ Configuration Best Practices

### 1. Per-Robot Calibration

Each robot requires independent camera calibration:

```bash
# Camera calibration
rosrun dvision camera_calibration --robot_id 1

# IMU calibration
rosrun dancer_io imu_calibration --robot_id 1

# Motion parameter tuning
rosrun dmotion motion_tuning --robot_id 1
```

### 2. Configuration Backup

Regularly back up configuration files:

```bash
# Backup config
tar -czf config_backup_$(date +%Y%m%d).tar.gz dconfig/

# Restore config
tar -xzf config_backup_20260313.tar.gz
```

### 3. Version Control

Use Git to manage configuration files:

```bash
cd RoboCup_Workspace/core/src/dconfig
git add .
git commit -m "Update robot 1 vision parameters"
git push
```

## 🔗 Related Documentation

- [Vision System](/en/soccer/vision) - Vision parameter configuration
- [Behavior Decision](/en/soccer/behavior) - Behavior parameter configuration
- [Motion Control](/en/soccer/motion) - Motion parameter configuration
- [Complete Tutorial](/en/tutorials/) - Configuration in practice

## 💡 FAQ

**Q: How to create a configuration for a new robot?**
A: Copy an existing robot configuration directory and modify robot-specific parameters (e.g., camera calibration).

**Q: Configuration changes not taking effect, what should I do?**
A: Check if config_watchdog is running, manually restart the relevant module.

**Q: How to share configuration between multiple robots?**
A: Put common parameters in constant.yml and global.yml; put robot-specific parameters in each robot's directory.

**Q: Configuration file format error, what should I do?**
A: Use the `validate_config` tool to check syntax and ensure correct YAML format.