module.exports = {
  // 配置别名
  configureWebpack: {
    resolve: {
      alias: {
        // '@'-> src
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}