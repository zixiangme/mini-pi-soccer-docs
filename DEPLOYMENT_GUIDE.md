# 🚀 部署到 Vercel - 让全世界访问你的文档

## 📋 部署前准备

### 1. 注册 GitHub 账号（如果还没有）

访问 https://github.com 注册账号

### 2. 注册 Vercel 账号

访问 https://vercel.com 使用 GitHub 账号登录

## 🎯 部署步骤

### 步骤 1：初始化 Git 仓库

```bash
cd /home/sunteng/mini-pi-docs

# 初始化 Git
git init

# 添加所有文件
git add .

# 提交
git commit -m "🎉 Initial commit: Mini Pi+ Soccer Docs"
```

### 步骤 2：推送到 GitHub

1. **在 GitHub 创建新仓库**
   - 访问 https://github.com/new
   - 仓库名：`mini-pi-soccer-docs`
   - 设置为 Public（公开）
   - 不要勾选任何初始化选项
   - 点击 "Create repository"

2. **推送代码**

```bash
# 添加远程仓库（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/mini-pi-soccer-docs.git

# 推送代码
git branch -M main
git push -u origin main
```

### 步骤 3：在 Vercel 部署

1. **导入项目**
   - 访问 https://vercel.com/new
   - 点击 "Import Git Repository"
   - 选择你刚创建的 `mini-pi-soccer-docs` 仓库
   - 点击 "Import"

2. **配置项目**
   - Framework Preset: VitePress（自动检测）
   - Root Directory: `./`
   - Build Command: `npm run docs:build`
   - Output Directory: `docs/.vitepress/dist`
   - Install Command: `npm install`

3. **部署**
   - 点击 "Deploy"
   - 等待 2-3 分钟

4. **获取网址**
   - 部署完成后，你会得到一个网址：
   ```
   https://mini-pi-soccer-docs.vercel.app
   ```

## 🎉 完成！

现在任何人都可以通过这个网址访问你的文档了！

## 🔄 更新文档

每次修改文档后：

```bash
# 1. 添加更改
git add .

# 2. 提交
git commit -m "📝 更新文档内容"

# 3. 推送
git push
```

Vercel 会自动检测到更新并重新部署（约 2-3 分钟）。

## 🌐 自定义域名（可选）

如果你有自己的域名（如 `docs.minipi.com`）：

1. **在 Vercel 添加域名**
   - 进入项目 Settings → Domains
   - 输入你的域名
   - 点击 "Add"

2. **配置 DNS**
   - 在你的域名提供商（如阿里云、腾讯云）添加 DNS 记录：
   ```
   类型: CNAME
   名称: docs (或 @)
   值: cname.vercel-dns.com
   ```

3. **等待生效**
   - DNS 生效需要几分钟到几小时
   - 生效后访问你的自定义域名即可

## 📊 查看访问统计

在 Vercel 项目页面可以看到：
- 访问量
- 部署历史
- 构建日志
- 性能指标

## 🔒 环境变量（如需要）

如果需要配置环境变量：

1. 进入 Vercel 项目 Settings → Environment Variables
2. 添加变量（如 API 密钥等）
3. 重新部署

## ⚡ 性能优化建议

1. **图片优化**
   - 使用 WebP 格式
   - 压缩图片大小
   - 使用适当的尺寸

2. **缓存策略**
   - Vercel 自动处理静态资源缓存
   - 无需额外配置

3. **CDN 加速**
   - Vercel 自带全球 CDN
   - 自动优化访问速度

## 🐛 常见问题

### 部署失败

**问题**：构建失败，显示 Node 版本错误

**解决**：在项目根目录创建 `.nvmrc` 文件：
```bash
echo "20" > .nvmrc
git add .nvmrc
git commit -m "指定 Node 版本"
git push
```

### 404 错误

**问题**：访问子页面显示 404

**解决**：确保 `vercel.json` 配置正确（已包含在项目中）

### 样式丢失

**问题**：部署后样式不正常

**解决**：
```bash
# 清除缓存重新构建
rm -rf docs/.vitepress/cache docs/.vitepress/dist
git add .
git commit -m "清除缓存"
git push
```

## 📱 分享你的网站

部署完成后，你可以：

1. **分享链接**
   ```
   https://your-project.vercel.app
   ```

2. **生成二维码**
   - 使用在线工具生成二维码
   - 方便手机访问

3. **嵌入其他网站**
   ```html
   <iframe src="https://your-project.vercel.app" width="100%" height="600px"></iframe>
   ```

## 🎯 下一步

- ✅ 添加更多文档内容
- ✅ 上传图片和示例代码
- ✅ 配置自定义域名
- ✅ 分享给团队成员
- ✅ 收集用户反馈

---

**需要帮助？** 查看 [Vercel 文档](https://vercel.com/docs) 或联系技术支持。

**祝部署顺利！🚀**
