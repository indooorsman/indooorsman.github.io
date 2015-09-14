<h1>利用野狗(WildDog)纯静态实现实时评论<sub>2015-09-14</sub></h1>

[野狗(WildDog)](https://www.wilddog.com/)是一个类似facebook的[Parse](https://www.parse.com)的服务，目前只有免费套餐，相比Parse来说更偏向于实时应用，但是不能存储文件，没有`cloud code`等，不过对国内用户来说速度要快很多。。。

野狗的文档比较全面也比较清晰，集成起来很简单，目前的使用情况来看也比较稳定。由于太简单了，所以有兴趣的同学直接看代码吧。。。唯一可以说说的一点就是如何关联当前文章和对应的评论，我采用的方案是把当前页面的host+pathname做SHA1(不是为了加密，只是为了缩短。。。)，作为存储的key，具体看代码吧：

[https://github.com/indooorsman/indooorsman.github.io/blob/master/_harp/assets/js/rl-comments.js](https://github.com/indooorsman/indooorsman.github.io/blob/master/_harp/assets/js/rl-comments.js)

P.S. 当初刚看到Parse的时候就不由得感慨，技术就是生产力，有了Parse基本不需要服务端开发了，数据库都不用了，甚至可以用纯静态页面实现很多产品，大大降低了人力和时间成本，简直不能赞的更多了！由衷的祝野狗可以做的更大，走的更远，甚至改变世界 :p

P.S.P.S 野狗团队不少人来自我的老东家人人网，好感度倍升，嘿嘿~