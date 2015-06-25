# AngularJs controller之间的通信

controller之前可以通过事件通信，最近的项目中是通过$rootScope绑定和监听事件，如：

<pre>
<code class="javascript">
// controller A:
...
$rootScope.$emit('eventC', eventData)
...

// controller B:
$rootScope.$on('eventC', function() {...});
</code>
</pre>

开始的时候页面比较少，没有发现问题，后来使用了`ngRoute`，发现当`controller B`绑定的页面打开几次后，会同时触发多次`eventC`，原因就是`$rootScope`的生命周期是跟随整个app的，而不是某个controller，其绑定的事件当然也不会随某一个controller的销毁而销毁。。。然后`controller B`被多次调用后`$rootScope`就被绑定了多个重复的事件

## 解决方案：

理解了scope的生命周期就好办了，`controller B`销毁时其scope绑定的事件也会跟着销毁，所以只要把事件绑定到`controller B`自己的scope上就可以了

<pre>
<code class="javascript">
// controller A:
...
$rootScope.$broadcast('eventC', eventData)
// 注意这里是`$broadcast`而不是`$emit`
...

// controller B:
...
$scope.$on('eventC', function() {...});
...
</code>
</pre>


