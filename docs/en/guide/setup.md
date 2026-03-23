# Environment Setup

This guide will help you configure the Mini Pi+ development environment.

## System Requirements

### Hardware Requirements

- **Development Computer**: Windows 10/11, macOS 10.15+, or Linux (Ubuntu 20.04+)
- **Memory**: At least 8GB RAM
- **Storage**: At least 20GB free space
- **USB Port**: For connecting the Mini Pi+ robot

### Software Requirements

- Python 3.8 or higher
- Git
- USB drivers

## Installation Steps

### 1. Install Python

#### Windows

Download and install Python 3.8+ from the [Python official website](https://www.python.org/downloads/).

Check "Add Python to PATH" during installation.

Verify installation:

```bash
python --version
```

#### macOS

Install using Homebrew:

```bash
brew install python@3.10
```

#### Linux (Ubuntu)

```bash
sudo apt update
sudo apt install python3.10 python3-pip
```

### 2. Install Mini Pi+ SDK

Install the SDK using pip:

```bash
pip install minipi-sdk
```

Verify installation:

```bash
python -c "import minipi; print(minipi.__version__)"
```

### 3. Install Development Tools

#### Install Git

- **Windows**: Download from [git-scm.com](https://git-scm.com/)
- **macOS**: `brew install git`
- **Linux**: `sudo apt install git`

#### Install Code Editor

Visual Studio Code is recommended:

```bash
# macOS
brew install --cask visual-studio-code

# Linux
sudo snap install code --classic
```

Recommended extensions:
- Python (Microsoft)
- Pylance

### 4. Configure USB Connection

#### Linux Users

Add USB device permissions:

```bash
sudo usermod -a -G dialout $USER
sudo udevadm control --reload-rules
```

Log out and back in for changes to take effect.

#### Windows Users

Install USB drivers (installed automatically with the SDK).

### 5. Test Connection

Connect the Mini Pi+ robot to your computer and run the test script:

```python
from minipi import Robot

# Connect to robot
robot = Robot()
robot.connect()

# Test connection
if robot.is_connected():
    print("✅ Connected successfully!")
    print(f"Robot ID: {robot.get_id()}")
    print(f"Battery: {robot.get_battery()}%")
else:
    print("❌ Connection failed")

robot.disconnect()
```

## Create Your First Project

### 1. Create Project Directory

```bash
mkdir my-minipi-project
cd my-minipi-project
```

### 2. Create Virtual Environment

```bash
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install minipi-sdk minipi-soccer
```

### 4. Create Main Program

Create `main.py`:

```python
from minipi import Robot
from minipi.motion import Motion

def main():
    # Initialize robot
    robot = Robot()
    robot.connect()

    # Initialize motion control
    motion = Motion(robot)

    # Stand upright
    motion.stand()

    # Walk forward 1 meter
    motion.walk_forward(distance=1.0)

    # Disconnect
    robot.disconnect()

if __name__ == "__main__":
    main()
```

### 5. Run the Program

```bash
python main.py
```

## Troubleshooting

### Cannot Connect to Robot

1. Check USB cable connection
2. Confirm robot is powered on
3. Check USB driver installation
4. Try a different USB port

### Module Import Failed

Make sure the virtual environment is activated and the SDK is installed:

```bash
pip list | grep minipi
```

### Permission Error (Linux)

Make sure the user is in the dialout group:

```bash
groups | grep dialout
```

## Next Steps

After setup is complete, you can:

- Learn [Hardware Connection](/en/guide/hardware)
- View [API Documentation](/en/guide/api)
- Run [Basic Tutorials](/en/tutorials/)
