---
layout: home

hero:
  name: "⚽ Mini Pi+"
  text: "Soccer Robot Development Platform"
  tagline: 🏆 Complete development documentation designed for humanoid robot soccer competitions
  actions:
    - theme: brand
      text: 🚀 Quick Start
      link: /en/tutorials/
    - theme: alt
      text: ⚽ Soccer Apps
      link: /en/soccer/
---

<div class="home-content-wrapper">

<h2>🎬 Live Demo</h2>

<div class="video-container">
  <video controls autoplay muted loop playsinline>
    <source src="/demo.mp4" type="video/mp4">
    Your browser does not support video playback
  </video>
</div>

<div class="features-grid">
  <a href="/en/soccer/motion" class="feature-card">
    <div class="feature-icon">⚽</div>
    <h3>High-Performance Motion Control</h3>
    <p>Advanced kinematic algorithms enable smooth kicking, positioning, and goalkeeping actions, allowing robots to move freely on the field</p>
  </a>

  <a href="/en/soccer/vision" class="feature-card">
    <div class="feature-icon">👁️</div>
    <h3>Intelligent Vision Recognition</h3>
    <p>Real-time recognition of ball, goal, and teammate positions with multi-target tracking for precise localization of every key object</p>
  </a>

  <a href="/en/soccer/behavior" class="feature-card">
    <div class="feature-icon">🤝</div>
    <h3>Multi-Robot Coordination</h3>
    <p>Support for multi-robot coordination to implement complex tactical systems and build perfect teams</p>
  </a>

  <a href="/en/guide/" class="feature-card">
    <div class="feature-icon">📚</div>
    <h3>Complete Documentation</h3>
    <p>From beginner to expert, comprehensive API documentation and practical tutorials help you get started quickly</p>
  </a>

  <a href="/en/guide/sdk" class="feature-card">
    <div class="feature-icon">🎯</div>
    <h3>Modular Architecture</h3>
    <p>Flexible architecture design for easy extension and customization to meet various competition requirements</p>
  </a>

  <a href="/en/guide/debug" class="feature-card">
    <div class="feature-icon">🔧</div>
    <h3>Real-time Debugging Tools</h3>
    <p>Powerful debugging tools and simulation environment for quick problem identification and resolution</p>
  </a>
</div>

</div>

<div class="home-content-wrapper">

<h2>🏟️ Platform & Products</h2>

<div class="products-grid">
  <div class="product-card">
    <div class="card-icon"><img src="/robot-icon.png" alt="Mini Pi+" style="width: 44px; height: 44px; border-radius: 8px;"></div>
    <h3>Mini Pi+ Robot</h3>
    <p>High-performance humanoid robot platform optimized for soccer competitions with flexible and agile movement capabilities</p>
    <a href="/en/tutorials/" class="card-link">Learn More →</a>
  </div>

  <div class="product-card">
    <div class="card-icon">⚽</div>
    <h3>Soccer Application Framework</h3>
    <p>Complete soccer application development framework including motion control, vision recognition, and strategy planning modules</p>
    <a href="/en/soccer/" class="card-link">View Docs →</a>
  </div>

  <div class="product-card">
    <div class="card-icon">🎓</div>
    <h3>Tutorials & Examples</h3>
    <p>Complete tutorials from basic to advanced, quick start with robot soccer development, rich practical examples</p>
    <a href="/en/tutorials/" class="card-link">Start Learning →</a>
  </div>
</div>

<h2>🎯 Why Choose Mini Pi+?</h2>

<div class="why-section">
  <div class="why-card">
    <div class="why-icon">🏆</div>
    <h4>Competition-Grade Performance</h4>
    <p>Proven through multiple international robot soccer competitions, stable and reliable competition-grade platform</p>
  </div>
  <div class="why-card">
    <div class="why-icon">🚀</div>
    <h4>Rapid Development</h4>
    <p>Complete SDK and toolchain, from zero to field-ready in just one week</p>
  </div>
  <div class="why-card">
    <div class="why-icon">🌟</div>
    <h4>Open Source Ecosystem</h4>
    <p>Active developer community with rich open source code and case sharing</p>
  </div>
  <div class="why-card">
    <div class="why-icon">💡</div>
    <h4>Continuous Updates</h4>
    <p>Regular algorithm and feature updates to maintain technological leadership</p>
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