---
layout: home

hero:
  name: "⚽ Mini Pi+"
  text: "足球机器人开发平台"
  tagline: 🏆 专为人形机器人足球竞赛设计的完整开发文档
  image:
    src: /hero-robot.png
    alt: Mini Pi+ Soccer Robot
  actions:
    - theme: brand
      text: 🚀 快速开始
      link: /guide/
    - theme: alt
      text: ⚽ 足球应用
      link: /soccer/

features:
  - icon: ⚽
    title: 高性能运动控制
    details: 基于先进的运动学算法，实现流畅的踢球、走位和守门动作，让机器人在绿茵场上自如奔跑
  - icon: 👁️
    title: 智能视觉识别
    details: 实时识别足球、球门和队友位置，支持多目标跟踪，精准定位每一个关键目标
  - icon: 🤝
    title: 多机协同作战
    details: 支持多台机器人协同配合，实现复杂的战术体系，打造完美团队
  - icon: 📚
    title: 完整开发文档
    details: 从入门到精通，提供详细的 API 文档和实战教程，助你快速上手
  - icon: 🎯
    title: 模块化架构
    details: 灵活的架构设计，方便扩展和定制功能，满足各种比赛需求
  - icon: 🔧
    title: 实时调试工具
    details: 强大的调试工具和仿真环境，快速定位和解决问题
---

<style>
/* 移除旧样式，使用全局主题 */
</style>

## 🎬 精彩演示

<div class="video-container">
  <video controls autoplay muted loop playsinline>
    <source src="/demo.mp4" type="video/mp4">
    您的浏览器不支持视频播放
  </video>
  <p class="video-caption">Mini Pi+ 足球机器人实战演示</p>
</div>

## 🏟️ 平台与产品

<div class="products-grid">
  <div class="product-card soccer-field">
    <div class="card-icon"><img src="/robot-icon.png" alt="Mini Pi+" style="width: 40px; height: 40px; border-radius: 8px;"></div>
    <h3>Mini Pi+ 机器人</h3>
    <p>高性能人形机器人平台，专为足球竞赛优化，灵活敏捷的运动能力</p>
    <a href="/guide/" class="card-link">了解更多 →</a>
  </div>

  <div class="product-card soccer-field">
    <div class="card-icon">⚽</div>
    <h3>足球应用框架</h3>
    <p>完整的足球应用开发框架，包含运动控制、视觉识别和策略规划模块</p>
    <a href="/soccer/" class="card-link">查看文档 →</a>
  </div>

  <div class="product-card soccer-field">
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

<style scoped>
.video-container {
  max-width: 900px;
  margin: 48px auto;
  padding: 0 24px;
  text-align: center;
}

.video-container video {
  width: 100%;
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(16, 185, 129, 0.3);
  border: 3px solid rgba(16, 185, 129, 0.3);
  transition: all 0.3s;
}

.video-container video:hover {
  box-shadow: 0 16px 50px rgba(16, 185, 129, 0.4);
  border-color: #10b981;
  transform: scale(1.02);
}

.video-caption {
  margin-top: 16px;
  font-size: 16px;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin: 48px 0;
  padding: 0 24px;
}

.product-card {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.02) 100%);
  border: 2px solid rgba(16, 185, 129, 0.2);
  border-radius: 16px;
  padding: 32px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.product-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 30px,
    rgba(16, 185, 129, 0.03) 30px,
    rgba(16, 185, 129, 0.03) 32px
  );
  opacity: 0;
  transition: opacity 0.4s;
}

.product-card:hover::before {
  opacity: 1;
}

.product-card:hover {
  border-color: #10b981;
  box-shadow: 0 12px 32px rgba(16, 185, 129, 0.25);
  transform: translateY(-8px) scale(1.02);
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 16px;
  filter: drop-shadow(0 4px 12px rgba(16, 185, 129, 0.4));
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.product-card h3 {
  margin: 0 0 16px 0;
  font-size: 22px;
  font-weight: 700;
  color: var(--vp-c-brand-dark);
  position: relative;
  z-index: 1;
}

.product-card p {
  color: var(--vp-c-text-2);
  margin: 0 0 20px 0;
  line-height: 1.7;
  position: relative;
  z-index: 1;
}

.card-link {
  color: var(--vp-c-brand);
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  position: relative;
  z-index: 1;
  transition: gap 0.3s;
}

.card-link:hover {
  gap: 8px;
}

.why-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 48px 0;
  padding: 0 24px;
}

.why-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid rgba(16, 185, 129, 0.15);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  transition: all 0.3s;
}

.why-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.15);
}

.why-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
}

.why-card h4 {
  margin: 0 0 8px 0;
  color: var(--vp-c-brand-dark);
  font-size: 18px;
  font-weight: 600;
}

.why-card p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .products-grid,
  .why-section {
    grid-template-columns: 1fr;
  }
}
</style>
