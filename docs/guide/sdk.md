# SDK 安装

## 下载运控 SDK

点击下方按钮下载最新版本的运动控制 SDK 安装包：

<div style="margin: 24px 0;">
  <a href="https://github.com/zixiangme/mini-pi-soccer-docs/releases/download/v1.0.0/sim2real_master-feature-master_and_slave_orin_wuandhou.tar.gz"
     style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: #2d8a4e; color: white; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">
    ⬇ 下载 sim2real SDK 安装包
  </a>
  <span style="margin-left: 16px; color: #888; font-size: 13px;">sim2real_master-feature-master_and_slave_orin_wuandhou.tar.gz（408 MB）</span>
</div>

<div style="margin: 24px 0;">
  <a href="https://github.com/zixiangme/mini-pi-soccer-docs/releases/download/v1.0.0/pi_plus_autostart.zip"
     style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: #4a90e2; color: white; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">
    ⬇ 下载开机自启动配置脚本
  </a>
  <span style="margin-left: 16px; color: #888; font-size: 13px;">pi_plus_autostart.zip（解压后为 pi_plus_autostart.desktop）</span>
</div>

<div style="margin: 24px 0;">
  <a href="https://github.com/zixiangme/mini-pi-soccer-docs/releases/download/v1.0.0/football_strategy_files.tar.gz"
     style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: #e67e22; color: white; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">
    ⬇ 下载足球策略文件
  </a>
  <span style="margin-left: 16px; color: #888; font-size: 13px;">football_strategy_files.tar.gz（49 MB）</span>
</div>

---

## 部署说明

### 1. 解压 SDK 安装包

将下载的压缩包放入主目录下，在终端中执行：

```bash
tar -zxvf sim2real_master-feature-master_and_slave_orin_wuandhou.tar.gz
```

### 2. 配置开机自启动

下载并解压 `pi_plus_autostart.zip`：

```bash
unzip pi_plus_autostart.zip
```

删除旧的自启动程序：

```bash
rm -rf /home/nvidia/.config/autostart/*
```

将解压后的 `pi_plus_autostart.desktop` 文件移动到自启动目录：

```bash
mv pi_plus_autostart.desktop /home/nvidia/.config/autostart/
```

### 3. 重启机器人

完成以上步骤后，重新启动机器人即可自动运行运控程序。