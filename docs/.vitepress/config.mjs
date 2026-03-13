import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/mini-pi-soccer-docs/',
  title: 'Mini Pi+ Soccer',
  description: 'Mini Pi+ 足球应用开发指南',
  lang: 'zh-CN',
  ignoreDeadLinks: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#10b981' }]
  ],

  themeConfig: {
    logo: '/company-logo.png',

    nav: [
      { text: '⚽ 首页', link: '/' },
      { text: '🎮 开发指南', link: '/guide/' },
      { text: '🤖 足球应用', link: '/soccer/' },
      { text: '📚 教程', link: '/tutorials/' },
      { text: '📤 上传文档', link: '/upload' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '⚡ 快速开始',
          items: [
            { text: '简介', link: '/guide/' },
            { text: '环境配置', link: '/guide/setup' },
            { text: '硬件连接', link: '/guide/hardware' }
          ]
        },
        {
          text: '💻 软件开发',
          items: [
            { text: 'SDK 安装', link: '/guide/sdk' },
            { text: 'API 参考', link: '/guide/api' },
            { text: '调试工具', link: '/guide/debug' }
          ]
        }
      ],

      '/soccer/': [
        {
          text: '⚽ 足球应用系统',
          items: [
            { text: '系统概述', link: '/soccer/' },
            { text: '🎥 视觉系统', link: '/soccer/vision' },
            { text: '🧠 行为决策', link: '/soccer/behavior' },
            { text: '🎯 运动控制', link: '/soccer/motion' },
            { text: '🌐 网络通信', link: '/soccer/network' },
            { text: '⚙️ 配置管理', link: '/soccer/config' }
          ]
        }
      ],

      '/tutorials/': [
        {
          text: '📖 教程',
          items: [
            { text: '入门教程', link: '/tutorials/' },
            { text: '基础动作', link: '/tutorials/basic-motion' },
            { text: '踢球动作', link: '/tutorials/kick' },
            { text: '守门动作', link: '/tutorials/goalkeeper' }
          ]
        }
      ]
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换'
            }
          }
        }
      }
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-repo/mini-pi-soccer' }
    ],

    footer: {
      message: '⚽ 专为机器人足球竞赛打造',
      copyright: 'Copyright © 2026 Mini Pi+ Team'
    }
  }
})
