# 📤 文档上传与管理

简单易用的文档管理界面，帮助您快速添加和编辑网站内容。

<script setup>
import { ref } from 'vue'

const activeTab = ref('upload')
const fileName = ref('')
const fileContent = ref('')
const category = ref('guide')
const uploadStatus = ref('')

const categories = {
  guide: '开发指南',
  soccer: '足球应用',
  tutorials: '教程'
}

const templates = {
  guide: `# 新的开发指南

## 简介

在这里写入您的内容...

## 步骤

1. 第一步
2. 第二步
3. 第三步

## 示例代码

\`\`\`python
# 示例代码
print("Hello World")
\`\`\`

## 总结

总结内容...
`,
  soccer: `# 足球应用功能

## 功能概述

描述这个功能...

## 使用方法

### 基础用法

\`\`\`python
# 代码示例
\`\`\`

### 高级用法

更多内容...

## 注意事项

- 注意点 1
- 注意点 2
`,
  tutorials: `# 教程标题

## 学习目标

完成本教程后，您将学会：
- 目标 1
- 目标 2
- 目标 3

## 准备工作

需要准备的内容...

## 步骤详解

### 步骤 1

详细说明...

### 步骤 2

详细说明...

## 完整代码

\`\`\`python
# 完整代码示例
\`\`\`

## 总结

总结内容...
`
}

const loadTemplate = () => {
  fileContent.value = templates[category.value]
  uploadStatus.value = '✅ 已加载模板'
  setTimeout(() => uploadStatus.value = '', 2000)
}

const generateCode = () => {
  if (!fileName.value) {
    uploadStatus.value = '❌ 请先输入文件名'
    return
  }

  if (!fileContent.value) {
    uploadStatus.value = '❌ 请先输入内容'
    return
  }

  const safeName = fileName.value.replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase()
  const fullName = safeName.endsWith('.md') ? safeName : `${safeName}.md`

  const code = `# 📝 将以下内容保存为文件

## 文件路径
\`\`\`
/home/sunteng/mini-pi-docs/docs/${category.value}/${fullName}
\`\`\`

## 保存命令
\`\`\`bash
cat > /home/sunteng/mini-pi-docs/docs/${category.value}/${fullName} << 'EOF'
${fileContent.value}
EOF
\`\`\`

## 推送到网站
\`\`\`bash
cd /home/sunteng/mini-pi-docs
git add docs/${category.value}/${fullName}
git commit -m "添加文档: ${fullName}"
git push origin master
\`\`\`

## 更新导航（可选）
如果需要在侧边栏显示，编辑 \`docs/.vitepress/config.mjs\`，在对应的 sidebar 中添加：
\`\`\`javascript
{ text: '${fileName.value.replace(/-/g, ' ')}', link: '/${category.value}/${safeName}' }
\`\`\`
`

  uploadStatus.value = code
}

const copyToClipboard = () => {
  navigator.clipboard.writeText(uploadStatus.value)
    .then(() => {
      alert('✅ 已复制到剪贴板！')
    })
    .catch(() => {
      alert('❌ 复制失败，请手动复制')
    })
}
</script>

<div class="tabs">
  <button
    :class="{ active: activeTab === 'upload' }"
    @click="activeTab = 'upload'"
  >
    📝 创建文档
  </button>
  <button
    :class="{ active: activeTab === 'guide' }"
    @click="activeTab = 'guide'"
  >
    📖 使用说明
  </button>
</div>

<div v-show="activeTab === 'upload'" class="upload-container">
  <div class="form-section">
    <h2>📝 创建新文档</h2>

    <div class="form-group">
      <label>📁 文档分类：</label>
      <select v-model="category" class="input-field">
        <option value="guide">🎮 开发指南</option>
        <option value="soccer">⚽ 足球应用</option>
        <option value="tutorials">📚 教程</option>
      </select>
    </div>

    <div class="form-group">
      <label>📄 文件名：</label>
      <input
        v-model="fileName"
        type="text"
        placeholder="例如: my-tutorial 或 my-tutorial.md"
        class="input-field"
      />
      <small>建议使用英文和连字符，如：advanced-motion-control</small>
    </div>

    <div class="form-group">
      <label>✍️ 文档内容：</label>
      <div class="button-group">
        <button @click="loadTemplate" class="secondary-button">
          📋 加载模板
        </button>
      </div>
      <textarea
        v-model="fileContent"
        placeholder="在这里输入 Markdown 内容..."
        rows="15"
        class="textarea-field"
      ></textarea>
    </div>

    <button @click="generateCode" class="primary-button">
      🚀 生成保存命令
    </button>
  </div>

  <div v-if="uploadStatus" class="result-section">
    <div class="result-header">
      <h3>📋 保存命令</h3>
      <button @click="copyToClipboard" class="copy-button">
        📋 复制全部
      </button>
    </div>
    <pre class="code-block">{{ uploadStatus }}</pre>
  </div>
</div>

<div v-show="activeTab === 'guide'" class="guide-section">
  <h2>📖 使用说明</h2>

  <div class="guide-card">
    <h3>🎯 快速上手（3 步完成）</h3>
    <ol class="steps">
      <li>
        <strong>填写信息</strong>
        <p>选择分类、输入文件名、编写内容（可以点击"加载模板"快速开始）</p>
      </li>
      <li>
        <strong>生成命令</strong>
        <p>点击"生成保存命令"按钮，系统会自动生成所有需要的命令</p>
      </li>
      <li>
        <strong>执行命令</strong>
        <p>复制生成的命令，在终端中执行即可完成上传</p>
      </li>
    </ol>
  </div>

  <div class="guide-card">
    <h3>💡 使用技巧</h3>
    <ul>
      <li><strong>文件命名</strong>：使用小写字母和连字符，如 <code>basic-motion.md</code></li>
      <li><strong>使用模板</strong>：点击"加载模板"可以快速获得文档结构</li>
      <li><strong>Markdown 语法</strong>：支持标题、列表、代码块、图片等</li>
      <li><strong>添加图片</strong>：先将图片放到 <code>docs/public/</code>，然后用 <code>![描述](/image.png)</code> 引用</li>
      <li><strong>代码高亮</strong>：使用 <code>```python</code> 等标记代码语言</li>
    </ul>
  </div>

  <div class="guide-card">
    <h3>📝 Markdown 快速参考</h3>
    <div class="markdown-ref">
      <div class="ref-item">
        <code># 标题</code>
        <span>一级标题</span>
      </div>
      <div class="ref-item">
        <code>## 标题</code>
        <span>二级标题</span>
      </div>
      <div class="ref-item">
        <code>**粗体**</code>
        <span>粗体文字</span>
      </div>
      <div class="ref-item">
        <code>*斜体*</code>
        <span>斜体文字</span>
      </div>
      <div class="ref-item">
        <code>[链接](url)</code>
        <span>超链接</span>
      </div>
      <div class="ref-item">
        <code>![图片](/path)</code>
        <span>插入图片</span>
      </div>
      <div class="ref-item">
        <code>- 列表项</code>
        <span>无序列表</span>
      </div>
      <div class="ref-item">
        <code>1. 列表项</code>
        <span>有序列表</span>
      </div>
      <div class="ref-item">
        <code>`代码`</code>
        <span>行内代码</span>
      </div>
      <div class="ref-item">
        <code>```语言</code>
        <span>代码块</span>
      </div>
    </div>
  </div>

  <div class="guide-card">
    <h3>⚠️ 注意事项</h3>
    <ul>
      <li>文件名不要使用中文和特殊字符</li>
      <li>推送后等待 2-3 分钟网站会自动更新</li>
      <li>如果要在导航栏显示，需要手动编辑 <code>config.mjs</code></li>
      <li>大文件（如视频）建议先压缩再上传</li>
    </ul>
  </div>

  <div class="guide-card">
    <h3>🔗 相关文档</h3>
    <ul>
      <li><a href="/guide/">开发指南</a> - 查看现有文档</li>
      <li><a href="https://vitepress.dev/guide/markdown" target="_blank">VitePress Markdown 文档</a></li>
      <li><a href="https://www.markdownguide.org/basic-syntax/" target="_blank">Markdown 语法指南</a></li>
    </ul>
  </div>
</div>

<style scoped>
.tabs {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  border-bottom: 2px solid var(--vp-c-divider);
}

.tabs button {
  padding: 12px 24px;
  background: none;
  border: none;
  border-bottom: 3px solid transparent;
  color: var(--vp-c-text-2);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.tabs button:hover {
  color: var(--vp-c-brand);
}

.tabs button.active {
  color: var(--vp-c-brand);
  border-bottom-color: var(--vp-c-brand);
}

.upload-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 30px;
}

.form-section {
  background: var(--vp-c-bg-soft);
  padding: 30px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
}

.form-section h2 {
  margin-top: 0;
  color: var(--vp-c-brand);
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.form-group small {
  display: block;
  margin-top: 6px;
  color: var(--vp-c-text-3);
  font-size: 13px;
}

.input-field,
.textarea-field {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.3s;
}

.input-field:focus,
.textarea-field:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.textarea-field {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  resize: vertical;
  min-height: 300px;
}

.button-group {
  margin-bottom: 10px;
}

.primary-button,
.secondary-button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.primary-button {
  width: 100%;
  background: var(--vp-c-brand);
  color: white;
}

.primary-button:hover {
  background: var(--vp-c-brand-dark);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.secondary-button {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
}

.secondary-button:hover {
  border-color: var(--vp-c-brand);
  color: var(--vp-c-brand);
}

.result-section {
  background: var(--vp-c-bg-soft);
  padding: 30px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.result-header h3 {
  margin: 0;
  color: var(--vp-c-brand);
}

.copy-button {
  padding: 8px 16px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.copy-button:hover {
  background: var(--vp-c-brand-dark);
}

.code-block {
  background: var(--vp-c-bg);
  padding: 20px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  overflow-x: auto;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  white-space: pre-wrap;
  word-wrap: break-word;
}

.guide-section {
  max-width: 900px;
  margin: 30px auto;
}

.guide-section h2 {
  color: var(--vp-c-brand);
  margin-bottom: 30px;
}

.guide-card {
  background: var(--vp-c-bg-soft);
  padding: 30px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  margin-bottom: 24px;
}

.guide-card h3 {
  margin-top: 0;
  color: var(--vp-c-text-1);
}

.steps {
  counter-reset: step;
  list-style: none;
  padding: 0;
}

.steps li {
  counter-increment: step;
  margin-bottom: 24px;
  padding-left: 50px;
  position: relative;
}

.steps li::before {
  content: counter(step);
  position: absolute;
  left: 0;
  top: 0;
  width: 32px;
  height: 32px;
  background: var(--vp-c-brand);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.steps li strong {
  display: block;
  margin-bottom: 8px;
  color: var(--vp-c-text-1);
  font-size: 16px;
}

.steps li p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.guide-card ul {
  line-height: 1.8;
  color: var(--vp-c-text-2);
}

.guide-card ul li {
  margin-bottom: 8px;
}

.guide-card code {
  background: var(--vp-c-bg);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 13px;
  color: var(--vp-c-brand);
}

.markdown-ref {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 12px;
}

.ref-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.ref-item code {
  background: none;
  padding: 0;
  color: var(--vp-c-brand);
  font-weight: 500;
}

.ref-item span {
  color: var(--vp-c-text-3);
  font-size: 13px;
}

@media (max-width: 768px) {
  .upload-container {
    grid-template-columns: 1fr;
  }

  .markdown-ref {
    grid-template-columns: 1fr;
  }
}
</style>
