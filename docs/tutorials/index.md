# Mini Pi+ 应用开发指南——足球

## 说明

在进行 Mini Pi+ 应用开发前，需要对产品使用有一定理解，请先阅读 Mini Pi+ 产品使用手册。

📖 **产品手册链接**: https://www.hightorque.cn/chapter/mini-pi%e4%ba%a7%e5%93%81%e4%bd%bf%e7%94%a8%e6%89%8b%e5%86%8c

## 软件环境

操作系统为 Ubuntu 20.04 ROS1 Noetic/ROS2 Foxy

## 真机测试

## 目标

演示机器人自主踢球全流程

## 准备

### 测试场地
- 球场（标线清晰）
- 足球

### Mini Pi+机器人

### 普通工作电脑
- 工作电脑可以是常规的操作系统（Windows、Ubuntu、MacOS 等）
- 需要有 ssh 相关工具，用于远程连接机器人

## 确定球场尺寸

在 RoboCup Workspace/core/src/dbehavior/config 路径下的 constant.yml 文件，需要根据球场尺寸来进行定位和距离计算，如果测试的球场大小跟文件内参数的不一致，需要更改相应配置，在此之前，我们需要测试球场的以下维度（单位 m）：

- 球场长度
- 球场宽度
- 球门深度
- 球门宽度
- 球门高度
- 小禁区长度
- 小禁区宽度
- 点球点距离
- 中圈直径
- 场地边界宽度
- 场地线条宽度

这些值可以作为常量放在 constant.yml 的代码中，默认我们使用的是 KIDSIZE 参数，如果测试的球场跟这些数值不一致，可以修改为自己的值。


```yaml
dbehavior:
  geometry:
    field_length: 900
    field_width: 600
    goal_depth: 60
    goal_width: 260
    goal_height: 180
    goal_area_length: 20
    goal_area_width: 300
    penalty_mark_distance: 150
    center_circle_diameter: 150
    border_strip_width: 70
    line_width: 5
  robot:
    num_player: 6
    max_pitch: 70
    min_pitch: -15
    max_yaw: 75
    min_yaw: -75
    walk_speed: 450 / 26
    turn_speed: 10
  team:
    teaminfo_outdated: 0.5
    ball_share_enabled: False
    pace: False
```

## 全流程自主识别代码部署与应用

### 机器人启动与联网

按照产品手册的流程启动机器人

📖 **启动流程参考**: https://www.hightorque.cn/chapter/mini-pi%e4%ba%a7%e5%93%81%e4%bd%bf%e7%94%a8%e6%89%8b%e5%86%8c

使用 HDMI 线缆入机器人背板 HDMI 口，进入可视化界面，同时在机器人背板 USB 口上插入键盘鼠标，直接在机器人电脑上进行控制。在右上角的 Connect WIFI 选择需要连接的网络，进行联网。

联网后，键盘同时按下 ctrl+alt+t 打开终端输入 `ifconfig` 后可查找机器人的 IP 地址（例如：192.168.110.73）
![ip地址](/tutorial-images/image(1).png)

### 远程 ssh 控制

安装 Visual Studio Code 软件 🔗 https://code.visualstudio.com/download

打开 Visual Studio Code 软件在左侧应用中心搜索 Remote-SSH 插件，进行安装

确保机器人已经正常启动安装后左侧会多出一个远程小电脑的图标，进入后点击 "+" 即可添加机器人设备

输入示例为**机器人用户名@IP地址** 这里可以参考机器人用户名默认为 nvidia，ip 地址为 192.168.110.16

然后回车后输入机器人密码 **nvidia** 后，选择 Linux，第一次连接需要等待一段时间，即可进入下面的界面，点击打开文件夹即可

### 自主识别代码部署流程

鼠标右键桌面打开终端，输入 `code .` 打开 VScode

在右下角的终端输入下载代码指令

```bash
git clone https://github.com/HighTorque-Robotics/RoboCup_Workspace.git
```

在左侧的文件夹内找到 bashrc 文件并打开将下方代码粘贴至 bashrc 文件内容末尾

```bash
export ZJUDANCER_GPU=1
export LD_LIBRARY_PATH=/usr/lib/aarch64-linux-gnu:/usr/local/cuda-11.4/lib64:$LD_LIBRARY_PATH
export ZJUDANCER_ROBOTID=1
source /home/nvidia/RoboCup_Workspace/core/devel/setup.bash
```

在右下角的终端窗口，依次输入

```bash
cd lib/
catkin_make
```

等待加载到 100% 后编译完成

接下来依次输入

```bash
cd ../core
catkin_make
```

机器人站立解锁，处于可以通过遥控的状态后关闭手柄控制话题：

终端输入 `rosnode kill /joy_teleop`

```bash
nvidia@ubuntu:~$ rosnode kill /joy_teleop
killing /joy_teleop
killed
```

恢复手柄控制使用指令

首先
```bash
source /home/nvidia/sim2real_master/sim2real_master/devel/setup.bash
```

然后
```bash
roslaunch sim2real_master joy_teleop.launch use_filter:=true
```

### 运行视觉识别程序，终端运行

```bash
roslaunch claunch piplus.launch
```

此时机器人即可自动识别足球

## 机器人对应参数修改

机器人的编号要在之前培训过的 .bashrc 文件中的一行中修改，如下图 ZJUDANCER_ROBOTID

RoboCup_Workspace/core/src/dconfig/global.yml 里面的 role 本次比赛能设置的只有三个：Striker Defender GoalKeeper

::: tip 注意
如需听到判断指令，要在对应 role 的名字面前上 GC，例如 GCStriker
:::

::: warning 注意
UseGameController 要和 GC 同时改，是否要听取裁判盒。
:::

根据已方半场位置设置进攻方向 AttackRight :True 为进攻右侧球门 :False 为进攻左侧球门

GameControllerAddress：裁判盒 ip，在使用裁判盒的电脑上查询并填写。

TeamNumber 应该是我们判断启动时选择的两个队伍的 ID 之一。

这里的 role 的 value 也要同步改：