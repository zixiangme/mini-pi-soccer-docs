# ⚽ Mini Pi+ 足球机器人开发文档

基于 VitePress 构建的 Mini Pi+ 机器人足球应用开发文档网站，采用足球绿茵科技风格设计。

## ✨ 特性

- ⚽ **足球绿茵科技风格** - 专业的足球主题设计，绿色渐变配色
- 📚 **完整的开发文档** - 从入门到精通的完整教程体系
- 🔍 **全文搜索功能** - 快速查找所需内容
- 💻 **代码语法高亮** - 支持多种编程语言
- 📤 **在线文档上传** - 方便快捷的文档管理
- 🌙 **深色模式支持** - 护眼的暗色主题
- 📱 **响应式设计** - 完美适配各种设备
- 🚀 **一键部署** - 支持 Vercel 快速部署到公网

## 🚀 快速开始

### 前置要求

- Node.js 18+ 或 20+（推荐使用 nvm 管理版本）
- npm 或 yarn

### 安装依赖

```bash
cd mini-pi-docs

# 如果使用 nvm，先切换到 Node 20
source ~/.nvm/nvm.sh && nvm use 20

# 安装依赖
npm install
```

### 启动开发服务器

```bash
# 启动文档网站（端口 5173）
npm run docs:dev

# 启动上传服务器（端口 3001）- 可选
npm run server:dev
```

访问：
- 📚 文档网站: http://localhost:5173
- 📤 上传 API: http://localhost:3001

### 构建生产版本

```bash
npm run docs:build
```

构建后的文件在 `docs/.vitepress/dist` 目录。

### 预览生产版本

```bash
npm run docs:preview
```

## 🌐 部署到公网

### 快速部署到 Vercel（推荐）

1. 推送代码到 GitHub
2. 访问 https://vercel.com 导入项目
3. 自动部署，获得公网地址

**详细步骤请查看：** [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 📁 项目结构

```
mini-pi-docs/
├── docs/                          # 文档内容
│   ├── .vitepress/               # VitePress 配置
│   │   ├── config.mjs            # 网站配置（导航、侧边栏）
│   │   └── theme/                # 自定义主题
│   │       ├── index.js          # 主题入口
│   │       └── custom.css        # 足球绿茵风格样式
│   ├── guide/                    # 开发指南文档
│   ├── soccer/                   # 足球应用文档
│   ├── tutorials/                # 教程文档
│   ├── public/                   # 静态资源（图片、Logo等）
│   │   └── logo.svg              # 网站 Logo
│   ├── index.md                  # 首页
│   └── upload.md                 # 上传页面
├── server/                       # 上传服务器（可选）
│   └── index.js                  # Express 服务器
├── DOCS_UPDATE_GUIDE.md          # 📝 文档更新指南
├── DEPLOYMENT_GUIDE.md           # 🚀 部署指南
├── vercel.json                   # Vercel 部署配置
└── package.json
```

## 📝 更新文档

**详细的文档更新指南请查看：** [DOCS_UPDATE_GUIDE.md](./DOCS_UPDATE_GUIDE.md)

### 快速添加文档

1. **直接编辑 Markdown**（推荐）
   ```bash
   # 创建新文档
   nano docs/guide/new-doc.md

   # 更新配置添加到侧边栏
   nano docs/.vitepress/config.mjs
   ```

2. **在线上传**
   - 访问 http://localhost:5173/upload
   - 选择分类和文件上传

3. **从 PDF 转换**
   - 将 PDF 内容整理成 Markdown 格式
   - 或直接上传 PDF 供下载

## 🎨 足球绿茵科技风格

网站采用专业的足球主题设计：

- 🟢 **绿茵场配色** - 以足球场草地绿为主色调
- ⚽ **足球元素** - Logo、图标融入足球和机器人元素
- 🎯 **科技感设计** - 现代化的渐变和动画效果
- 🏟️ **草地纹理** - 卡片悬停时显示草地纹理效果
- ⚡ **流畅动画** - 平滑的过渡和交互动画

### 自定义样式

主题样式文件：`docs/.vitepress/theme/custom.css`

```css
:root {
  --vp-c-brand: #10b981;        /* 主绿色 */
  --vp-c-brand-light: #34d399;  /* 浅绿色 */
  --vp-c-brand-dark: #059669;   /* 深绿色 */
}
```

## 🔧 技术栈

- **VitePress** - 基于 Vite 的静态站点生成器
- **Vue 3** - 现代化的前端框架
- **Express** - 文件上传服务器
- **Vercel** - 全球 CDN 部署平台

## 📚 文档指南

- 📖 [文档更新指南](./DOCS_UPDATE_GUIDE.md) - 如何添加和更新文档
- 🚀 [部署指南](./DEPLOYMENT_GUIDE.md) - 如何部署到公网
- 🎨 主题样式 - `docs/.vitepress/theme/custom.css`
- ⚙️ 网站配置 - `docs/.vitepress/config.mjs`

## 🎯 快速命令

```bash
# 开发
npm run docs:dev          # 启动开发服务器
npm run server:dev        # 启动上传服务器

# 构建
npm run docs:build        # 构建生产版本
npm run docs:preview      # 预览构建结果

# Git 部署
git add .                 # 添加更改
git commit -m "更新文档"   # 提交
git push                  # 推送（触发 Vercel 自动部署）
```

## 🐛 故障排除

### Node 版本问题

```bash
# 使用 nvm 切换到 Node 20
source ~/.nvm/nvm.sh
nvm install 20
nvm use 20
```

### 端口被占用

```bash
# 查找并杀死占用端口的进程
lsof -i :5173
kill -9 <PID>
```

### 样式不生效

```bash
# 清除缓存
rm -rf docs/.vitepress/cache
rm -rf docs/.vitepress/dist
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**需要帮助？** 查看文档指南或提交 Issue。

**祝你使用愉快！⚽🤖**
