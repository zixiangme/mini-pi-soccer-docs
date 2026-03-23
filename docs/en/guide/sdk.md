# SDK Installation

## Download Motion Control SDK

Click the button below to download the latest version of the motion control SDK package:

<div style="margin: 24px 0;">
  <a href="https://github.com/zixiangme/mini-pi-soccer-docs/releases/download/v1.0.0/sim2real_master-feature-master_and_slave_orin_wuandhou.tar.gz"
     style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: #2d8a4e; color: white; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">
    ⬇ Download sim2real SDK Package
  </a>
  <span style="margin-left: 16px; color: #888; font-size: 13px;">sim2real_master-feature-master_and_slave_orin_wuandhou.tar.gz (408 MB)</span>
</div>

<div style="margin: 24px 0;">
  <a href="https://github.com/zixiangme/mini-pi-soccer-docs/releases/download/v1.0.0/pi_plus_autostart.zip"
     style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: #4a90e2; color: white; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">
    ⬇ Download Auto-start Configuration Script
  </a>
  <span style="margin-left: 16px; color: #888; font-size: 13px;">pi_plus_autostart.zip (extracts to pi_plus_autostart.desktop)</span>
</div>

---

## Football Strategy Files

Download pre-trained football strategy files, including AMP policy, ByondMimic football action policy, and more:

<div style="margin: 24px 0;">
  <a href="https://github.com/zixiangme/mini-pi-soccer-docs/releases/download/v1.0.0/football_strategy_files.tar.gz"
     style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: #e67e22; color: white; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">
    ⬇ Download Football Strategy Files
  </a>
  <span style="margin-left: 16px; color: #888; font-size: 13px;">football_strategy_files.tar.gz (49 MB)</span>
</div>

**Extraction Instructions:**

```bash
tar -zxvf football_strategy_files.tar.gz
```

After extraction, the package contains:
- `AMP_policy/` - AMP policy files
- `ByondMimic_football_action_policy/` - ByondMimic football action policy
- `football_data/` - Football training data

---

## Deployment Instructions

### 1. Extract SDK Package

Place the downloaded archive in your home directory and execute in terminal:

```bash
tar -zxvf sim2real_master-feature-master_and_slave_orin_wuandhou.tar.gz
```

### 2. Configure Auto-start

Download and extract `pi_plus_autostart.zip`:

```bash
unzip pi_plus_autostart.zip
```

Remove old auto-start programs:

```bash
rm -rf /home/nvidia/.config/autostart/*
```

Move the extracted `pi_plus_autostart.desktop` file to the auto-start directory:

```bash
mv pi_plus_autostart.desktop /home/nvidia/.config/autostart/
```

### 3. Restart Robot

After completing the above steps, restart the robot to automatically run the motion control program.
