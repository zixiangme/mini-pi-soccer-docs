# 📝 如何更新和编辑网站内容

本文档介绍如何编辑网站内容并推送更新到线上。

## 🎯 快速开始

### 1. 编辑网站内容

所有网站内容都在 `docs/` 目录下：

```
docs/
├── index.md              # 首页
├── guide/               # 开发指南
│   ├── index.md
│   ├── setup.md
│   └── ...
├── soccer/              # 足球应用
│   ├── index.md
│   ├── motion.md
│   └── ...
├── tutorials/           # 教程
│   └── ...
└── public/              # 静态资源（图片、视频等）
    ├── company-logo.png
    ├── demo.mp4
    └── ...
```

### 2. 编辑 Markdown 文件

使用任何文本编辑器打开 `.md` 文件进行编辑：

```bash
# 编辑首页
nano docs/index.md

# 或使用 VS Code
code docs/index.md
```

### 3. 推送更新到线上

编辑完成后，运行以下命令推送更新：

```bash
cd /home/sunteng/mini-pi-docs

# 1. 添加所有修改的文件
git add .

# 2. 提交更改（修改提交信息）
git commit -m "更新网站内容"

# 3. 推送到 GitHub
git push origin master
```

**等待 2-3 分钟**，网站会自动部署更新。

## 📄 常见编辑任务

### 修改首页内容

编辑 `docs/index.md`：

```markdown
---
layout: home

hero:
  name: "⚽ Mini Pi+"
  text: "足球机器人开发平台"
  tagline: 🏆 修改这里的标语
  actions:
    - theme: brand
      text: 🚀 快速开始
      link: /guide/
---
```

### 添加新页面

1. 在对应目录创建新的 `.md` 文件：

```bash
# 添加新的教程页面
nano docs/tutorials/new-tutorial.md
```

2. 在 `docs/.vitepress/config.mjs` 中添加导航链接：

```javascript
sidebar: {
  '/tutorials/': [
    {
      text: '📖 教程',
      items: [
        { text: '入门教程', link: '/tutorials/' },
        { text: '新教程', link: '/tutorials/new-tutorial' }  // 添加这行
      ]
    }
  ]
}
```

### 添加图片

1. 将图片放到 `docs/public/` 目录：

```bash
cp /path/to/image.png docs/public/
```

2. 在 Markdown 中引用：

```markdown
![图片描述](/image.png)
```

### 添加视频

1. 将视频放到 `docs/public/` 目录：

```bash
cp /path/to/video.mp4 docs/public/
```

2. 在 Markdown 中添加视频：

```markdown
<video controls width="100%">
  <source src="/video.mp4" type="video/mp4">
</video>
```

### 修改导航栏

编辑 `docs/.vitepress/config.mjs`：

```javascript
nav: [
  { text: '⚽ 首页', link: '/' },
  { text: '🎮 开发指南', link: '/guide/' },
  { text: '🤖 足球应用', link: '/soccer/' },
  { text: '📚 教程', link: '/tutorials/' },
  { text: '新菜单', link: '/new-page' }  // 添加新菜单
]
```

### 修改公司 Logo

替换 `docs/public/company-logo.png` 文件：

```bash
cp /path/to/new-logo.png docs/public/company-logo.png
```

## 🚀 完整更新流程

```bash
# 1. 进入项目目录
cd /home/sunteng/mini-pi-docs

# 2. 编辑文件（使用你喜欢的编辑器）
nano docs/index.md

# 3. 查看修改了哪些文件
git status

# 4. 添加所有修改
git add .

# 5. 提交更改
git commit -m "描述你的修改内容"

# 6. 推送到 GitHub
git push origin master

# 7. 等待 2-3 分钟，访问网站查看更新
# GitHub Pages: https://zixiangme.github.io/mini-pi-soccer-docs/
# Vercel: https://mini-pi-docs.vercel.app
```

## 📝 Markdown 语法参考

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

## 🔧 本地预览

在推送前，可以先在本地预览效果：

```bash
cd /home/sunteng/mini-pi-docs

# 启动开发服务器
npm run docs:dev

# 访问 http://localhost:5173 查看效果
```

按 `Ctrl+C` 停止预览服务器。

## ⚠️ 注意事项

1. **文件大小限制**
   - 单个文件不能超过 100MB
   - 视频文件建议压缩后再上传
   - 图片建议使用 WebP 或压缩后的 PNG/JPG

2. **提交信息规范**
   ```bash
   git commit -m "添加新教程"        # ✅ 清晰描述
   git commit -m "update"           # ❌ 太模糊
   ```

3. **推送前检查**
   ```bash
   # 查看修改内容
   git diff

   # 查看修改的文件列表
   git status
   ```

4. **如果推送失败**
   ```bash
   # 拉取最新代码
   git pull origin master

   # 解决冲突后重新推送
   git push origin master
   ```

## 🌐 访问地址

更新推送后，访问以下地址查看效果：

- **GitHub Pages**: https://zixiangme.github.io/mini-pi-soccer-docs/
- **Vercel**: https://mini-pi-docs.vercel.app

## 📞 需要帮助？

如果遇到问题：

1. 检查 Git 状态：`git status`
2. 查看提交历史：`git log --oneline`
3. 查看部署状态：访问 https://github.com/zixiangme/mini-pi-soccer-docs/actions

---

**祝编辑愉快！🎉**
