const Koa = require('koa')

const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const { isPrd } = require('./utils/env')

// 中间件
const renderWithAssets = require('./middlewares/renderWithAssests')

// 路由
const index = require('./routes/index')
const works = require('./routes/works')
const errorRouter = require('./routes/error')

// 遇到异常，浏览器显示错误页
let onerrorConf = {}
if (isPrd) {
    onerrorConf = {
        redirect: '/error', // 线上环境，错误跳转到错误页，提前定义 '/error' 路由
    }
}
onerror(app, onerrorConf)

// middlewares
app.use(
    bodyparser({
        enableTypes: ['json', 'form', 'text'],
    })
)
app.use(json())
app.use(logger())
app.use(require('koa-static')(`${__dirname}/public`))

app.use(
    views(`${__dirname}/views`, {
        extension: 'pug',
    })
)
// 由于 js 和 css 是 webpack 打包产出的，渲染时要统一加上。所以，重写一下 render
app.use(renderWithAssets)

// // logger
// app.use(async (ctx, next) => {
//     const start = new Date()
//     await next()
//     const ms = new Date() - start
//     console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(index.routes(), index.allowedMethods())
app.use(works.routes(), works.allowedMethods())
app.use(errorRouter.routes(), errorRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
