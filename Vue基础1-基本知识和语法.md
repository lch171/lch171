# Vue 初探

## Vue.js是什么

> Vue.js 是一个轻巧、高性能、可组件化的 **MVVM** 库，拥有非常容易上手的 API。

> MVVM(Model-View-ViewModel) 的核心思想是**双向绑定**，即改变视图会影响数据，反之亦然。

![13038962-96704c499078e5b7](img/MVVM.webp "MVVM")



## Vue.js的优点

* 简单轻巧，功能强大，拥有非常容易上手的 API；
* 可组件化 和 响应式设计；
* 实现数据与结构分离，高性能，易于浏览器的加载速度；
* MVVM 模式，数据双向绑定，减少了 DOM 操作，将更多精力放在数据和业务逻辑上。



## Vue.js 的使用方式

* CDN方式： 使用script标签引入使用
* 使用 Vue-cli 脚手架一键搭建项目
* 自己创建一个webpack项目，引入vue





# 项目搭建

> 建议使用脚手架方式，当然你亦可使用自己写package.json的方式来搭建。
>
> 对于0基础的前端新手，推荐从CDN方式开始。但我们这是速成班，这些细枝末节的不管了。

## CDN方式

```html
<html>
<head>
    <script src="https://unpkg.com/vue@next"></script>
</head>
<body>
<div id="my-first-vue-app">
    {{msg}}
    {{count}}
    <button v-on:click="add">add 1</button>
</div>

<script>
    const myFirstApp = {
        data() {
            return {
                count: 0,
                msg: 'Hello Vue!'
            }
        },
        methods: {
            add() {
                this.count++
            }
        }
    }

    Vue.createApp(myFirstApp).mount("#my-first-vue-app")
</script>
</body>

</html>
```



## 脚手架方式

这里介绍两种方式，根据自己的网络自选一种。

> 见另一文档

---

至此，使用控制台返回之URL，可见一初始的Web网站。



# 前言

> 先介绍一下基础知识



## ES6

ES6是ECMAScript 2015或者叫ECMAScript 6的缩写。

从2015年发布，到2016， 2017， 2018每年的修订都是ES6。所有现代浏览器都完全支持 ECMAScript 1 - 6。

与ES5相比改进相当多，作为基础技能，需要掌握。



## 虚拟DOM

前端的基石。主流的前端框架都使用该技术。

通俗来讲就是，在js中维护了一个于真实DOM对应的DOM树，每次更新时都去更新虚拟DOM，然后计算出更新前后的最小改动，再将最小改动更新到真实DOM上。通过尽可能减少对真实DOM的操作来提升性能，要知道操作DOM是非常消耗性能的。

[这里有个动画](https://v3.cn.vuejs.org/guide/optimizations.html#%E6%B8%B2%E6%9F%93%E6%9C%BA%E5%88%B6%E5%92%8C%E4%BC%98%E5%8C%96)



## 单页应用（SPA)

single page web application，单页Web应用，就是只有一张Web页面的应用，与后台仅仅是数据的交互，不会再请求其它页面。浏览器一开始会加载必需的HTML、CSS和JavaScript，所有的操作都在这张页面上完成，都由JavaScript来控制。

页面的内容由JS来渲染，页面的切换使用**路由**来完成。

前端只是数据的容器，数据的CRUD由后端完成，没有前端，使用后端的API也能正常工作

> SPA  PWA  SSR  CSR都是些前端常说的词，感兴趣可以了解下。



## 前后端分离

 顾名思义，就是将前端代码和后端代码分开。

* 前端：数据的容器，UI，UX
* 后端：数据的维护者

> PHP 这种又管页面渲染，又管数据处理的算啥我也不知道qwq

随着网站信息量的增加，前后端分离是趋势，让专业的人做专业的事。不过一个前端不懂后端是不行的，反之亦然。





## 单文件组件(SFC)

如果你不是使用CDN方式，那么你一定会用单文件组件。简单来说，SFC就是一个`.vue`文件。此文件包含下面三个部分:

* \<template>\</template>: HTML处
* \<script>\</script>: JS逻辑代码处
* \<style>\</style>: CSS处

此三部分为非必须，可根据需求添加。类似于`JSX`，都会被编译为一个渲染函数。


## API

Vue的API有两种:

* Options API: 选项式API 
* Composition API: 组合式API

第一种更适合初学者，结构分明，易于掌握，但是缺点也明显：随着组件越来越复杂，代码复杂程度指数上升。

第二种是现在更常用的API，优点很多，更适合大项目的开发，代码简单，复用性极强。

之后的学习我们会从选项式API开始。



## 指令

Vue中的`指令`指的是那些写在标签上的`v-`开头的属性。

Vue的指令有不少，我们也能自定义指令。

指令的语法：

![v-bind-instead-of-sync](img/v-bind-instead-of-sync.png)

* `青色部分`：指令名
* `黄色部分`：指令参数
*  `白色部分`：指令值

---

它们都是指令

```vue
<div v-if="x === y"></div>
<a v-else></a>
<input v-model="value"/>
<input v-bind="value"/>
<input :title="text" /><!-- : 是 v-bind的缩写 -->
<div v-for="x in 10"></div>
<template #defaul></template><!-- # 是 v-slot的缩写 -->
<button v-on:click="show"></button>
<button @click="show"></button><!-- @ 是 v-on的缩写 -->
...
```

> 有些指令有缩写（一共就三个）
>
> 有些指令可以没参数
>
> 有些指令可一没值

---

不同的指令有不同的用法和特点，后面会慢慢介绍。







# 来，上手

用你最喜欢的IDE打开我们之前创建的项目，之后我使用Vite方式的项目来讲解，其他方式大同小异。

我们先来看看项目结构和`main.js`：

main.js就是整个项目的入口，你可以看到和你写的CDN方式好像，没错，是一样的，你可以看到`index.html`中看到引用。



## 插值和单文件组件

在此小节，你将学到：

> 1. 如何定义一个最基础的单文件组件
>2. 如何定义data
> 3. 如何使用插值语法输出你的数据到页面上
> 4. 如何引入其他组件

让我们在components里面创建一个新的Vue文件：

TemplateSyntax.vue

```vue
<template>
  {{message}}{{ count }} <!-- 这两个就是插值  -->
</template>

<script>
export default {
  data() {
    return {
      message:'现在值是：',
      count: 0
    }
  }
}
</script>
```

然后于APP.vue中引入之

App.vue

```vue
## 这就是一个最基础的单文件组件
<template>
  <TemplateSyntax/>
</template>
<script>
import TemplateSyntax from './components/TemplateSyntax.vue'

export default {
  components:{
    TemplateSyntax,
  }
}
</script>
```

保存并刷新页面，你就能看到页面上的输出了。

善，让我们了看看本节的知识点：

> 如何定义一个最基础的单文件组件

一个包含\<template>\<script>\<style>三个代码块的`.vue`文件（这里没用style，你可以自己添加一个试试）



> 如何定义data

**data**是Vue实例存放数据的地方，它必须是一个返回数据的函数。返回的数据是一个对象。



> 如何使用模板语法输出你的数据到页面上

定义在**data**里的数据，你可以在template里使用它。

要把它输出到页面就用`{{xx}}`包裹它，`{{}}`就是插值语法。



> 如何引入其他组件

需要使用`import`引入，然后在`components`里面加入它，之后你就可以在\<template>里面使用了。



>思考：
>
>data为何一定是函数？
>
>插值里的值如果是undefind或null会怎样？
>
>如果我要插入的是一段HTML，应该怎么写？
>
>如果我要插入的值还得润色润色，比如true显示“对”，false显示“错”，要怎么写？
>
>这个值在组件创建出来后就不再变了，怎么让插值固定以减少渲染提高速度？
>
>我想动态给data添加属性，可以吗？为什么？
>
>template里面可以定义多个根节点吗？ 那么我传递的prop会给谁？

*强烈建议你看看官网，有更详细的介绍*

* [Vue3 插值 文档](https://v3.cn.vuejs.org/guide/template-syntax.html#%E6%8F%92%E5%80%BC)

* [Vue3 data 文档](https://v3.cn.vuejs.org/guide/data-methods.html#data-property)



## 事件处理和Vue的方法

一个网站，最基本的就是显示内容和接受用户输入，这里的输入包括键盘事件、鼠标事件、滚动事件等等等等

相信你一定写过原生javasctipt的事件：

```html
<button onclick='clickme'>点我</button><!-- 或者使用addEventListener -->
```

Vue的事件的使用和这几乎没有区别，在这节你将学到：

> 1. 如何定义一个事件并使用它
> 2. 何为指令
>
> 2. 事件里怎么使用data里的数据
>
> 3. 更改了data，如何让新的值显示在页面上

让我们再新建一个vue文件：

EventDemo.vue

```vue
<template>
  {{message}}{{ count }}
  <button v-on:click="add">加</button>
</template>

<script>
export default {
  data() {
    return {
      message:'现在值是：',
      count: 0
    }
  },
  methods:{
    add(){
      this.count++
    }
  }
}
</script>
```

然后于App.vue引用之：***这是我最后一次展示App.vue的内容，之后的大同小异***

```vue
## 这就是一个最基础的单文件组件
<template>
  <TemplateSyntax/><br/>
  <EventDemo/>
</template>
<script>
import TemplateSyntax from './components/TemplateSyntax.vue'
import EventDemo from "./components/EventDemo.vue";

export default {
  components: {
    TemplateSyntax,
    EventDemo
  }
}
</script>
```

保存，刷新，然后你点击页面上的`加`按钮。 It works!

你试试添加一个`减`按钮。

如此简单，让我们看看知识点：

> 如何定义一个事件并使用它

在**`methods`**里添加一个函数，然后在要监听的元素上**`v-on:click="xx"`**。

* 不光是`click`，像`update`、`mouseEvent`... 等等的事件都是这么用
* `v-on`可以简写为`@`:  **`v-on:click="xx"`**   =>   **`@click="xxx"`**
* 如果你想调用的使用传值，那么你可以用 **`v-on:click="add(value)"`**



> 何为指令

类似`v-on`就是vue的指令，除此之外亦有不少，比如`v-if`, `v-for`, `v-bind`

指令中只有三个能缩写： `v-on` => `@`, `v-bind` => `:` , `v-solt` => `#`

他们有的有参数，有的没有：比如：v-on:click 中click就是参数；再比如v-if就没有参数

你可以自定义指令，不过这不是初级需要掌握的。

详情看这里： [Vue3 指令 文档](https://v3.cn.vuejs.org/guide/template-syntax.html#%E6%8C%87%E4%BB%A4)



> 事件里怎么使用data里的数据

要使用data里定义的变量，需要使用this.xxx的方式。

你可能发现了，为何\<template>里的不需要加this前缀？ 这和vue文件的解析有关，以后说。



> 更改了data，如何让新的值显示在页面上

得益于双向绑定，凡data发生变化，页面旋即自动渲染。So Easy!



> 思考：
>
> 我想在一个method里面，调用另一个method，何如？
>
> 所有事件都得写在methods里吗？哪些可以写在vue外面？
>
> 我现在给method传参数了，那原生的js事件的那个event参数怎么传？
>
> 事件修饰符是什么？作何用？如何用？按键修饰符呢？
>
> 我知道除了click方法还有其他js事件可以用，那是不是所有事件都可以？

*强烈建议你看看官网，有更详细的介绍*

* [Vue 事件处理 文档](https://v3.cn.vuejs.org/guide/events.html)



## 条件渲染

有时候，我们想要视具体情况，动态的渲染页面，此时我们就需要使用`条件渲染`。

在此小节，你将学到：

> 1. 如何根据条件来渲染页面
> 2. 什么是虚拟节点

让我们再创建一个vue文件：

ConditionDemo.vue

```vue
<template>
  <button @click="switchState">切换</button>
  <div v-if="happy">
    开心
  </div>
  <span v-else>
    不开心
  </span>
</template>
<script>
export default {
  data() {
    return {
      happy: true
    }
  },
  methods: {
    switchState() {
      this.happy = !this.happy
    }
  }
}
</script>
```

保存，刷新，然后点击`切换`，试试看。

然后用F12开发者工具看看发生了什么。

让我们看看这节的知识点：

> 如何根据条件来渲染页面

使用v-if来判断是否要显示页面。

如同代码逻辑，亦有v-if、v-else、v-else-if



> 何为虚拟节点

**\<template>**就是虚拟节点，这个节点在最终渲染的页面上不存在。



> 思考：
>
> 虚拟节点渲染后不存在了，那它身上的属性和方法怎么办，不要了吗？
>
> 其实还有个**v-show**，它也很常用，那它和**v-if**有何区别呢？
>
> 试试看在**v-if**块里面，引入之前的加法模块，看看切换渲染后，加法模块中的值还在否，对此你如何理解？

*强烈建议你看看官网，有更详细的介绍*

* [Vue 条件渲染 文档](https://v3.cn.vuejs.org/guide/conditional.html#%E6%9D%A1%E4%BB%B6%E6%B8%B2%E6%9F%93)



## 列表渲染

有时候我们需要显示好几个元素，并且它们长得都差不多（比如网站的菜单），一个个的写太麻烦了，有没有办法使用代码来循环生成？

这就需要使用到Vue的`列表渲染`，在此小节你将学会：

> 1. 列表渲染如何使用
> 2. 列表渲染中的key的作用是什么

让我们再创建一个vue文件：

ListDemo.vue

```vue
<template>
  <button @click="add">Add</button>
  <li v-for="(item,index) in menu" :key="index">{{ item }}</li>
</template>
<script>
export default {
  data() {
    return {
      menu: [
        '首页',
        '第二页',
        '第三页',
        '第四页',
        '第五页',
      ]
    }
  },
  methods:{
    add(){
      this.menu.push('Item')
    }
  }
}
</script>
```

保存，刷新，然后点击`Add`，看看发生了什么。

来看看知识点：

> 列表渲染如何使用

使用**`v-for`**，循环遍历数组或对象，生成元素。

**`v-for`**的第一个参数是item，第二个参数是index。

直接操作目标数据或对象，就能自动的改变渲染的列表。



> 列表渲染的key的作用是什么

**`key`**用来唯一的标识元素，作用是给虚拟DOM提供依据，当元素发生变化时，只重新渲染发生了改变的元素，而不用渲染整个列表，提高效率。**强制要求为每个列表渲染添加** **`key`**!



> 思考：
>
> 1. 若不使用数组，我就想循环指定的次数，应该怎么写？
> 2. **`v-for`**与**`v-if`**可以同时用吗？会发生什么？

*强烈建议你看看官网，有更详细的介绍*

* [Vue3 列表渲染 文档](https://v3.cn.vuejs.org/guide/list.html#%E5%88%97%E8%A1%A8%E6%B8%B2%E6%9F%93)



## 计算属性

顾名思义，计算属性就是一个属性，但是它的值是由一个函数计算得来的。

通过这小节，你将掌握：

> 1. 何为计算属性，如何使用
> 2. 相较普通函数，其有何种优点
> 3. 它是如何实现“只有在需要计算的时候才计算”

让我们设想一个场景： 给定一个数，算出并显示其阶乘。

Computed.vue

```vue
<template>
  <input v-model="number" type="number" step="1"/><br/>
  输入的值是：{{ number }}<br/>
  它的阶乘是：{{ factorial(number) }}<br/>
  <button @click="other++">干点别的</button>
  {{ other }}
</template>
<script>
export default {
  data() {
    return {
      number: 3,
      other: 0
    }
  },
  methods: {
    factorial(val, sum = 1) {
      // 这里用了尾递归优化，不了解的可以自行了解一下，大有裨益。
      console.log('计算')
      val = Number(val)
      if (val === 1) return sum
      if (val < 1) return 0
      return this.factorial(val - 1, val * sum)
    }
  }
}
</script>
```

保存，刷新，你可以看到结果被正确的计算了！

更改输入的值，结果也被实时计算了， 打开F12开发者工具，你会看到每次计算结果的时候都会调用函数并输出了`计算`，效果不错，但是这个组件总得有别的东西把，那我们看看更新组件其他的属性会怎样。
尝试点击`干点别的`按钮来更新属性`other`的值，神奇的一幕发生了，阶乘被重新计算了！

试想一下，一个复杂的页面上，有多少个这种要用函数计算的值，你随便动了下就导致几百个函数被调用、页面直接卡住，这合理吗？

当然不合理，我们用**`计算属性`**改写一下。

Computed.vue

```vue
<template>
  <input v-model="number" type="number" step="1"/><br/>
  输入的值是：{{ number }}<br/>
  <!--  它的阶乘是：{{ factorial(number) }}<br/>-->
  它的阶乘是：{{ factorial2 }}<br/>
  <button @click="other++">干点别的</button>
  {{ other }}
</template>
<script>
export default {
  data() {
    return {
      number: 3,
      other: 0
    }
  },
  methods: {
    factorial(val, sum = 1) {
      // 这里用了尾递归优化，不了解的可以自行了解一下，大有裨益。
      console.log('计算', val, sum)
      val = Number(val)
      if (val === 1) return sum
      if (val < 1) return 0
      return this.factorial(val - 1, val * sum)
    }
  },
  // 重点在这里
  computed: {
    factorial2() {
      return this.factorial(this.number)
    }
  }
}
</script>
```

看，我们在`computed`里面定义了一个函数，这个函数用来计算data里面number的阶乘（我就换了个名字，还是用以前的函数了）。

使用这个`computed`的时候，我是将它作为属性来用：`factorial2`，而不是一个函数：`factorial2()`。 既是属性那就没有传参数一说了。

现在你再看看执行结果，是不是**只有**number被改变的时候才调用`计算`。

> 何为计算属性，如何使用

计算属性是“使用data里的一个或多个值，经过一定计算，以函数返回值作为它的属性值”的属性。它是属性而不是函数。

使用的时候，将其当做data中定义的即可，使用方式与使用data无区别。



> 相较普通函数，其有何种优点

通过刚才的例子，聪明的你已经发现了：**它会缓存上次的计算结果**，如果计算结果不变它是不会重新计算的，并且如果你压根不使用它，那它也不会去计算。

优点当然是减少了重复计算，提高了效率。



> 它是如何实现“只有在需要计算的时候才计算”

其实原理很简单，它会找到自己函数体中所有的data并订阅，如果data变化了，就标记一下，下次有谁来get的时候就重新计算一下，如果从上次计算后data没变，那直接返回计算过的结果。

所以两个要点：

1. 它的内部必须使用了data，如果没使用，那就相当于只计算一次，之后再也不重新计算了。若如此，则其失去了意义，连普通函数都不如。
2. 只有在使用它的时候才计算，计算的时机取决于使用的时机。



> 思考：
>
> 1. 它的确是个属性，因为我可以get它，那setter呢？

*强烈建议你看看官网，有更详细的介绍*

* [Vue3 计算属性 文档](https://v3.cn.vuejs.org/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7)



## 侦听器

你已经学会了使用计算属性来监听data的变化，并在变化后执行一些操作，但是有个问题，虽然计算属性监听的data，但它只在你使用的时候计算，有没有通用的办法来监听data的变化呢。

通过此小节，你将学会：

> 1. 何为侦听器，如何使用它

我们来给上一节的demo加一个功能，统计一共计算了几次阶乘（number被改变了几次）：

WatchDemo.vue

```vue
<template>
  <input v-model="number" type="number" step="1"/><br/>
  输入的值是：{{ number }}<br/>
  <!--  它的阶乘是：{{ factorial(number) }}<br/>-->
  它的阶乘是：{{ factorial2 }}<br/>
  你已经计算了：{{ count }}次<br/>
  <button @click="other++">干点别的</button>
  {{ other }}
</template>
<script>
export default {
  data() {
    return {
      number: 3,
      other: 0,
      count: 0
    }
  },
  methods: {
    factorial(val, sum = 1) {
      // 这里用了尾递归优化，不了解的可以自行了解一下，大有裨益。
      console.log('计算', val, sum)
      val = Number(val)
      if (val === 1) return sum
      if (val < 1) return 0
      return this.factorial(val - 1, val * sum)
    }
  },
  computed: {
    factorial2() {
      return this.factorial(this.number)
    }
  },
  // 重点在这里
  watch: {
    number(val, oldval) {
      this.count++
    }
  }
}
</script>
```

试试看，每次改变number都会使count加一。

> 何为侦听器，如何使用它

很容易理解不是吗？ 在`watch`里面定义一个与data同名的函数，当data改变时，这个函数就会被自动地调用。

这个函数有两个参数：

* 第一个参数是data的新值
* 第二个参数是data的老值

你可以用来做一些判断，比如只有偶数加一啊之类的。

如果要监听计算属性，也是一样，在watch里定义一个和计算属性同名的函数。

**`watch`**也是可以监听复杂对象的，比如一个对象。但你要知道

* 对象的全部属性被监听
* 但是如果一个属性的值是对象，那么它实际上保存的是对象的引用，引用不变，这个值的属性改边了是不会被监听的。

例如：

```javascript
let obj = {
    a : 0,
    b : 'xxx',
    c : {
        c1 : 0,
        c2 : "xxx"
        c3 : {
        ....
    	}
    }
}
```

这个对象的`a` `b` `c` 被改变都能watch，但是`c1` `c2` `c3` 的改变是不行的。怎么办呢？其实watch是有属性配置的,，你可以这么写：

```javascript
watch : {
    obj : {
        handler:function(val,oldval){
            ...
        },
        deep : true
    }
}
```

这样就能监听到对象内部的变化了。

那如果你只想监听obj.b的变化，其他的你不关心，监听整个obj当然可以，但还得具体判断obj.b的新旧值到底变了没有（因为obj的其他属性变化也会触发watch）。你可以这么写：

```javascript
watch : {
    'obj.b':function(val,newval){
        ...
    }
}
```

没错，用引号将表达式引用即可。



> 思考：
>
> 1. 可以深度监听一个对象，那么数组呢？
> 2. 其实watch不光deep一个属性，它还有其他属性，都是什么作用？
> 3. 有这样的场景，只要你更改了表单，我就提示未保存，一直监听太浪费性能，我就监听到第一次的改变就行了，以后不用监听了，如何取消监听呢？

*强烈建议你看看官网，有更详细的介绍*

* [Vue3 侦听器 文档](https://v3.cn.vuejs.org/guide/computed.html#%E4%BE%A6%E5%90%AC%E5%99%A8)



## 输入绑定

在上面计算阶乘中我们已经使用了一个v-model指令，试想一下在原生js中，想要感知一个input的改变，我们是不要绑定一个onchange或者oninput事件？

例子就不写了，参照上面的计算阶乘的例子。当我们改变input的内容时，vue实时的将它更新给了data。

我们在前面`插值`已经见识了双向绑定的一个方向：Model（数据）-> View（视图）的绑定，更改data，实时改变View。

现在我们就可以看到双向绑定的另一个方向了：当View更新，Model也会同步更新。

了解React或者不了解但聪明的你应该已经想到了：

* **`v-model`**本质上是语法糖，它不过是用一个指令就帮你给元素添加了`:value`和`@oninput`。
* **`v-model`**在不同的元素上，绑定的是不同的属性/事件： 比如在checkbox上会绑定`checked`和`onchange`
* 既然是绑定`oninput`事件，那IME输入的过程是不会触发更新的，只有你的输入上了屏才会。
* 所有的表单元素：input、checkbox、radio、textarea等等都可以用。
* 不光是HTML的表单元素元素可以使用，你自己定义的组件也能使用v-model。v-model在表单元素和自定义的组件上的行为有不同，但我们无需关心。
* `v-model`也有修饰符：

实际上Vue3中，v-model绑定的是 `:modelValue` 和`@update:modelValue`

```vue
<ChildComponent v-model="pageTitle" />

<!-- 是以下的简写: -->

<ChildComponent :modelValue="pageTitle" @update:modelValue="pageTitle = $event"/>
```

v-model还可以有参数：

```vue
<ChildComponent v-model:title="pageTitle" />

<!-- 是以下的简写: -->

<ChildComponent :title="pageTitle" @update:title="pageTitle = $event" />
```

使用不同的参数，就可以让你在一个组件上实现多个v-model双向绑定。





>思考：
>
>1. 前面的学习我们知道指令可以有修饰符，**`v-model`**有哪些修饰符呢？

*强烈建议你看看官网，有更详细的介绍*

[Vue3 表单输入绑定 文档](https://v3.cn.vuejs.org/guide/forms.html#%E8%A1%A8%E5%8D%95%E8%BE%93%E5%85%A5%E7%BB%91%E5%AE%9A)



## 生命周期

任何语言，任何框架，只要有实例，就有实例的生命周期，Vue也不例外。

下图就是老生常谈了，你看看就理解了，Vue为我们提供了几个生命周期钩子，就是下图红框的。

![lifecycle](img/lifecycle.svg)

你可以使用它们，来更好的完善和定义你的组件：

LifeDemo.vue

```vue
<template>
  <div>LifeDemo</div>
  <button @click="value++">改变下Data</button>{{value}}
</template>
<script>
export default {
  data() {
    return {
      value: 0
    }
  },
  beforeCreate() {
    console.log("初始化组件，但没创建呢")
  },
  created() {
    console.log("组件已经创建了，但是还没渲染（挂载）到页面上")
  },
  beforeMount() {
    console.log("挂载前")
  },
  mounted() {
    console.log("组件已经渲染好了！")
    // 向后端发送请求
    // 初始化一些data
    // 等等操作都在这里做
  },
  beforeUpdate() {
    console.log("更新前")
  },
  updated() {
    console.log("更新了")
  },
  beforeUnmount() {
    console.log("卸载前")
  },
  unmounted() {
    console.log("卸载了")
  }
}

</script>
```

可以看到各个生命周期依次被调用，点击按钮更新data，更新周期也被调用。

想看卸载的生命周期，你可以写个v-if，让组件渲染/不渲染。

还有其他的生命周期，你可以看看文档。

需要注意的是，有的周期，比如beforeCreate，在这时候组件的实例还没new呢，你是无法用this.获得实例的data或方法的。



> 思考：
>
> 1. 每个周期都适合干什么
> 2. 你看到了，当点击按钮的时候，更新周期被调用了。那么如果你删除`{{value}}`，点击后页面没有任何变化，看看更新是不是还执行？再给它写个watch打印一下value，看看value更没更新？你悟出了什么？update生命周期到底响应的是谁的更新？data的？

*强烈建议你看看官网，有更详细的介绍*

[Vue3 生命周期钩子 文档](https://v3.cn.vuejs.org/api/options-lifecycle-hooks.html#beforecreate)



## Class 与 Style 绑定

### Class

你可以给class传入数组或对象，如果是对象，那key是class名、value是条件。

很简单，过。

### Style

一样的，你可以给style传如数组或对象，如果是对象，那key是css属性名、value是css属性值。



> 思考：
>
> 1. 前面一直没讲的单文件组件的\<style>块怎么用？
> 2. \<style>块的scope属性是干什么的？

*强烈建议你看看官网，有更详细的介绍*

* [Vue3 Class与Style绑定 文档](https://v3.cn.vuejs.org/guide/class-and-style.html#class-%E4%B8%8E-style-%E7%BB%91%E5%AE%9A)



## 组件基础

组件化的目的是复用，代码分离等，现在你已经能写出一个组件了，但这个组件的复用性不好，搞不好只用一次，一点也没吃到组件化的红利，让我们来抽象它，提高组件的灵活性，让组件能复用，还每次都不一样。

### 组件复用

我们上面定义了好多组件，那我们就可以在App.vue里复用了：

```vue
<div>
  <LifeDemo></LifeDemo>
  <LifeDemo/>
  ...
</div>
```

你每用一次，它就被创建一个新的实例（可不是单例模式，是prototype）。所以它们内部各有一套data、methods、watch等等

### 组件组织

一个大的应用，你可以按Box给拆分为一个个组件。

![components](img/components.png)

当然了，你也能提取出常用部分做为组件，比如定义一个自己风格的按钮，到处用它来统一设计风格。

对于第一种，你可以使用**`局部注册`**，就像我们之前的那样，在要使用的地方导入，并添加到`component`里。

对于第二种，你大可以使用**`全局注册`**：然后任何地方都能使用它

```vue
const app = Vue.createApp({})

app.component('my-component-name', {
  // ... 选项 ...
})
```



### 通过 Prop 向子组件传递数据

就像你在使用\<input :value=“xxx”>一样，你也可以给你组件传递属性值：

ChildrenDemo.vue

```vue
<template>
  <span style="color: blue">Hi {{ name }}</span>
</template>
<script>
export default {
  props: ['name']
}
</script>
```

使用 **`props`**属性定义属性，然后父组件：

```vue
<ChildrenDemo name="Tom"/>
```

**`props`**的定义比较灵活

```javascript
props:["name"] // 比较基础，只定义了名字
```

或者

```javascript
props:{ 
	name:String, // 可以定义类型
    xxx:Object
    ...
    name2:{   // 也可以具体定义  TS中建议用这种完整的定义
        type:String, 	// 类型定义  	可选的
        required:true, 	// 是否必须   	可选的
        default:"abc"   // 默认值    	 可选的，也可以是一个函数
    }，
    name3:{
        type:[String, Number], 	// 可能的类型
        validator(){
            // 验证函数，可以对props进行初步验证，返回bool
        }
    }
}
```





在Vue组件上，数据流必须是单向的。

即：

* 父组件通过prop给子组件数据，但是子组件不能尝试改变它，否则会报错，你可以试试看。



###  自定义事件

前面介绍了Vue中的数据流是单向的，上一节介绍了使用`prop`从父组件流向子组件。

这节来学习使用自定义事件来让数据从子组件流向父组件。

改写一下上面的例子：

ChildrenDemo.vue

```vue
<template>
  <button @click="repeat">重复</button>
  <br/>
  <span style="color: blue">Hi {{ name }}</span>
</template>
<script>
export default {
  props: ['name'],
  emits: ['sayHello'],
  methods: {
    repeat() {
      this.$emit('sayHello')
    }
  }
}
</script>
```

父组件：

```vue
<template>
  <ChildrenDemo :name="name" @sayHello="hello"/>
</template>
<script>
import ChildrenDemo from "./components/ChildrenDemo.vue";

export default {
  components: {
    ChildrenDemo
  },
  data(){
    return {
      name:'Tom'
    }
  },
  methods:{
    hello(){
      alert(`Hello Im ${this.name}`)
    }
  }
}
</script>
```

点击按钮，你可以看到alert被弹出。

prop就是传值，emit就是传函数（事件）。

如果你想传函数的时候再带上参数，那你可以：给`this.$emit`加参数，你要几个就再后面加几个

```javascript
this.$emit('sayHello',"nice to meet you!")
```

父组件的函数就能收到了：

```javascript
methods:{
    hello(val){
      alert(`Hello Im ${this.name}. ${val}`)
    }
  }
```



> 思考：
>
> 1. 既然是传函数，那函数的this是谁？我传箭头函数呢？
> 2. 聪明的你一定想到了，传值有了，函数方法有了，那我不就能用v-model了吗！那是不是我就能写出组件的双向绑定了？写一个然后用v-model试试看。
> 3. 组件的属性也好，方法也好，是不是必须用`props`和`emit`定义了才能用？没定义的会去哪呢？怎么捕捉并使用呢？



### 动态组件

这里只介绍一下基础用法。

在多个组件之间切换，可以使用**v-if**，但是这需要维护多个组件的状态，这会很麻烦。

我们可以使用动态组件来简化这一过程。

```vue
<component :is="currentTabComponent"></component>
```

现在只需要控制**currentTabComponent**为你想使用的组件名就可以了。以后扩展起来也方便了。

>思考：
>
>1. 在两个组件之间切换，会重新创建组件，如果保持组件状态呢？

[Vue3 动态组件 文档](https://v3.cn.vuejs.org/guide/component-dynamic-async.html#%E5%8A%A8%E6%80%81%E7%BB%84%E4%BB%B6-%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6)



## 插槽

现在我们已经掌握了组件的定义和使用，也知道如何给我们的组件添加属性（props）和事件。但是我们的组件就能复用了吗？

让我们想一个场景：

> 我们要定义一个有自己风格的dialog组件，它总是由三个部分组成：标题、内容、动作。这三个部分的内容由使用者来决定，可能是添加时的表单，可能是删除时的确认框。。
>
> 我们总不能为每个场景，定义一个组件吧。这时候就需要使用插槽，来定制我们的组件了。

这一节是Vue学习的重点，也是使用频率很高的知识点：

>1. 什么是插槽
>2. 如何定义插槽

MySlot.vue

```vue
<template>
  <div>
    下面的Div有个蓝色边框
    <div style="color: blue;border: blue solid 1px">
      <slot></slot>
    </div>
  </div>
</template>
```

然后引用它：

SlotDemo.vue

```vue
<template>
  <MySlot>这是标题</MySlot>
	<!--
	等价于：
	<MySlot>
		<template v-slot:default>这是标题</template>
    </MySlot>
	-->
</template>
<script>
import MySlot from "./MySlot.vue";

export default {
  components: {MySlot}
}
</script>
```

运行一下看看结果。

### 基础插槽

这就是一个最简单的插槽：

* 在组件里使用**`<slot></slot>`**占用一个位置
* 在使用这个组件的时候，标签之间的内容会被插入到**`<slot></slot>`**中
* 如果组件没有定义**`<slot></slot>`**，那么标签之间的内容会被丢弃



### 渲染作用域

如果你要在插槽中使用变量，那么你只能使用父级自己的变量

比如：

```vue
 <template>
      <MySlot>
        My Name is {{ user.name }}
      </MySlot>
      {{ user.name }}
 </template>
```

这里的user变量如果是MySlot中定义的，那么什么也得不到。



### 插槽的备用内容

如果你在使用组件的时候，没有在标签之间提供内容，那么定义在组件的**`<slot></slot>`**标签中的内容将被显示。

MySlot.vue

```vue
<template>
  <div>
    下面的Div有个蓝色边框
    <div style="color: blue;border: blue solid 1px">
      <slot>这是默认值</slot>
    </div>
  </div>
</template>
```

SlotDemo.vue

```vue
<template>
  <MySlot></MySlot>
</template>
<script>
import MySlot from "./MySlot.vue";

export default {
  components: {MySlot}
}
</script>
```

运行一下看看结果。



### 具名插槽

就想前面我们假设的场景，可以在组件中定义多个插槽。

MySlot.vue

```vue
<template>
  <div>
    蓝的
    <div style="color: blue;border: blue solid 1px">
      <slot></slot>
    </div>
    红的
    <div style="color: blue;border: red solid 1px">
      <slot></slot>
    </div>
    绿的
    <div style="color: blue;border: green solid 1px">
      <slot></slot>
    </div>
  </div>
</template>
```

SlotDemo.vue

```vue
  <MySlot>
    <template v-slot:red>
      red插槽
    </template>
    <template v-slot:blue>
      blue插槽
    </template>
    <template #green>
      green插槽
    </template>
  </MySlot>
```

运行一下看看结果。

要定义多个插槽：

* 需要用**`name`**属性，为每个插槽起个名字，告诉vue应该将内容渲染到哪里
* 使用\<template>标签和**`v-slot:xxx`**指定要使用的插槽名
* 实际上，只有一个插槽并且没有命名时，插槽的名字是**`default`**
* **`v-slot`**可以简写为**`#`** ，例如 **`#blue`**,
* 如果插槽名是**`default`**，那可以省略名称**`xxx`**，用 **`v-slot`**，但是不能简写为''#''除非`#default`



### 作用域插槽

在定义插槽的时候，可以给\<slot>标签传递属性或事件。

MySlot.vue

```vue
<template>
    <slot name="blueviolet" :username="name"></slot>
</template>
<script>
export default {
  data() {
    return {
      name: '张三'
    }
  }
}
</script>
```

SlotDemo.vue

```vue
<template>
  <MySlot>
    <template #blueviolet="prop">
      <div style="color: blueviolet">
        法外狂徒：{{ prop.username }}
      </div>
    </template>
  </MySlot>
</template>
<script>
import MySlot from "./MySlot.vue";

export default {
  components: {MySlot}
}
</script>
```

运行一下看看结果。

作用域插槽：

* 为\<slot>标签传递属性或事件
* 在使用插槽的地方绑定变量



*强烈建议你看看官网，有更详细的介绍*

[Vue3 插槽 文档 ](https://v3.cn.vuejs.org/guide/component-slots.html#%E6%8F%92%E6%A7%BD)



## 模板引用Ref

很简单，但非常有用！我直接粘官网了。



尽管存在 prop 和事件，但有时你可能仍然需要直接访问 JavaScript 中的子组件。为此，可以使用 `ref` attribute 为子组件或 HTML 元素指定引用 ID。例如：

```vue
<input ref="input" />
```

例如，你希望在组件挂载时，以编程的方式 focus 到这个 input 上，这可能有用

RefDemo.vue

```vue
<template>
  <input ref="input">
  <button @click="focus">聚焦！</button>
</template>
<script>
export default {
    methods:{
      focus(){
        this.$refs.input.focus()
      }
    }
}
</script>
```

不仅如此，在你自己定义的组件上也可以用，亲自试试看吧。

不到必要情况，并不建议用这个方式，当你深入的了解后就明白为什么这种方式是不推荐的。

[Vue3 模板引用 文档](https://v3.cn.vuejs.org/guide/component-template-refs.html)

------

至此，Vue的基础内容就介绍完了，基本的使用和看代码已经没有问题了，其实Vue还有**很多**东西，感兴趣的可以看看官网（不长）。

