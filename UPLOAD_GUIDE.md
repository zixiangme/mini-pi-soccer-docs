# 📤 文档上传功能使用说明

## 🎯 功能简介

这是一个简单易用的文档管理工具，帮助您快速创建和发布网站内容，**无需安装任何软件，无需运行后端服务器**。

## ✨ 使用步骤（只需 3 步）

### 第 1 步：访问上传页面

打开网站，点击顶部导航栏的 **"📤 上传文档"**

或直接访问：
- https://mini-pi-docs.vercel.app/upload.html
- https://zixiangme.github.io/mini-pi-soccer-docs/upload.html

### 第 2 步：填写文档信息

1. **选择分类**：选择文档属于哪个类别
   - 🎮 开发指南
   - ⚽ 足球应用
   - 📚 教程

2. **输入文件名**：给文档起个名字
   - ✅ 推荐：`advanced-motion` 或 `advanced-motion.md`
   - ❌ 避免：`高级运动.md` 或 `advanced motion.md`

3. **编写内容**：
   - 点击 **"📋 加载模板"** 快速开始
   - 或直接输入 Markdown 内容

### 第 3 步：保存到网站

1. 点击 **"🚀 生成保存命令"** 按钮
2. 点击 **"📋 复制全部"** 复制生成的命令
3. 在终端中粘贴并执行命令

**完成！** 等待 2-3 分钟，网站会自动更新。

## 📝 详细示例

### 示例 1：创建一个新教程

**场景**：我想添加一个"基础踢球动作"的教程

1. 访问上传页面
2. 填写信息：
   - 分类：📚 教程
   - 文件名：`basic-kick`
   - 内容：点击"加载模板"，然后修改内容

3. 点击"生成保存命令"，会得到：

```bash
# 保存文件
cat > /home/sunteng/mini-pi-docs/docs/tutorials/basic-kick.md << 'EOF'
# 基础踢球动作

## 学习目标
...
EOF

# 推送到网站
cd /home/sunteng/mini-pi-docs
git add docs/tutorials/basic-kick.md
git commit -m "添加文档: basic-kick.md"
git push origin master
```

4. 复制这些命令，在终端执行

5. 完成！访问 `https://mini-pi-docs.vercel.app/tutorials/basic-kick` 查看

### 示例 2：添加开发指南

**场景**：我想添加"传感器配置"指南

1. 分类：🎮 开发指南
2. 文件名：`sensor-config`
3. 内容：编写传感器配置说明
4. 生成命令并执行

## 🎨 Markdown 语法速查

### 标题
```markdown
# 一级标题
## 二级标题
### 三级标题
```

### 文本样式
```markdown
**粗体文字**
*斜体文字*
~~删除线~~
`代码`
```

### 列表
```markdown
- 无序列表项 1
- 无序列表项 2

1. 有序列表项 1
2. 有序列表项 2
```

### 链接和图片
```markdown
[链接文字](https://example.com)
![图片描述](/image.png)
```

### 代码块
````markdown
```python
def hello():
    print("Hello World")
```
````

### 表格
```markdown
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 内容1 | 内容2 | 内容3 |
```

### 提示框
```markdown
::: tip 提示
这是一个提示框
:::

::: warning 警告
这是一个警告框
:::

::: danger 危险
这是一个危险提示框
:::
```

## 🖼️ 如何添加图片

### 方法 1：使用命令行

```bash
# 1. 复制图片到 public 目录
cp /path/to/image.png /home/sunteng/mini-pi-docs/docs/public/

# 2. 在 Markdown 中引用
![图片描述](/image.png)

# 3. 提交推送
cd /home/sunteng/mini-pi-docs
git add docs/public/image.png
git commit -m "添加图片"
git push origin master
```

### 方法 2：使用外部图床

直接使用图片 URL：
```markdown
![图片描述](https://example.com/image.png)
```

## 🎬 如何添加视频

### 方法 1：本地视频（需要压缩）

```bash
# 1. 压缩视频（如果超过 100MB）
ffmpeg -i input.mp4 -vcodec libx264 -crf 28 output.mp4

# 2. 复制到 public 目录
cp output.mp4 /home/sunteng/mini-pi-docs/docs/public/

# 3. 在 Markdown 中添加
<video controls width="100%">
  <source src="/output.mp4" type="video/mp4">
</video>

# 4. 提交推送
cd /home/sunteng/mini-pi-docs
git add docs/public/output.mp4
git commit -m "添加视频"
git push origin master
```

### 方法 2：使用视频链接

```markdown
<video controls width="100%">
  <source src="https://example.com/video.mp4" type="video/mp4">
</video>
```

## 🔧 如何在导航栏显示新文档

如果您想让新文档出现在侧边栏导航中：

1. 编辑配置文件：
```bash
nano /home/sunteng/mini-pi-docs/docs/.vitepress/config.mjs
```

2. 找到对应的 sidebar 部分，添加链接：

```javascript
sidebar: {
  '/tutorials/': [
    {
      text: '📖 教程',
      items: [
        { text: '入门教程', link: '/tutorials/' },
        { text: '基础动作', link: '/tutorials/basic-motion' },
        { text: '新教程', link: '/tutorials/basic-kick' }  // 添加这行
      ]
    }
  ]
}
```

3. 保存并推送：
```bash
cd /home/sunteng/mini-pi-docs
git add docs/.vitepress/config.mjs
git commit -m "更新导航"
git push origin master
```

## ⚠️ 常见问题

### Q: 文件名可以用中文吗？
**A:** 不建议。使用英文和连字符，如 `advanced-motion.md`

### Q: 推送后多久能看到更新？
**A:** 通常 2-3 分钟，GitHub Actions 会自动部署

### Q: 如何删除已上传的文档？
**A:** 使用以下命令：
```bash
cd /home/sunteng/mini-pi-docs
rm docs/tutorials/unwanted-file.md
git add .
git commit -m "删除文档"
git push origin master
```

### Q: 如何修改已有文档？
**A:** 直接编辑文件：
```bash
nano /home/sunteng/mini-pi-docs/docs/tutorials/basic-motion.md
# 修改后保存
git add .
git commit -m "更新文档"
git push origin master
```

### Q: 上传的图片/视频太大怎么办？
**A:**
- 图片：使用在线压缩工具（如 tinypng.com）
- 视频：使用 ffmpeg 压缩（见上面的视频添加方法）
- 或使用外部图床/视频托管服务

### Q: 如何查看部署状态？
**A:** 访问 https://github.com/zixiangme/mini-pi-soccer-docs/actions

### Q: 推送失败怎么办？
**A:** 先拉取最新代码：
```bash
cd /home/sunteng/mini-pi-docs
git pull origin master
# 然后重新推送
git push origin master
```

## 📞 需要帮助？

如果遇到问题：
1. 检查命令是否正确执行
2. 查看 GitHub Actions 部署日志
3. 确认文件路径和文件名正确

## 🎉 快速命令参考

```bash
# 进入项目目录
cd /home/sunteng/mini-pi-docs

# 查看状态
git status

# 添加所有修改
git add .

# 提交
git commit -m "描述你的修改"

# 推送
git push origin master

# 查看历史
git log --oneline

# 拉取最新
git pull origin master
```

---

**祝使用愉快！🚀**
