# 环境配置

本指南将帮助你配置 Mini Pi+ 开发环境。

## 系统要求

### 硬件要求

- **开发电脑**：Windows 10/11, macOS 10.15+, 或 Linux (Ubuntu 20.04+)
- **内存**：至少 8GB RAM
- **存储**：至少 20GB 可用空间
- **USB 接口**：用于连接 Mini Pi+ 机器人

### 软件要求

- Python 3.8 或更高版本
- Git
- USB 驱动程序

## 安装步骤

### 1. 安装 Python

#### Windows

从 [Python 官网](https://www.python.org/downloads/) 下载并安装 Python 3.8+。

安装时勾选 "Add Python to PATH"。

验证安装：

```bash
python --version
```

#### macOS

使用 Homebrew 安装：

```bash
brew install python@3.10
```

#### Linux (Ubuntu)

```bash
sudo apt update
sudo apt install python3.10 python3-pip
```

### 2. 安装 Mini Pi+ SDK

使用 pip 安装 SDK：

```bash
pip install minipi-sdk
```

验证安装：

```bash
python -c "import minipi; print(minipi.__version__)"
```

### 3. 安装开发工具

#### 安装 Git

- **Windows**: 从 [git-scm.com](https://git-scm.com/) 下载安装
- **macOS**: `brew install git`
- **Linux**: `sudo apt install git`

#### 安装代码编辑器

推荐使用 Visual Studio Code：

```bash
# macOS
brew install --cask visual-studio-code

# Linux
sudo snap install code --classic
```

安装 Python 扩展：
- Python (Microsoft)
- Pylance

### 4. 配置 USB 连接

#### Linux 用户

添加 USB 设备权限：

```bash
sudo usermod -a -G dialout $USER
sudo udevadm control --reload-rules
```

重新登录使更改生效。

#### Windows 用户

安装 USB 驱动程序（随 SDK 自动安装）。

### 5. 测试连接

连接 Mini Pi+ 机器人到电脑，运行测试脚本：

```python
from minipi import Robot

# 连接机器人
robot = Robot()
robot.connect()

# 测试连接
if robot.is_connected():
    print("✅ 连接成功！")
    print(f"机器人 ID: {robot.get_id()}")
    print(f"电池电量: {robot.get_battery()}%")
else:
    print("❌ 连接失败")

robot.disconnect()
```

## 创建第一个项目

### 1. 创建项目目录

```bash
mkdir my-minipi-project
cd my-minipi-project
```

### 2. 创建虚拟环境

```bash
python -m venv venv

# 激活虚拟环境
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate
```

### 3. 安装依赖

```bash
pip install minipi-sdk minipi-soccer
```

### 4. 创建主程序

创建 `main.py`：

```python
from minipi import Robot
from minipi.motion import Motion

def main():
    # 初始化机器人
    robot = Robot()
    robot.connect()

    # 初始化运动控制
    motion = Motion(robot)

    # 站立姿态
    motion.stand()

    # 前进 1 米
    motion.walk_forward(distance=1.0)

    # 断开连接
    robot.disconnect()

if __name__ == "__main__":
    main()
```

### 5. 运行程序

```bash
python main.py
```

## 常见问题

### 无法连接机器人

1. 检查 USB 线缆是否连接正常
2. 确认机器人已开机
3. 检查 USB 驱动是否安装
4. 尝试更换 USB 接口

### 导入模块失败

确保已激活虚拟环境并安装了 SDK：

```bash
pip list | grep minipi
```

### 权限错误 (Linux)

确保用户在 dialout 组中：

```bash
groups | grep dialout
```

## 下一步

环境配置完成后，你可以：

- 学习 [硬件连接](/guide/hardware)
- 查看 [API 文档](/guide/api)
- 运行 [基础教程](/tutorials/basic-motion)

## 获取帮助

如遇到问题，请查看：
- [常见问题](./faq)
- [GitHub Issues](https://github.com/your-repo/mini-pi-soccer/issues)
