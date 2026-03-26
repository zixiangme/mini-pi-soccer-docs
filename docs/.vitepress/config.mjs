import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/mini-pi-soccer-docs/',
  appearance: 'dark',

  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
      title: 'Mini Pi+ Soccer',
      description: 'Mini Pi+ 足球应用开发指南',
      themeConfig: {
        nav: [
          { text: '⚽ 首页', link: '/' },
          { text: '📚 资源下载', link: '/guide/' },
          { text: '🤖 足球应用', link: '/soccer/' },
          { text: '🎮 部署教程', link: '/tutorials/' },
        ],
        sidebar: {
          '/guide/': [
            {
              text: '⚡ 快速开始',
              items: [
                { text: '简介', link: '/guide/' }
              ]
            },
            {
              text: '💻 软件开发',
              items: [
                { text: 'SDK 安装', link: '/guide/sdk' },
                { text: '足球策略文件', link: '/guide/strategy' },
                { text: '机器人URDF文件下载', link: '/guide/urdf' }
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
                { text: '入门教程', link: '/tutorials/' }
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
        footer: {
          message: '⚽ 专为机器人足球竞赛打造',
          copyright: 'Copyright © 2026 Mini Pi+ Team'
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'Mini Pi+ Soccer',
      description: 'Mini Pi+ Soccer Application Development Guide',
      themeConfig: {
        nav: [
          { text: '⚽ Home', link: '/en/' },
          { text: '🎮 Dev Guide', link: '/en/guide/' },
          { text: '🤖 Soccer Apps', link: '/en/soccer/' },
          { text: '📚 Tutorials', link: '/en/tutorials/' },
        ],
        sidebar: {
          '/en/guide/': [
            {
              text: '⚡ Quick Start',
              items: [
                { text: 'Introduction', link: '/en/guide/' }
              ]
            },
            {
              text: '💻 Software Development',
              items: [
                { text: 'SDK Installation', link: '/en/guide/sdk' },
                { text: 'Football Strategy Files', link: '/en/guide/strategy' }
              ]
            }
          ],
          '/en/soccer/': [
            {
              text: '⚽ Soccer Application System',
              items: [
                { text: 'System Overview', link: '/en/soccer/' },
                { text: '🎥 Vision System', link: '/en/soccer/vision' },
                { text: '🧠 Behavior Decision', link: '/en/soccer/behavior' },
                { text: '🎯 Motion Control', link: '/en/soccer/motion' },
                { text: '🌐 Network Communication', link: '/en/soccer/network' },
                { text: '⚙️ Configuration Management', link: '/en/soccer/config' }
              ]
            }
          ],
          '/en/tutorials/': [
            {
              text: '📖 Tutorials',
              items: [
                { text: 'Getting Started', link: '/en/tutorials/' }
              ]
            }
          ]
        },
        search: {
          provider: 'local',
          options: {
            translations: {
              button: {
                buttonText: 'Search docs',
                buttonAriaLabel: 'Search docs'
              },
              modal: {
                noResultsText: 'No results found',
                resetButtonTitle: 'Clear search query',
                footer: {
                  selectText: 'Select',
                  navigateText: 'Navigate'
                }
              }
            }
          }
        },
        footer: {
          message: '⚽ Built for Robot Soccer Competitions',
          copyright: 'Copyright © 2026 Mini Pi+ Team'
        }
      }
    }
  },

  ignoreDeadLinks: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#10b981' }]
  ],

  themeConfig: {
    logo: '/company-logo.png',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-repo/mini-pi-soccer' }
    ]
  }
})
