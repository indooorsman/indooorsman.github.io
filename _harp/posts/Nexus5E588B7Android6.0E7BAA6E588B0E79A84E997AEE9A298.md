<h1>Nexus5刷Android6.0遇到的问题<sub>2015-11-02</sub></h1>

在Android 6.0正式版发布之前我已经刷了6.0的第三个预览版，当时是清除数据刷的，没有遇到问题，但是在预览版的基础上，保留用户数据刷正式版（下载官方工厂镜像通过fastboot刷的）却遇到了一个很严重的问题：之前安装的非系统应用绝大多数无法打开，打开就停止运行，尝试卸载应用后重新安装就可以了，但这样之前的应用数据就丢了。。。

就这样卸载重装几个之后觉得不是事儿啊，然后观察几个还能打开的应用，比如root explorer，发现虽然可以正常运行，却无法访问sdcard，于是突然想到android 6.0新增的权限管理，到设置里一看果然之前在预览版中安装的应用的所有权限都是禁用状态，尝试手动开启发现根本无法开启。。。会自动变成禁用状态，what the f**k 。。。。

不过这样就确定了不是应用数据的问题，所以重新下载了有问题的应用，在不卸载的情况下直接覆盖安装，就没有问题了，数据也保留了，也不崩溃了