# 文档上传

使用此页面上传新的文档内容到网站。支持 Markdown (.md) 和 PDF (.pdf) 文件。

<script setup>
import { ref } from 'vue'

const selectedFile = ref(null)
const uploadStatus = ref('')
const isUploading = ref(false)
const category = ref('guide')

const handleFileSelect = (event) => {
  selectedFile.value = event.target.files[0]
  uploadStatus.value = ''
}

const uploadFile = async () => {
  if (!selectedFile.value) {
    uploadStatus.value = '请先选择文件'
    return
  }

  isUploading.value = true
  uploadStatus.value = '上传中...'

  const formData = new FormData()
  formData.append('file', selectedFile.value)
  formData.append('category', category.value)

  try {
    const response = await fetch('http://localhost:3001/upload', {
      method: 'POST',
      body: formData
    })

    const result = await response.json()

    if (response.ok) {
      uploadStatus.value = `✅ 上传成功！文件已保存到: ${result.path}`
      selectedFile.value = null
    } else {
      uploadStatus.value = `❌ 上传失败: ${result.error}`
    }
  } catch (error) {
    uploadStatus.value = `❌ 上传失败: ${error.message}`
  } finally {
    isUploading.value = false
  }
}
</script>

<div class="upload-container">
  <div class="upload-form">
    <div class="form-group">
      <label for="category">文档分类：</label>
      <select id="category" v-model="category" class="category-select">
        <option value="guide">开发指南</option>
        <option value="soccer">足球应用</option>
        <option value="tutorials">教程</option>
      </select>
    </div>

    <div class="form-group">
      <label for="file">选择文件：</label>
      <input
        type="file"
        id="file"
        @change="handleFileSelect"
        accept=".md,.pdf"
        class="file-input"
      />
    </div>

    <button
      @click="uploadFile"
      :disabled="isUploading || !selectedFile"
      class="upload-button"
    >
      {{ isUploading ? '上传中...' : '上传文件' }}
    </button>

    <div v-if="uploadStatus" class="status-message">
      {{ uploadStatus }}
    </div>
  </div>

  <div class="upload-info">
    <h3>📝 上传说明</h3>
    <ul>
      <li>支持 Markdown (.md) 和 PDF (.pdf) 格式</li>
      <li>Markdown 文件会直接添加到文档中</li>
      <li>PDF 文件会保存到 public 目录供下载</li>
      <li>文件名建议使用英文和连字符</li>
      <li>上传后需要重新构建网站才能看到更新</li>
    </ul>
  </div>
</div>

<style scoped>
.upload-container {
  max-width: 800px;
  margin: 40px auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.upload-form {
  background: var(--vp-c-bg-soft);
  padding: 30px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.category-select,
.file-input {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
}

.upload-button {
  width: 100%;
  padding: 12px 24px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.upload-button:hover:not(:disabled) {
  background: var(--vp-c-brand-dark);
  transform: translateY(-2px);
}

.upload-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.status-message {
  margin-top: 20px;
  padding: 12px;
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}

.upload-info {
  background: var(--vp-c-bg-soft);
  padding: 30px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
}

.upload-info h3 {
  margin-top: 0;
  color: var(--vp-c-text-1);
}

.upload-info ul {
  line-height: 1.8;
  color: var(--vp-c-text-2);
}

@media (max-width: 768px) {
  .upload-container {
    grid-template-columns: 1fr;
  }
}
</style>
