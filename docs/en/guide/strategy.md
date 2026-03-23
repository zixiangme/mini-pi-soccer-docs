# Football Strategy Files

Download pre-trained football strategy files, including AMP policy, ByondMimic football action policy, and more.

## Download Strategy Files

<div style="margin: 24px 0;">
  <a href="https://github.com/zixiangme/mini-pi-soccer-docs/releases/download/v1.0.0/football_strategy_files.tar.gz"
     style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: #e67e22; color: white; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">
    ⬇ Download Football Strategy Files
  </a>
  <span style="margin-left: 16px; color: #888; font-size: 13px;">football_strategy_files.tar.gz (49 MB)</span>
</div>

## Extraction Instructions

After downloading, execute in terminal:

```bash
tar -zxvf football_strategy_files.tar.gz
```

## File Contents

After extraction, the package contains the following directories:

### 📁 AMP_policy/
AMP (Adversarial Motion Priors) policy files for generating natural and fluid motion actions.

### 📁 ByondMimic_football_action_policy/
ByondMimic football action policy files, containing action strategies optimized specifically for soccer matches:
- Kicking actions
- Dribbling actions
- Goalkeeper actions
- Other soccer-specific actions

### 📁 football_data/
Football training dataset for policy training and optimization.

## Usage Instructions

Place the extracted strategy files in the robot's strategy directory. For the specific path, please refer to the [SDK Installation](/en/guide/sdk) documentation.

## Related Documentation

- [SDK Installation](/en/guide/sdk) - Install motion control SDK
- [Motion Control](/en/soccer/motion) - Learn about the motion control system
- [Behavior Decision](/en/soccer/behavior) - Learn how strategies are applied to behavior decisions
