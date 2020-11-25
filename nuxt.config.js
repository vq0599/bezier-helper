export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: '贝塞尔曲线在线绘制🚀',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: '贝塞尔,贝塞尔函数,贝塞尔曲线,贝塞尔曲线可视化,贝塞尔曲线工具,贝塞尔曲线生成器,贝塞尔曲线在线绘制' },
      { name: 'keywords', content: 'bezier-curve.com致力于提供体验良好的贝塞尔曲线在线可视化绘制、调式工具' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: 'https://hm.baidu.com/hm.js?5e39d7199342987d1b5980b45bea0815',
        defer: true
      }
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  },
  // Generate Configuration (https://go.nuxtjs.dev/config-build)
  generate: {
    dir: 'docs'
  }
}
