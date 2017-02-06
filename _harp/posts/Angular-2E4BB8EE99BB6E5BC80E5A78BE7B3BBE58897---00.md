<h1>Angular 2从零开始系列 - 00<sub>2017-02-06</sub></h1>

本系列将会从零开始构建一个完整的Angular项目，最终实现一个简易版的twitter，不依赖任何seed或starter，也不使用Angular cli，这样做的目的是让自己对Angular应用开发的每一个环节都有一定的了解

最终的示例会包含以下特性：

- 采用`webpack`进行构建、编译、模块打包
- 模板采用`pug`编写，并支持分环境配置全局模板变量
- 样式采用`less`编写，并支持分环境配置全局less变量
- 路由懒加载
- 通过`npm script`『一键』创建组件相关目录和文件
- 模块热替换(hot module replacement)
- AoT编译
- 服务端渲染

希望对大家能有所帮助

# 序章

## 基础知识

- NPM <https://www.npmjs.com>
- ES6 <http://es6.ruanyifeng.com>
- Webpack <https://webpack.js.org>
- Angular <https://angular.cn>

以上内容是我认为在开始动手之前必须要有一定了解的，不必精通，浏览一遍各自的文档，理解其核心概念即可

那么这里为什么没有提`TypeScript`呢？因为根据我的实践经验，有`ES6`的基础的话，不必系统学习`TypeScript`，开发中遇到其特有的功能时进行针对性的查阅就行了

## 创建项目

### 环境

我们采用`npm`来管理依赖，`NodeJS`运行环境当然是必不可少的，所以第一步就是安装`NodeJS` <https://nodejs.org/>

另外介于国内的网络环境，推荐使用淘宝的npm镜像：<https://npm.taobao.org/>，请按照网站上的说明进行配置

### 初始化

- 打开终端：

```bash
mkdir angular-twitter
cd angular-twitter
npm init #可按照提示填写项目基本信息，或直接一路回车
```

- 安装依赖：

```bash
# Angular
npm install @angular/common @angular/compiler @angular/compiler-cli @angular/core @angular/forms @angular/http @angular/platform-browser @angular/platform-browser-dynamic @angular/platform-server @angular/router rxjs zone.js core-js --save

# Webpack
npm install webpack --save-dev

# TypeScript
npm install typescript --save-dev

# TypeScript loader for webpack
npm install awesome-typescript-loader --save-dev
```

注意这些并不是最终全部的依赖，随着开发的进展，后面会陆续添加其他依赖

- 目录结构：

```text
anglar-twitter/
├── src/ 
    ├── app/
    ├── main.ts 
    ├── index.html
├── webpack.config.js
├── tsconfig.json     
```

(TODO: 还没写完...)


