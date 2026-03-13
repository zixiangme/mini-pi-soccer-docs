# ⚽ 足球应用系统

Mini Pi+ 足球应用是一个完整的机器人足球解决方案，基于 ROS (Robot Operating System) 架构，提供从感知、决策到执行的全流程支持。

## 🏗️ 系统架构

足球应用系统采用模块化设计，各模块协同工作：

```
感知层 (dvision) → 决策层 (dbehavior) → 执行层 (dplanner/motion)
         ↓              ↓                    ↓
    网络通信 (dnetwork) ← 配置管理 (dconfig) → 硬件接口 (dancer-io)
```

## 📦 核心模块

### [🎥 视觉系统 (dvision)](/soccer/vision)
计算机视觉处理模块，负责场地感知和目标识别。

**主要功能：**
- 🎯 实时目标检测（足球、球门、障碍物、场地标记）
- 📍 机器人定位与导航（AMCL 粒子滤波）
- 📷 多相机源支持（USB、GStreamer、ZED 立体相机）
- 🧠 YOLO 神经网络检测
- 🎬 离线录制与回放

**关键特性：**
- 卡尔曼滤波球追踪
- 相机标定与畸变校正
- 图像投影与坐标转换
- 视觉罗盘方向估计

---

### [🧠 行为决策 (dbehavior)](/soccer/behavior)
高层决策与策略执行模块，实现智能行为控制。

**主要功能：**
- 🌳 行为树架构（分层任务规划）
- 👥 多角色支持（前锋、后卫、守门员、点球手）
- 🎮 技能系统（可复用动作原语）
- 🤝 团队协作与角色分配
- 📊 比赛状态管理

**支持角色：**
- **Striker** - 前锋：主动进攻，追球射门
- **Defender** - 后卫：防守站位，拦截对手
- **Goalkeeper** - 守门员：守护球门，扑救射门
- **PenaltyKicker** - 点球手：点球专用策略

---

### [🎯 运动控制 (dplanner)](/soccer/motion)
运动规划与执行模块，连接决策层与底层运动控制。

**主要功能：**
- 🔄 运动中枢通信
- 📐 轨迹规划
- ⚡ 实时运动指令下发
- 🔗 高层行为到底层执行的桥接

---

### [🌐 网络通信 (dnetwork)](/soccer/network)
比赛控制器通信与团队协作模块。

**主要功能：**
- 🎮 RoboCup 比赛控制器协议（SPL 标准）
- 📡 团队信息交换
- 🏆 比赛状态同步
- 👥 多机器人协调

**通信内容：**
- 比赛阶段（初始、就绪、比赛中、结束）
- 机器人状态（罚下、活跃）
- 球权信息
- 团队策略

---

### [⚙️ 配置管理 (dconfig)](/soccer/config)
集中式配置管理模块，支持运行时参数调整。

**主要功能：**
- 📝 YAML 配置文件管理
- 🤖 多机器人参数集（支持 6 个机器人）
- 🔄 运行时配置热重载
- 📷 相机标定参数
- 🎯 行为常量配置

**配置类型：**
- 场地几何参数（球场尺寸、球门位置）
- 机器人物理参数（步态、速度限制）
- 视觉参数（相机内参、检测阈值）
- 行为参数（策略权重、决策阈值）

## 🚀 快速开始

### 1. 启动完整系统

```bash
# 启动所有模块
roslaunch dlaunch all.launch robot_id:=1
```

### 2. 启动单个模块

```bash
# 启动视觉系统
roslaunch dvision default.launch

# 启动行为决策
roslaunch dbehavior default.launch role:=Striker

# 启动网络通信
roslaunch dnetwork default.launch
```

### 3. 调试模式

```bash
# 启动调试模式（详细日志）
roslaunch dlaunch debug.launch
```

## 📊 数据流

系统各模块通过 ROS 话题进行通信：

```
dvision → /vision_info (VisionInfo)
  ├─ 检测到的目标（球、球门、障碍物）
  ├─ 机器人位置估计
  └─ 场地标记信息

dbehavior → /action (Action)
  ├─ 运动指令（行走、转向、踢球）
  ├─ 头部控制
  └─ LED 状态

dnetwork → /gc_info (GCInfo)
  ├─ 比赛状态
  ├─ 团队信息
  └─ 裁判指令

dancer-io → /motion_info (MotionInfo)
  ├─ IMU 数据
  ├─ 电机状态
  └─ 里程计
```

## 🎮 操作模式

### 自主模式
机器人完全自主决策和执行，适用于正式比赛。

```bash
roslaunch dlaunch all.launch robot_id:=1 role:=Striker
```

### 手柄控制模式
通过游戏手柄远程控制机器人，适用于调试和演示。

```bash
roslaunch dlaunch joy.launch
```

### 录制回放模式
录制比赛数据用于离线分析和算法优化。

```bash
# 录制
roslaunch dlaunch record.launch

# 回放
roslaunch dlaunch replay.launch bag_file:=/path/to/data.bag
```

## 🔧 配置文件

主要配置文件位置：

```
RoboCup_Workspace/core/src/
├── dconfig/
│   ├── constant.yml          # 场地常量
│   ├── global.yml            # 全局配置
│   ├── 1/                    # 机器人1配置
│   ├── 2/                    # 机器人2配置
│   └── ...
├── dvision/config/
│   ├── camera_params.yaml    # 相机参数
│   └── detection.yaml        # 检测配置
└── dbehavior/config/
    ├── behavior_tree.yaml    # 行为树配置
    └── skills.yaml           # 技能参数
```

## 📚 深入学习

选择感兴趣的模块深入了解：

- [🎥 视觉系统详解](/soccer/vision) - 了解目标检测和定位算法
- [🧠 行为决策详解](/soccer/behavior) - 学习行为树和策略设计
- [🎯 运动控制详解](/soccer/motion) - 掌握运动规划和执行
- [🌐 网络通信详解](/soccer/network) - 理解团队协作机制
- [⚙️ 配置管理详解](/soccer/config) - 学习参数调优

## 🎯 应用场景

### RoboCup 比赛
完整支持 RoboCup SPL（标准平台联赛）规则，包括：
- 5v5 足球比赛
- 点球大战
- 技术挑战赛

### 教学演示
适合用于：
- 机器人课程教学
- 人工智能算法演示
- 计算机视觉实验

### 研究开发
支持：
- 算法验证与测试
- 新策略开发
- 多机器人协作研究

## 🤝 技术支持

遇到问题？查看：
- [常见问题](/guide/faq)
- [API 文档](/guide/api)
- [GitHub Issues](https://github.com/HighTorque-Robotics/RoboCup_Workspace/issues)

## 下一步

建议按以下顺序学习：

1. 📖 [完整部署教程](/tutorials/) - 从零开始部署系统
2. 🎥 [视觉系统](/soccer/vision) - 理解感知层
3. 🧠 [行为决策](/soccer/behavior) - 掌握决策层
4. ⚙️ [配置管理](/soccer/config) - 学习参数调优
