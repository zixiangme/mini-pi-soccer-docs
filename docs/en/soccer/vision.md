# 🎥 Vision System (dvision)

The vision system is the "eyes" of the robot soccer application, responsible for real-time field perception, target object recognition, and autonomous localization.

## 📋 System Overview

The dvision module is based on computer vision technology and provides complete field perception capabilities:

- **Real-time Object Detection**: Identify soccer balls, goals, obstacles, and field markers
- **Robot Localization**: Autonomous localization based on AMCL particle filter
- **Multi-camera Support**: Compatible with USB cameras, GStreamer, and ZED stereo cameras
- **Neural Network Detection**: YOLO deep learning model
- **Data Recording and Playback**: Support for offline analysis and algorithm optimization

## 🎯 Core Functions

### 1. Object Detection

#### Ball Detection
- **Detection Method**: Color segmentation + shape matching + YOLO neural network
- **Tracking Algorithm**: Kalman filter for smooth trajectory
- **Output Information**:
  - Ball position (relative to robot coordinates)
  - Ball velocity and direction
  - Detection confidence

```yaml
# Configuration example: dvision/config/ball_detection.yaml
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

#### Goal Detection
- **Detection Targets**: Own goal (blue), opponent goal (yellow)
- **Detection Features**: Color, shape, positional relationships
- **Output Information**:
  - Goal post positions
  - Goal center point
  - Distance and angle

#### Obstacle Detection
- **Detection Objects**: Opponent robots, referees, field boundaries
- **Detection Method**: Depth information + color segmentation
- **Avoidance Strategy**: Real-time path planning

#### Field Marker Detection
- **Detection Targets**:
  - Field lines (sidelines, center line, penalty area lines)
  - Circles (center circle, penalty spot)
  - Corners (field corners)
- **Purpose**: Assist localization and navigation

### 2. Robot Localization (AMCL)

#### Localization Principle
Uses **AMCL (Adaptive Monte Carlo Localization)** particle filter algorithm:

1. **Particle Initialization**: Randomly distribute particles on the field
2. **Motion Update**: Update particle positions based on odometry
3. **Observation Update**: Update particle weights based on visual observations (field lines, goals)
4. **Resampling**: Keep high-weight particles, eliminate low-weight particles
5. **Position Estimation**: Weighted average to obtain robot position

#### Localization Accuracy
- **Position Accuracy**: ±5cm
- **Angle Accuracy**: ±3°
- **Update Frequency**: 30Hz

```yaml
# Configuration example: dvision/config/localization.yaml
amcl:
  min_particles: 500
  max_particles: 5000
  kld_err: 0.01
  kld_z: 0.99
  update_min_d: 0.1
  update_min_a: 0.2
```

### 3. Camera System

#### Supported Camera Types

**USB Camera (V4L2)**
```bash
# Start USB camera
roslaunch dvision default.launch camera_type:=v4l2 device:=/dev/video0
```

**GStreamer Stream**
```bash
# Start network stream
roslaunch dvision default.launch camera_type:=gstreamer \
  pipeline:="udpsrc port=5000 ! ..."
```

**ZED Stereo Camera**
```bash
# Start ZED camera (supports depth information)
roslaunch dvision default.launch camera_type:=zed
```

#### Camera Calibration

Camera calibration is used to eliminate lens distortion and improve detection accuracy.

**Calibration Steps:**

1. Print checkerboard calibration pattern
2. Run calibration program:
```bash
rosrun dvision camera_calibration
```
3. Move calibration board to capture images from multiple angles
4. Save calibration parameters to configuration file

**Calibration Parameters Example:**
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

### 4. Image Processing Pipeline

```
Raw Image → Distortion Correction → Color Space Conversion → Object Detection → Coordinate Transform → Output Results
   ↓              ↓                      ↓                      ↓                  ↓                ↓
640x480      Undistort              RGB→HSV              YOLO/Traditional    Pixel→World      VisionInfo
```

#### Coordinate System Transformation

**Pixel Coordinates → Camera Coordinates → Robot Coordinates → World Coordinates**

```python
# Coordinate transformation example
def pixel_to_world(pixel_x, pixel_y, camera_matrix, robot_pose):
    # 1. Pixel coordinates → Camera coordinates
    camera_point = inverse_project(pixel_x, pixel_y, camera_matrix)

    # 2. Camera coordinates → Robot coordinates
    robot_point = camera_to_robot_transform(camera_point)

    # 3. Robot coordinates → World coordinates
    world_point = robot_to_world_transform(robot_point, robot_pose)

    return world_point
```

## 📊 Output Data Format

### VisionInfo Message

```python
# ROS message definition
VisionInfo:
  header:
    stamp: timestamp
    frame_id: "base_link"

  # Ball information
  ball:
    detected: True/False
    position: [x, y, z]  # Relative to robot
    velocity: [vx, vy]
    confidence: 0.95

  # Goal information
  goals:
    - color: "yellow"  # Opponent goal
      position: [x, y]
      distance: 3.5
      angle: 0.2
    - color: "blue"    # Own goal
      position: [x, y]
      distance: 8.0
      angle: 3.14

  # Obstacles
  obstacles:
    - type: "robot"
      position: [x, y]
      radius: 0.2

  # Field features
  field_features:
    lines: [...]
    circles: [...]
    corners: [...]

  # Localization information
  localization:
    position: [x, y, theta]  # World coordinates
    confidence: 0.85
```

## 🔧 Configuration and Tuning

### Detection Parameter Tuning

**Color Threshold Adjustment**
```bash
# Start debugging tool
rosrun dvision color_tuner
```

Adjust HSV thresholds in the GUI and view detection results in real-time.

**YOLO Model Configuration**
```yaml
yolo:
  model_path: "/path/to/yolo_model.pt"
  confidence_threshold: 0.5
  nms_threshold: 0.4
  input_size: [416, 416]
```

### Performance Optimization

**Reduce Resolution**
```yaml
camera:
  width: 640   # Reduce to 320 for speed
  height: 480  # Reduce to 240 for speed
  fps: 30
```

**ROI (Region of Interest)**
```yaml
roi:
  enabled: true
  x: 0
  y: 240  # Process only bottom half of image
  width: 640
  height: 240
```

## 🎬 Recording and Playback

### Record Vision Data

```bash
# Record all vision topics
rosbag record /vision_info /camera/image_raw /camera/camera_info
```

### Playback Data

```bash
# Playback recorded data
roslaunch dvision replay.launch bag_file:=/path/to/data.bag
```

### Offline Analysis

```python
# Python script to analyze recorded data
import rosbag

bag = rosbag.Bag('data.bag')
for topic, msg, t in bag.read_messages(topics=['/vision_info']):
    if msg.ball.detected:
        print(f"Ball at: {msg.ball.position}")
```

## 🐛 Debugging Tools

### Visualization Tools

```bash
# Start RViz visualization
rosrun rviz rviz -d $(rospack find dvision)/rviz/vision.rviz
```

### Image Viewing

```bash
# View raw image
rosrun image_view image_view image:=/camera/image_raw

# View detection results
rosrun image_view image_view image:=/dvision/debug_image
```

### Performance Monitoring

```bash
# View topic frequency
rostopic hz /vision_info

# View message latency
rostopic delay /vision_info
```

## 📈 Performance Metrics

| Metric | Value |
|--------|-------|
| Detection Frame Rate | 30 FPS |
| Ball Detection Accuracy | 95% |
| Localization Accuracy | ±5cm |
| Processing Latency | <50ms |
| CPU Usage | ~40% |

## 🔗 Related Documentation

- [Behavior Decision System](/en/soccer/behavior) - How to use vision information for decision making
- [Configuration Management](/en/soccer/config) - Detailed vision parameter configuration
- [Complete Tutorial](/en/tutorials/) - Deploy vision system from scratch

## 💡 FAQ

**Q: Ball detection is inaccurate, what should I do?**
A: Adjust color thresholds, ensure good lighting conditions, use the `color_tuner` tool for optimization.

**Q: Localization drift, what should I do?**
A: Check if field markers are clear, increase particle count, adjust AMCL parameters.

**Q: Frame rate is too low, what should I do?**
A: Reduce image resolution, use ROI, disable unnecessary detection features.

**Q: How to add new detection targets?**
A: Refer to existing detector code, implement new detection class, enable in configuration file.
