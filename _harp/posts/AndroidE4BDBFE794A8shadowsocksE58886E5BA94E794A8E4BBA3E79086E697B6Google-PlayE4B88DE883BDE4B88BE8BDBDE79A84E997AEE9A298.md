<h1>Android使用shadowsocks分应用代理时Google Play不能下载的问题<sub>2015-11-06</sub></h1>

如题，使用shadowsocks时设置了分应用代理，并把google play加入了白名单，但是缺只能浏览不能下载安装app，原因其实很简单：google play把下载任务丢给了系统的下载程序，所以，只要把“下载”和“下载管理程序”也加入白名单就可以正常使用google play下载安装app了