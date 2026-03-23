# 足球策略文件

下载预训练的足球策略文件，包含 AMP 策略、ByondMimic 足球动作策略等。

## 下载策略文件

<div style="margin: 24px 0;">
  <a href="https://github.com/zixiangme/mini-pi-soccer-docs/releases/download/v1.0.0/football_strategy_files.tar.gz"
     style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: #e67e22; color: white; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">
    ⬇ 下载足球策略文件
  </a>
  <span style="margin-left: 16px; color: #888; font-size: 13px;">football_strategy_files.tar.gz（49 MB）</span>
</div>

## 解压说明

下载完成后，在终端中执行：

```bash
tar -zxvf football_strategy_files.tar.gz
```

## 文件内容

解压后包含以下目录：

### 📁 AMP_policy/
AMP (Adversarial Motion Priors) 策略文件，用于生成自然流畅的运动动作。

### 📁 ByondMimic_football_action_policy/
ByondMimic 足球动作策略文件，包含专门针对足球比赛优化的动作策略：
- 踢球动作
- 带球动作
- 守门动作
- 其他足球专用动作

### 📁 football_data/
足球训练数据集，用于策略训练和优化。

