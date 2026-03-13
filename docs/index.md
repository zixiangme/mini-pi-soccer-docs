---
layout: home

hero:
  name: "⚽ Mini Pi+"
  text: "足球机器人开发平台"
  tagline: 🏆 专为人形机器人足球竞赛设计的完整开发文档
  actions:
    - theme: brand
      text: 🚀 快速开始
      link: /tutorials/
    - theme: alt
      text: ⚽ 足球应用
      link: /soccer/
---

<div class="language-toggle">
  <button id="langToggle" onclick="toggleLanguage()">
    <span class="lang-icon">🌐</span>
    <span id="langText">English</span>
  </button>
</div>

<div class="home-content-wrapper">

<h2 id="demo-title">🎬 实战演示</h2>

<div class="video-container">
  <video controls autoplay muted loop playsinline>
    <source src="/demo.mp4" type="video/mp4">
    <span id="video-fallback">您的浏览器不支持视频播放</span>
  </video>
</div>

<div class="features-grid">
  <div class="feature-card">
    <div class="feature-icon">⚽</div>
    <h3 id="feature1-title">高性能运动控制</h3>
    <p id="feature1-desc">基于先进的运动学算法，实现流畅的踢球、走位和守门动作，让机器人在绿茵场上自如奔跑</p>
  </div>

  <div class="feature-card">
    <div class="feature-icon">👁️</div>
    <h3 id="feature2-title">智能视觉识别</h3>
    <p id="feature2-desc">实时识别足球、球门和队友位置，支持多目标跟踪，精准定位每一个关键目标</p>
  </div>

  <div class="feature-card">
    <div class="feature-icon">🤝</div>
    <h3 id="feature3-title">多机协同作战</h3>
    <p id="feature3-desc">支持多台机器人协同配合，实现复杂的战术体系，打造完美团队</p>
  </div>

  <div class="feature-card">
    <div class="feature-icon">📚</div>
    <h3 id="feature4-title">完整开发文档</h3>
    <p id="feature4-desc">从入门到精通，提供详细的 API 文档和实战教程，助你快速上手</p>
  </div>

  <div class="feature-card">
    <div class="feature-icon">🎯</div>
    <h3 id="feature5-title">模块化架构</h3>
    <p id="feature5-desc">灵活的架构设计，方便扩展和定制功能，满足各种比赛需求</p>
  </div>

  <div class="feature-card">
    <div class="feature-icon">🔧</div>
    <h3 id="feature6-title">实时调试工具</h3>
    <p id="feature6-desc">强大的调试工具和仿真环境，快速定位和解决问题</p>
  </div>
</div>

<div class="home-content-wrapper">

<h2 id="products-title">🏟️ 平台与产品</h2>

<div class="products-grid">
  <div class="product-card">
    <div class="card-icon"><img src="/robot-icon.png" alt="Mini Pi+" style="width: 44px; height: 44px; border-radius: 8px;"></div>
    <h3 id="product1-title">Mini Pi+ 机器人</h3>
    <p id="product1-desc">高性能人形机器人平台，专为足球竞赛优化，灵活敏捷的运动能力</p>
    <a href="/tutorials/" class="card-link" id="product1-link">了解更多 →</a>
  </div>

  <div class="product-card">
    <div class="card-icon">⚽</div>
    <h3 id="product2-title">足球应用框架</h3>
    <p id="product2-desc">完整的足球应用开发框架，包含运动控制、视觉识别和策略规划模块</p>
    <a href="/soccer/" class="card-link" id="product2-link">查看文档 →</a>
  </div>

  <div class="product-card">
    <div class="card-icon">🎓</div>
    <h3 id="product3-title">教程与示例</h3>
    <p id="product3-desc">从基础到进阶的完整教程，快速上手机器人足球开发，实战案例丰富</p>
    <a href="/tutorials/" class="card-link" id="product3-link">开始学习 →</a>
  </div>
</div>

<h2 id="why-title">🎯 为什么选择 Mini Pi+？</h2>

<div class="why-section">
  <div class="why-card">
    <div class="why-icon">🏆</div>
    <h4 id="why1-title">竞赛级性能</h4>
    <p id="why1-desc">经过多次国际机器人足球赛事验证，稳定可靠的竞赛级平台</p>
  </div>
  <div class="why-card">
    <div class="why-icon">🚀</div>
    <h4 id="why2-title">快速开发</h4>
    <p id="why2-desc">完善的 SDK 和工具链，从零到上场只需一周时间</p>
  </div>
  <div class="why-card">
    <div class="why-icon">🌟</div>
    <h4 id="why3-title">开源生态</h4>
    <p id="why3-desc">活跃的开发者社区，丰富的开源代码和案例分享</p>
  </div>
  <div class="why-card">
    <div class="why-icon">💡</div>
    <h4 id="why4-title">持续更新</h4>
    <p id="why4-desc">定期更新算法和功能，始终保持技术领先</p>
  </div>
</div>

</div>

<style>
/* 内容区深绿打底，彻底解决文字与背景融合 */
.home-content-wrapper {
  background: linear-gradient(180deg, rgba(10, 54, 34, 0.96) 0%, rgba(10, 54, 34, 0.99) 100%);
  padding: 48px 24px 64px;
  margin-top: -1px;
}

.home-content-wrapper h2 {
  color: #FFFFFF;
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0 0 8px 24px;
  padding-top: 0;
  border-top: none;
}

.home-content-wrapper h2::after {
  content: '';
  display: block;
  width: 44px;
  height: 3px;
  background: #22C55E;
  border-radius: 2px;
  margin-top: 8px;
}

/* 语言切换按钮 */
.language-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

#langToggle {
  background: rgba(15, 81, 50, 0.95);
  border: 2px solid rgba(34, 197, 94, 0.6);
  border-radius: 25px;
  padding: 8px 16px;
  color: #FFFFFF;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  backdrop-filter: blur(10px);
}

#langToggle:hover {
  background: rgba(15, 81, 50, 1);
  border-color: #22C55E;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(34, 197, 94, 0.3);
}

.lang-icon {
  font-size: 1.1rem;
}
</style>

<script>
// 语言切换功能
let isEnglish = false;

const translations = {
  // Hero区域 (VitePress配置，需要通过其他方式处理)

  // 页面内容
  'demo-title': {
    zh: '🎬 实战演示',
    en: '🎬 Live Demo'
  },
  'video-fallback': {
    zh: '您的浏览器不支持视频播放',
    en: 'Your browser does not support video playback'
  },

  // 特性卡片
  'feature1-title': {
    zh: '高性能运动控制',
    en: 'High-Performance Motion Control'
  },
  'feature1-desc': {
    zh: '基于先进的运动学算法，实现流畅的踢球、走位和守门动作，让机器人在绿茵场上自如奔跑',
    en: 'Advanced kinematic algorithms enable smooth kicking, positioning, and goalkeeping actions, allowing robots to move freely on the field'
  },
  'feature2-title': {
    zh: '智能视觉识别',
    en: 'Intelligent Vision Recognition'
  },
  'feature2-desc': {
    zh: '实时识别足球、球门和队友位置，支持多目标跟踪，精准定位每一个关键目标',
    en: 'Real-time recognition of ball, goal, and teammate positions with multi-target tracking for precise localization of every key object'
  },
  'feature3-title': {
    zh: '多机协同作战',
    en: 'Multi-Robot Coordination'
  },
  'feature3-desc': {
    zh: '支持多台机器人协同配合，实现复杂的战术体系，打造完美团队',
    en: 'Support for multi-robot coordination to implement complex tactical systems and build perfect teams'
  },
  'feature4-title': {
    zh: '完整开发文档',
    en: 'Complete Documentation'
  },
  'feature4-desc': {
    zh: '从入门到精通，提供详细的 API 文档和实战教程，助你快速上手',
    en: 'From beginner to expert, comprehensive API documentation and practical tutorials help you get started quickly'
  },
  'feature5-title': {
    zh: '模块化架构',
    en: 'Modular Architecture'
  },
  'feature5-desc': {
    zh: '灵活的架构设计，方便扩展和定制功能，满足各种比赛需求',
    en: 'Flexible architecture design for easy extension and customization to meet various competition requirements'
  },
  'feature6-title': {
    zh: '实时调试工具',
    en: 'Real-time Debugging Tools'
  },
  'feature6-desc': {
    zh: '强大的调试工具和仿真环境，快速定位和解决问题',
    en: 'Powerful debugging tools and simulation environment for quick problem identification and resolution'
  },

  // 产品区域
  'products-title': {
    zh: '🏟️ 平台与产品',
    en: '🏟️ Platform & Products'
  },
  'product1-title': {
    zh: 'Mini Pi+ 机器人',
    en: 'Mini Pi+ Robot'
  },
  'product1-desc': {
    zh: '高性能人形机器人平台，专为足球竞赛优化，灵活敏捷的运动能力',
    en: 'High-performance humanoid robot platform optimized for soccer competitions with flexible and agile movement capabilities'
  },
  'product1-link': {
    zh: '了解更多 →',
    en: 'Learn More →'
  },
  'product2-title': {
    zh: '足球应用框架',
    en: 'Soccer Application Framework'
  },
  'product2-desc': {
    zh: '完整的足球应用开发框架，包含运动控制、视觉识别和策略规划模块',
    en: 'Complete soccer application development framework including motion control, vision recognition, and strategy planning modules'
  },
  'product2-link': {
    zh: '查看文档 →',
    en: 'View Docs →'
  },
  'product3-title': {
    zh: '教程与示例',
    en: 'Tutorials & Examples'
  },
  'product3-desc': {
    zh: '从基础到进阶的完整教程，快速上手机器人足球开发，实战案例丰富',
    en: 'Complete tutorials from basic to advanced, quick start with robot soccer development, rich practical examples'
  },
  'product3-link': {
    zh: '开始学习 →',
    en: 'Start Learning →'
  },

  // 优势区域
  'why-title': {
    zh: '🎯 为什么选择 Mini Pi+？',
    en: '🎯 Why Choose Mini Pi+?'
  },
  'why1-title': {
    zh: '竞赛级性能',
    en: 'Competition-Grade Performance'
  },
  'why1-desc': {
    zh: '经过多次国际机器人足球赛事验证，稳定可靠的竞赛级平台',
    en: 'Proven through multiple international robot soccer competitions, stable and reliable competition-grade platform'
  },
  'why2-title': {
    zh: '快速开发',
    en: 'Rapid Development'
  },
  'why2-desc': {
    zh: '完善的 SDK 和工具链，从零到上场只需一周时间',
    en: 'Complete SDK and toolchain, from zero to field-ready in just one week'
  },
  'why3-title': {
    zh: '开源生态',
    en: 'Open Source Ecosystem'
  },
  'why3-desc': {
    zh: '活跃的开发者社区，丰富的开源代码和案例分享',
    en: 'Active developer community with rich open source code and case sharing'
  },
  'why4-title': {
    zh: '持续更新',
    en: 'Continuous Updates'
  },
  'why4-desc': {
    zh: '定期更新算法和功能，始终保持技术领先',
    en: 'Regular algorithm and feature updates to maintain technological leadership'
  },

  // 按钮文字
  'langText': {
    zh: 'English',
    en: '中文'
  }
};

function toggleLanguage() {
  isEnglish = !isEnglish;
  const lang = isEnglish ? 'en' : 'zh';

  // 更新所有翻译元素
  Object.keys(translations).forEach(id => {
    const element = document.getElementById(id);
    if (element && translations[id][lang]) {
      element.textContent = translations[id][lang];
    }
  });

  // 更新Hero区域 (需要直接操作DOM)
  updateHeroSection(lang);
}

function updateHeroSection(lang) {
  const heroName = document.querySelector('.VPHero .name');
  const heroText = document.querySelector('.VPHero .text');
  const heroTagline = document.querySelector('.VPHero .tagline');
  const heroButtons = document.querySelectorAll('.VPHero .VPButton');

  if (lang === 'en') {
    if (heroName) heroName.textContent = '⚽ Mini Pi+';
    if (heroText) heroText.textContent = 'Soccer Robot Development Platform';
    if (heroTagline) heroTagline.textContent = '🏆 Complete development documentation designed for humanoid robot soccer competitions';
    if (heroButtons[0]) heroButtons[0].textContent = '🚀 Quick Start';
    if (heroButtons[1]) heroButtons[1].textContent = '⚽ Soccer Apps';
  } else {
    if (heroName) heroName.textContent = '⚽ Mini Pi+';
    if (heroText) heroText.textContent = '足球机器人开发平台';
    if (heroTagline) heroTagline.textContent = '🏆 专为人形机器人足球竞赛设计的完整开发文档';
    if (heroButtons[0]) heroButtons[0].textContent = '🚀 快速开始';
    if (heroButtons[1]) heroButtons[1].textContent = '⚽ 足球应用';
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  // 延迟执行以确保VitePress完全加载
  setTimeout(() => {
    updateHeroSection('zh');
  }, 100);
});
</script>
