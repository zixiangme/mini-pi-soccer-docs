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
![vscode界面](/tutorial-images/image(2).png)

打开 Visual Studio Code 软件在左侧应用中心搜索 Remote-SSH 插件，进行安装
![ssh下载](/tutorial-images/image(3).png)

确保机器人已经正常启动安装后左侧会多出一个远程小电脑的图标，进入后点击 "+" 即可添加机器人设备

输入示例为**机器人用户名@IP地址** 这里可以参考机器人用户名默认为 nvidia，ip 地址为 192.168.110.16
![机器人用户名@IP地址](/tutorial-images/image(4).png)

然后回车后输入机器人密码 **nvidia** 后，选择 Linux，第一次连接需要等待一段时间，即可进入下面的界面，点击打开文件夹即可
![打开文件夹](/tutorial-images/image(5).png)

### 自主识别代码部署流程

鼠标右键桌面打开终端，输入 `code .` 打开 VScode
![1](/tutorial-images/image(6).png)

在右下角的终端输入下载代码指令

```bash
git clone https://github.com/HighTorque-Robotics/RoboCup_Workspace.git
```
![2](/tutorial-images/image(7).png)

在左侧的文件夹内找到 bashrc 文件并打开将下方代码粘贴至 bashrc 文件内容末尾

```bash
export ZJUDANCER_GPU=1
export LD_LIBRARY_PATH=/usr/lib/aarch64-linux-gnu:/usr/local/cuda-11.4/lib64:$LD_LIBRARY_PATH
export ZJUDANCER_ROBOTID=1
source /home/nvidia/RoboCup_Workspace/core/devel/setup.bash
```
![3](/tutorial-images/image(8).png)

在右下角的终端窗口，依次输入

```bash
cd lib/
catkin_make
```
![4](/tutorial-images/image(9).png)

等待加载到 100% 后编译完成

接下来依次输入

```bash
cd ../core
catkin_make
```
![5](/tutorial-images/image(10).png)

机器人站立解锁，处于可以通过遥控的状态后关闭手柄控制话题：

终端输入 `rosnode kill /joy_teleop`
![6](/tutorial-images/image(11).png)


### 运行视觉识别程序，终端运行

```bash
roslaunch dlaunch piplus.launch
```
![7](/tutorial-images/image(12).png)

此时机器人即可自动识别足球

让机器人停止移动，发布话题
```bash
rostopic pub -r 10 /cmd_vel geometry_msgs/Twist '{linear: {x: 0, y: 0, z: 0}, angular: {x: 0, y: 0, z: 0}}'
```

恢复手柄控制使用指令

首先
```bash
source /home/nvidia/sim2real/install/setup.bash
```

若不成功，试一下
```bash
source /home/nvidia/sim2real_master-feature-master_and_slave/install/setup.bash
```

然后
```bash
roslaunch sim2real_master joy_teleop.launch use_filter:=true
```

## 机器人对应参数修改

机器人的编号要在之前培训过的 .bashrc 文件中的一行中修改，如下图 ZJUDANCER_ROBOTID
![8](/tutorial-images/image(13).png)

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
![9](/tutorial-images/image(14).png)

这里的 role 的 value 也要同步改：
![10](/tutorial-images/image(15).png)

机器人放在场边的位置dbehavior/config/role.yml 有不同角色的机器人放在场边的位置坐标start_pos。
![11](/tutorial-images/image(16).png)

机器人进场时面朝的方向为y轴正方向，右侧为x轴正方向，坐标系原点为球场中心。
kickoff_pos是进场后要走到的位置。
⚠️注意：坐标设置要在己方半场，不能超出范围。
可以想到，在己方半场两条边线上放置的机器人对于场地上同一个点的坐标的描述是相反的，两台机器人认为的坐标值刚好关于原点对称。所以两台机器人在相互通信时，从不同边线放置的机器人之间有一个位置的翻译机制，在dbehavior/src/dbehavior/core/dblackboard.py 中的update_teaminfo函数中。
![12](/tutorial-images/image(17).png)

role.yaml以上的pos是默认按照我方半场是左半场（AttackRight=True），机器人放在左下边线去写的，dbehavior在读取这些pos时，设置为AttackRight=True的机器人会把start_pos关于y轴对称，其他 pos关于原点对称处理，进行这些处理的代码也在dbehavior/src/dbehavior/core/dblackboard.py 中。

## 裁判盒使用方法
裁判盒下载链接：
https://github.com/RoboCup-HumanoidSoccerLeague/GameController
windows/ubuntu/mac均可，RoboCup官方的裁判盒程序，用来给机器人发送指令，使机器人正常进场，进球后回到己方半场
### 比赛准备阶段：
启动GameController，按照下列选项配置：  
Competition选择Small-Foundation的比赛模式（小尺寸基础组）
![13](/tutorial-images/image(18).png)
Kick-off for home/away team更改两只队伍的名字  
Goalkeeper Color选择不同队伍的颜色  
Mirror(home team starts on right side)左右互换，为了将屏幕上的队伍与场地上的队伍对应起来  
Interface选择网口：windows电脑选择WLAN；ubuntu通过ifconfig指令查询网口  
然后点击start进入如下界面：
![14](/tutorial-images/image(19).png)

先打开这个软件，再在机器人上启动roslaucnch dlaunch pi_plus.launch（⚠️注意：先后顺序不要弄反，否则无法接收裁判盒指令）  
启动终端指令后，将机器人放在己方半场两条边线中的任意一边。此时机器人的头会转动寻找场地的特征点初始化自己的定位，但是不会移动。  
等待裁判点击Ready后，在倒计时内机器人走到场内yaml文件中设定的开球位置，到达指定位置后点击Set按钮提前结束倒计时，接下来将足球放在场地中间，再点击Ball Free后，开始比赛。  
设置编号时设置1-3，不要设置更多的了，编号设置方式将在第二部分monitor使用方法里讲解。

### 比赛开始阶段：
点击Playing按钮比赛开始当有一方进球时，裁判会点击goal按钮计分，随后机器人会回到己方半场开球时的等待位置。如果机器人提前到达指定位置，裁判依然可以通过点击Set按钮结束等待时间，再点击Playing继续进行比赛。  
计时结束后点击finish按钮钮结束比赛。  
遇到特殊情况机器人失去自主行动能力时，裁判员可以点击Pick Up/Incapable按钮再点击对应的机器人序号，将机器人罚下。机器人检修完毕后，裁判员再次点击对应的机器人序号结束罚下指令，10秒倒计时结束后可自动上场参加比赛。

### monitor使用方法
主要参考vscode中readme部分，强调一下teamID部分，如下图：
![15](/tutorial-images/image(20).png)

编译过后会生成一个build文件夹，在build中新建上述图片提到的config.json并写入队伍编号team_id。
这样就会防止不同队伍间产生干扰。

### 常见Q&A汇总
#### 1、安装双系统来不及/不会
答：在b站上找教程，对于初次安装的人来讲确实难度不小，但是实测虚拟机也可以完成对机器人的操作和部署。

#### 2、clash verge翻墙软件不会弄/弄不好
答：很多人不知道怎么订阅，可以通过todesk/ssh将git上的代码通过自己的windows电脑传输到机器人上。

#### 3、todesk/ssh连接不稳定，总断。
答：使用VSode的remote-ssh插件进行远程连接，如果网络不稳定，建议使用自己电脑终端的ssh 用户名@IP地址 远程到机器人上，同时需要熟悉Linux常用指令和vim编辑器的指令

#### 4、遥控器连不上/连上不能按指令操作
答：需要通过长按手柄的控制键5s左右后，再按下手柄相应组合建试试机器人模式切换是否有反应，如一次不成功，需要多尝试几次
![16](/tutorial-images/image(21).png)

#### 5、相机运行2、3分钟后，机器人原地转圈
答：说明自主识别代码已经挂掉了，终端需要重新拉起自主识别roslaunch dlaunch piplus.launch

#### 6、执行catkin_make指令发现终端报无法识别该指令
答：终端输入source /opt/ros/noetic/setup.bash后再次执行catkin_make即可成功执行编译指令

#### 7、发现编译完成后按照流程执行roslaunch dlaunch pi_plus.launch指令，报了无法找到该launch file的错误
答：新建一个终端，再执行roslaunch dlaunch pi_plus.launch即可成功运行自主追求指令


