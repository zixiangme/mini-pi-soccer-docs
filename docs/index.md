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

<div class="home-content-wrapper">

## 🎬 实战演示

<div class="video-container">
  <video controls autoplay muted loop playsinline>
    <source src="/demo.mp4" type="video/mp4">
    您的浏览器不支持视频播放
  </video>
  <p class="video-caption">⚽ Mini Pi+ 足球机器人实战演示</p>
</div>

</div>

<div class="features-grid">
  <div class="feature-card">
    <div class="feature-icon">⚽</div>
    <h3>高性能运动控制</h3>
    <p>基于先进的运动学算法，实现流畅的踢球、走位和守门动作，让机器人在绿茵场上自如奔跑</p>
  </div>

  <div class="feature-card">
    <div class="feature-icon">👁️</div>
    <h3>智能视觉识别</h3>
    <p>实时识别足球、球门和队友位置，支持多目标跟踪，精准定位每一个关键目标</p>
  </div>

  <div class="feature-card">
    <div class="feature-icon">🤝</div>
    <h3>多机协同作战</h3>
    <p>支持多台机器人协同配合，实现复杂的战术体系，打造完美团队</p>
  </div>

  <div class="feature-card">
    <div class="feature-icon">📚</div>
    <h3>完整开发文档</h3>
    <p>从入门到精通，提供详细的 API 文档和实战教程，助你快速上手</p>
  </div>

  <div class="feature-card">
    <div class="feature-icon">🎯</div>
    <h3>模块化架构</h3>
    <p>灵活的架构设计，方便扩展和定制功能，满足各种比赛需求</p>
  </div>

  <div class="feature-card">
    <div class="feature-icon">🔧</div>
    <h3>实时调试工具</h3>
    <p>强大的调试工具和仿真环境，快速定位和解决问题</p>
  </div>
</div>

<div class="home-content-wrapper">

## 🏟️ 平台与产品

<div class="products-grid">
  <div class="product-card">
    <div class="card-icon"><img src="/robot-icon.png" alt="Mini Pi+" style="width: 44px; height: 44px; border-radius: 8px;"></div>
    <h3>Mini Pi+ 机器人</h3>
    <p>高性能人形机器人平台，专为足球竞赛优化，灵活敏捷的运动能力</p>
    <a href="/tutorials/" class="card-link">了解更多 →</a>
  </div>

  <div class="product-card">
    <div class="card-icon">⚽</div>
    <h3>足球应用框架</h3>
    <p>完整的足球应用开发框架，包含运动控制、视觉识别和策略规划模块</p>
    <a href="/soccer/" class="card-link">查看文档 →</a>
  </div>

  <div class="product-card">
    <div class="card-icon">🎓</div>
    <h3>教程与示例</h3>
    <p>从基础到进阶的完整教程，快速上手机器人足球开发，实战案例丰富</p>
    <a href="/tutorials/" class="card-link">开始学习 →</a>
  </div>
</div>

## 🎯 为什么选择 Mini Pi+？

<div class="why-section">
  <div class="why-card">
    <div class="why-icon">🏆</div>
    <h4>竞赛级性能</h4>
    <p>经过多次国际机器人足球赛事验证，稳定可靠的竞赛级平台</p>
  </div>
  <div class="why-card">
    <div class="why-icon">🚀</div>
    <h4>快速开发</h4>
    <p>完善的 SDK 和工具链，从零到上场只需一周时间</p>
  </div>
  <div class="why-card">
    <div class="why-icon">🌟</div>
    <h4>开源生态</h4>
    <p>活跃的开发者社区，丰富的开源代码和案例分享</p>
  </div>
  <div class="why-card">
    <div class="why-icon">💡</div>
    <h4>持续更新</h4>
    <p>定期更新算法和功能，始终保持技术领先</p>
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
</style>
