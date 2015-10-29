<h1>一行代码实现数组去重（ES6）<sub>2015-10-29</sub></h1>

1. ES6中新增了`Set`数据结构，类似于数组，但是 **它的成员都是唯一的** ，其构造函数可以接受一个数组作为参数，如：

        let array = [1, 1, 1, 1, 2, 3, 4, 4, 5, 3];
        let set = new Set(array);
        console.log(set);
        // => Set {1, 2, 3, 4, 5}
    
2. ES6中`Array`新增了一个静态方法`Array.from`，可以把类似数组的对象转换为数组，如通过`querySelectAll`方法得到`HTML DOM Node List`，以及ES6中新增的`Set`和`Map`等可遍历对象，如：
        
        let set = new Set();
        set.add(1).add(2).add(3);
        let array = Array.from(set);
        console.log(array);
        // => [1, 2, 3]
        
于是，现在我们可以用一行代码实现数组去重了：

    let array = Array.from(new Set([1, 1, 1, 2, 3, 2, 4]));
    console.log(array);
    // => [1, 2, 3, 4]
    
附：ES5实现数组去重

    var array = [1, '1', 1, 2, 3, 2, 4];
    var tmpObj = {};
    var result = [];
    array.forEach(function(a) {
      var key = (typeof a) + a;
      if (!tmpObj[key]) {
        tmpObj[key] = true;
        result.push(a);
      }
    });
    console.log(result);
    // => [1, "1", 2, 3, 4]
    