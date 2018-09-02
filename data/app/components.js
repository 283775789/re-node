/**
 * 组件列表：
 * 1. 在选择组件时，会按此列表生成供选择的组件列表;
 * 2. 每个类型对应一个css文件;
 * 3. 每个demo对应一个组件示例;
 */

module.exports = [
  {
    group: '布局',
    children: [
      {
        type: '头部',
        demos: [
          {
            name: '基本',
            tag: 'demo-header-base'
          },
          {
            name: '导航图标换行',
            tag: 'demo-header-icon-wrap'
          },
          {
            name: '导航带图标',
            tag: 'demo-header-icon'
          }
        ]
      },
      {
        type: '二级导航',
        demos: [
          {
            name: '二级导航',
            tag: 'demo-nav-lv2'
          }
        ]
      },
      {
        type: '主体布局',
        demos: [
          {
            name: '普通布局',
            tag: 'demo-body-base'
          }
        ]
      },
      {
        type: '侧边栏布局',
        demos: [
          {
            name: '侧边栏布局',
            tag: 'demo-sidebar'
          }
        ]
      },
      {
        type: '工具容器',
        demos: [
          {
            name: '文字截断盒子',
            tag: 'demo-cutoff-box'
          },
          {
            name: '垂直居中盒子',
            tag: 'demo-vam-box'
          }
        ]
      }
    ]
  },
  {
    group: 'xxx',
    children: [
      {
        type: 'xxx',
        demos: [
          {
            name: 'xxx',
            tag: 'xxx'
          }
        ]
      }
    ]
  },
  {
    group: '元件',
    children: [
      {
        type: '按钮',
        demos: [
          {
            name: '主按钮',
            tag: 'demo-button-main'
          },
          {
            name: '辅按钮',
            tag: 'demo-button-secondary'
          },
          {
            name: '弱化按钮',
            tag: 'demo-button-weaking'
          },
          {
            name: '所有按钮',
            tag: 'demo-button-all'
          }
        ]
      }
    ]
  },
  {
    group: '功能',
    children: [
      {
        type: 'tab选项卡',
        demos: [
          {
            name: '基本',
            tag: 'demo-tabs-base'
          },
          {
            name: '卡片式',
            tag: 'demo-tabs-card'
          },
          {
            name: '按钮式',
            tag: 'demo-tabs-btn'
          }
        ]
      },
      {
        type: '弹窗',
        demos: [
          {
            name: '基本',
            tag: 'demo-modal-base'
          },
          {
            name: '其它所有',
            tag: 'demo-modal-all'
          }
        ]
      }
    ]
  },
  {
    group: 'xxx',
    children: [
      {
        type: 'xxx',
        demos: [
          {
            name: 'xxx',
            tag: 'xxx'
          }
        ]
      }
    ]
  }
]
