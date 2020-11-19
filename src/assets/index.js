/**
 * @description 静态资源，入口文件。将会被 webpack 打包，配置在 build-assets 目录
 * @author 双越
 */

// 业务组件库样式
import 'lego-components/dist/lego-components.css'

// 检查 channel 参数
import './js/check-channel/index'

// 数据统计
import './js/statistic/index'

// 绑定事件
import './js/bind-events/index'

// 微信 jssk
import './js/wx-jssdk/index'
