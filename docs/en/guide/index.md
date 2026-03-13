# Development Guide

Welcome to the Mini Pi+ Soccer Robot Development Guide! This comprehensive guide will help you get started with developing applications for the Mini Pi+ humanoid soccer robot platform.

## 🚀 Quick Start

Get up and running with Mini Pi+ in minutes:

### System Requirements
- Ubuntu 20.04 LTS or later
- Python 3.8+
- ROS2 Humble
- At least 4GB RAM
- USB 3.0 port for robot connection

### Installation Steps

1. **Install Dependencies**
   ```bash
   sudo apt update
   sudo apt install python3-pip git cmake build-essential
   ```

2. **Clone the SDK**
   ```bash
   git clone https://github.com/mini-pi/soccer-sdk.git
   cd soccer-sdk
   ```

3. **Install Python Packages**
   ```bash
   pip3 install -r requirements.txt
   python3 setup.py install
   ```

4. **Verify Installation**
   ```bash
   mini-pi --version
   ```

## 📚 What's Next?

- [Environment Setup](/en/guide/setup) - Configure your development environment
- [Hardware Connection](/en/guide/hardware) - Connect and test your robot
- [SDK Installation](/en/guide/sdk) - Install the complete development kit
- [API Reference](/en/guide/api) - Explore the programming interface

## 🎯 Key Features

The Mini Pi+ platform provides:

- **Real-time Motion Control** - Precise servo control with 20+ degrees of freedom
- **Computer Vision** - Built-in camera with object detection and tracking
- **Wireless Communication** - WiFi and Bluetooth connectivity
- **Sensor Integration** - IMU, pressure sensors, and more
- **Cross-platform SDK** - Works on Linux, macOS, and Windows

## 🤝 Community Support

- [GitHub Repository](https://github.com/mini-pi/soccer-sdk) - Source code and issues
- [Discord Community](https://discord.gg/mini-pi) - Chat with other developers
- [Documentation](https://docs.mini-pi.com) - Complete API documentation
- [Video Tutorials](https://youtube.com/mini-pi) - Step-by-step guides

Ready to start building? Head over to [Environment Setup](/en/guide/setup) to configure your development environment!