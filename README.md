# h5-server

作品 h5 展示 - server 开源代码，欢迎 star ！

## 本地运行

-   安装 `npm i`
-   配置本地数据库，在 `src/config/envs/dev.js`
-   运行 `npm run dev`

## API

-   发布作品 url `/p/10-e5bb?channel=2` ，`10` 即作品 id ，`e5bb` 即作品 uuid ，`2` 即渠道号
-   预览作品 url `/p/preview/10-e5bb` ，，`10` 即作品 id ，`e5bb` 即作品 uuid ，无需渠道号

## 注意事项

代码开源之后，屏蔽了一些信息（如线上数据库、第三方服务 secret 、服务器等）。所以以下流程无法顺利执行：

-   从 0 到 1 的设计过程，commit 记录
-   pre commit 检查：单元测试、接口测试
-   CI/CD
-   发布到测试机
-   发布上线/回滚
-   运维和监控

想了解这些，可去关注我们的《Web 前端架构师》课程，其中都有详细讲解。
