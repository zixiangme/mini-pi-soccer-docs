# 📝 Mini Pi+ 文档更新指南

本指南将帮助你轻松更新和维护 Mini Pi+ 足球机器人文档网站。

## 🚀 快速开始

### 启动本地开发服务器

```bash
cd mini-pi-docs

# 确保使用 Node.js 20+
source ~/.nvm/nvm.sh && nvm use 20

# 启动文档网站（端口 5173）
npm run docs:dev

# 启动上传服务器（端口 3001）- 可选
npm run server:dev
```

访问 http://localhost:5173 查看网站

## 📂 项目结构

```
mini-pi-docs/
├── docs/                          # 所有文档内容
│   ├── .vitepress/               # VitePress 配置
│   │   ├── config.mjs            # 网站配置（导航、侧边栏）
│   │   └── theme/                # 自定义主题
│   │       ├── index.js          # 主题入口
│   │       └── custom.css        # 足球绿茵风格样式
│   ├── guide/                    # 开发指南文档
│   │   ├── index.md              # 指南首页
│   │   └── setup.md              # 环境配置等
│   ├── soccer/                   # 足球应用文档
│   │   ├── index.md              # 足球应用概述
│   │   └── motion.md             # 运动控制等
│   ├── tutorials/                # 教程文档
│   │   ├── index.md              # 教程中心
│   │   └── basic-motion.md       # 基础教程等
│   ├── public/                   # 静态资源（图片、PDF等）
│   ├── index.md                  # 网站首页
│   └── upload.md                 # 上传页面
├── server/                       # 上传服务器（可选）
│   └── index.js
├── package.json
├── vercel.json                   # Vercel 部署配置
└── README.md
```

## ✍️ 添加/更新文档

### 方法 1：直接编辑 Markdown 文件（推荐）

1. **创建新文档**

```bash
# 在对应目录创建 .md 文件
cd docs/guide
nano new-guide.md
```

2. **编写 Markdown 内容**

```markdown
# 文档标题

这是文档内容...

## 二级标题

### 代码示例

\`\`\`python
# Python 代码会自动高亮
def hello():
    print("Hello Mini Pi+")
\`\`\`

### 提示框

::: tip 提示
这是一个提示框
:::

::: warning 警告
这是一个警告框
:::

::: danger 危险
这是一个危险提示
:::
```

3. **更新导航/侧边栏**

编辑 `docs/.vitepress/config.mjs`：

```javascript
sidebar: {
  '/guide/': [
    {
      text: '⚡ 快速开始',
      items: [
        { text: '简介', link: '/guide/' },
        { text: '新文档', link: '/guide/new-guide' }  // 添加这行
      ]
    }
  ]
}
```

### 方法 2：使用在线上传（适合 PDF 和快速添加）

1. 访问 http://localhost:5173/upload
2. 选择文档分类（开发指南/足球应用/教程）
3. 选择文件（支持 .md 和 .pdf）
4. 点击上传

**注意**：上传后需要重启开发服务器才能看到更新

### 方法 3：从 PDF 转换

如果你有 PDF 文档，可以：

1. **手动转换**：复制 PDF 内容，整理成 Markdown 格式
2. **使用工具**：使用 PDF 转 Markdown 工具（如 Adobe Acrobat、在线转换器）
3. **直接上传**：PDF 文件会保存到 `docs/public/pdfs/` 供下载

## 🎨 自定义样式

### 修改主题颜色

编辑 `docs/.vitepress/theme/custom.css`：

```css
:root {
  /* 修改主色调 */
  --vp-c-brand: #10b981;        /* 主绿色 */
  --vp-c-brand-light: #34d399;  /* 浅绿色 */
  --vp-c-brand-dark: #059669;   /* 深绿色 */
}
```

### 修改首页

编辑 `docs/index.md`：

```markdown
---
layout: home

hero:
  name: "⚽ Mini Pi+"
  text: "足球机器人开发平台"
  tagline: 🏆 你的标语
  actions:
    - theme: brand
      text: 开始使用
      link: /guide/

features:
  - icon: ⚽
    title: 特性标题
    details: 特性描述
---
```

## 📸 添加图片

### 1. 添加图片文件

将图片放到 `docs/public/` 目录：

```bash
cp your-image.png docs/public/images/
```

### 2. 在 Markdown 中引用

```markdown
![图片描述](/images/your-image.png)

<!-- 或使用 HTML 控制大小 -->
<img src="/images/your-image.png" alt="描述" style="width: 600px;">
```

## 🔧 常用 Markdown 语法

### 链接

```markdown
[链接文字](/guide/setup)
[外部链接](https://example.com)
```

### 表格

```markdown
| 参数 | 类型 | 说明 |
|------|------|------|
| name | string | 名称 |
| age  | number | 年龄 |
```

### 代码块

````markdown
```python
# Python 代码
def hello():
    print("Hello")
```

```javascript
// JavaScript 代码
console.log("Hello");
```
````

### 列表

```markdown
- 无序列表项 1
- 无序列表项 2

1. 有序列表项 1
2. 有序列表项 2
```

## 🌐 部署到 Vercel（公网访问）

### 首次部署

1. **准备 Git 仓库**

```bash
cd mini-pi-docs
git init
git add .
git commit -m "Initial commit"

# 推送到 GitHub
git remote add origin https://github.com/your-username/mini-pi-docs.git
git push -u origin main
```

2. **在 Vercel 部署**

- 访问 https://vercel.com
- 点击 "New Project"
- 导入你的 GitHub 仓库
- Vercel 会自动检测 VitePress 项目
- 点击 "Deploy"

3. **获取网址**

部署完成后，你会得到一个公网地址：
```
https://your-project.vercel.app
```

### 更新部署

每次更新文档后：

```bash
git add .
git commit -m "更新文档"
git push
```

Vercel 会自动重新部署，几分钟后更新就会生效。

### 自定义域名（可选）

在 Vercel 项目设置中：
1. 进入 "Settings" → "Domains"
2. 添加你的域名
3. 按照提示配置 DNS

## 📋 常见任务

### 添加新的文档分类

1. 创建新目录：
```bash
mkdir docs/new-section
```

2. 创建首页：
```bash
echo "# 新分类" > docs/new-section/index.md
```

3. 更新配置 `docs/.vitepress/config.mjs`：
```javascript
nav: [
  { text: '🆕 新分类', link: '/new-section/' }
],

sidebar: {
  '/new-section/': [
    {
      text: '新分类',
      items: [
        { text: '介绍', link: '/new-section/' }
      ]
    }
  ]
}
```

### 修改导航栏

编辑 `docs/.vitepress/config.mjs` 的 `nav` 部分：

```javascript
nav: [
  { text: '⚽ 首页', link: '/' },
  { text: '🎮 开发指南', link: '/guide/' },
  // 添加更多导航项...
]
```

### 修改页脚

编辑 `docs/.vitepress/config.mjs`：

```javascript
footer: {
  message: '⚽ 你的消息',
  copyright: 'Copyright © 2026 你的团队'
}
```

### 添加 Logo

1. 将 logo 文件放到 `docs/public/`
2. 更新配置：
```javascript
themeConfig: {
  logo: '/logo.svg'  // 或 /logo.png
}
```

## 🐛 故障排除

### 端口被占用

```bash
# 查找占用端口的进程
lsof -i :5173
# 或
netstat -tuln | grep 5173

# 杀死进程
kill -9 <PID>
```

### 样式不生效

1. 清除缓存：
```bash
rm -rf docs/.vitepress/cache
rm -rf docs/.vitepress/dist
```

2. 重启开发服务器

### 构建失败

检查 Node.js 版本：
```bash
node --version  # 应该是 v18+ 或 v20+
```

如果版本太低：
```bash
source ~/.nvm/nvm.sh
nvm install 20
nvm use 20
```

## 📚 更多资源

- [VitePress 官方文档](https://vitepress.dev/)
- [Markdown 语法指南](https://www.markdownguide.org/)
- [Vercel 部署文档](https://vercel.com/docs)

## 💡 最佳实践

1. **定期提交**：每次修改后及时 commit
2. **清晰的文件名**：使用有意义的文件名，如 `motion-control.md`
3. **添加图片**：用图片和图表让文档更易懂
4. **代码示例**：提供完整可运行的代码示例
5. **保持更新**：定期检查和更新过时的内容
6. **测试链接**：确保所有内部链接都有效

## 🎯 快速命令参考

```bash
# 开发
npm run docs:dev          # 启动开发服务器
npm run server:dev        # 启动上传服务器

# 构建
npm run docs:build        # 构建生产版本
npm run docs:preview      # 预览构建结果

# Git
git add .                 # 添加所有更改
git commit -m "消息"      # 提交更改
git push                  # 推送到远程（触发 Vercel 部署）

# Node 版本管理
nvm use 20               # 切换到 Node 20
nvm list                 # 查看已安装的版本
```

---

**需要帮助？** 查看项目 Issues 或联系开发团队。

**祝你文档编写愉快！⚽🤖**
