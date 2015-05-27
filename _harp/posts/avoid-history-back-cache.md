# 避免history.back返回的页面中http get请求的缓存

项目中遇到一个问题, 从首页进入购物车之后, 修改购物车中的商品数量, 再通过浏览器的返回按钮回到首页后, 首页的购物车数量不改变, 原因就是通过返回按钮返回的页面中的http get请求貌似会强制从缓存中取, 就算在http headers里设置no-cache也不管用.

所以只好曲线救国了: 

<pre>
<code class="javascript">
    // 首页代码中获取购物车数量的代码:
    $.get('/cart/count?t=' + Date.now(), function() {
        // 每次请求都加个时间戳吧...
    });
</code>
</pre>