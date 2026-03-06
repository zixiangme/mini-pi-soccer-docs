const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

// 启用 CORS
app.use(cors());
app.use(express.json());

// 确保上传目录存在
const uploadDirs = {
  guide: path.join(__dirname, '../docs/guide'),
  soccer: path.join(__dirname, '../docs/soccer'),
  tutorials: path.join(__dirname, '../docs/tutorials'),
  pdf: path.join(__dirname, '../docs/public/pdfs')
};

Object.values(uploadDirs).forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// 配置文件存储
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const category = req.body.category || 'guide';
    const isPdf = file.originalname.endsWith('.pdf');
    const dest = isPdf ? uploadDirs.pdf : uploadDirs[category];
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    // 保持原文件名，但确保安全
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.-_]/g, '-');
    cb(null, safeName);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB 限制
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.md', '.pdf'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('只支持 .md 和 .pdf 文件'));
    }
  }
});

// 上传接口
app.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: '没有文件上传' });
    }

    const relativePath = path.relative(
      path.join(__dirname, '../docs'),
      req.file.path
    );

    res.json({
      success: true,
      message: '文件上传成功',
      path: relativePath,
      filename: req.file.filename,
      size: req.file.size
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 获取文档列表
app.get('/files/:category', (req, res) => {
  const category = req.params.category;
  const dir = uploadDirs[category];

  if (!dir || !fs.existsSync(dir)) {
    return res.status(404).json({ error: '分类不存在' });
  }

  fs.readdir(dir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const fileList = files
      .filter(f => f.endsWith('.md') || f.endsWith('.pdf'))
      .map(f => ({
        name: f,
        path: path.join(category, f)
      }));

    res.json({ files: fileList });
  });
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`📤 上传服务器运行在 http://localhost:${PORT}`);
  console.log(`📁 上传目录:`);
  Object.entries(uploadDirs).forEach(([key, dir]) => {
    console.log(`   ${key}: ${dir}`);
  });
});
