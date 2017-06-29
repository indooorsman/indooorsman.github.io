<h1>Angular从零开始 - 04. AoT预编译<sub>2017-06-27</sub></h1>

> 接上篇 [Angular从零开始 - 03. hot module replacement](./AngularE4BB8EE99BB6E5BC80E5A78B---03--hot-module-replacement)

## 什么是AoT

`AoT`是`Ahead-of-time`的缩写，与`JIT` (`Just-in-time`)相对，在Angular中，AoT即在构建阶段将`html`模板编译成可执行的`js`代码，JIT则是在浏览器运行时进行模板编译

> 事实上只有一个Angular编译器，AOT和JIT之间的差别仅仅在于编译的时机和所用的工具。 使用AOT，编译器仅仅使用一组库在构建期间运行一次；使用JIT，编译器在每个用户的每次运行期间都要用不同的库运行一次。<https://angular.cn/docs/ts/latest/cookbook/aot-compiler.html>

## 实现AoT

在官方的[cookbook](https://angular.cn/docs/ts/latest/cookbook/aot-compiler.html)中，使用的`ngc`来进行`AoT`编译，但是实际项目中`ngc`并不能满足需求，比如需要与`webpack`以及模板引擎和样式预处理器配合时，只用`ngc`的话会很麻烦。。。因此这里我们使用同样是官方出品的`webpack`插件[@ngtools/webpack](https://www.npmjs.com/package/@ngtools/webpack)

1. 安装`@ngtools/webpack`

  ```bash
  npm i @ngtools/webpack --save-dev
  
  # webpack已经发布3.0了，这里我们顺便升级一下webpack及其他依赖
  npm i webpack@latest --save-dev
  npm update
  ```
1. 配置`webpack`

  由于AOT编译过程可能会相对耗时，我们在开发环境和生产环境需要做不同的配置，因此首先我们新建一个AOT的webpack配置
  1. 复制`./webpack.config.js`为`./webpack.aot.config.js`
  1. 修改 `./webpack.aot.config.js`，这里我们也做一些其他针对生产环境的配置