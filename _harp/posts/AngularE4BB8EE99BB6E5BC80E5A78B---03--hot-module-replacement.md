<h1>Angular从零开始 - 03. hot module replacement<sub>2017-06-09</sub></h1>

> 接上篇 [Angular从零开始 - 02. live reloading & webpack dev server](./AngularE4BB8EE99BB6E5BC80E5A78B---02--live-reloading---webpack-dev-server)

## 什么是HMR

webpack官方有非常详细的解释：<https://doc.webpack-china.org/concepts/hot-module-replacement/>

> 模块热替换功能会在应用程序运行过程中替换、添加或删除模块，而无需重新加载页面。这使得你可以在独立模块变更后，无需刷新整个页面，就可以更新这些模块，极大地加速了开发时间。

简单说就是修改代码之后不需要刷新整个页面就能看到效果

- main.ts添加hmr相关代码
- webpack.config添加devtool字段
- package.json中的启动脚本添加--hot参数
- webpack.NamedModulesPlugin