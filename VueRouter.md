# 0. Router

之前我们已经介绍过了，我们开发的是一个单页应用。单页应用是将多个页面放在了一个HTML中，然后使用js来判断显示哪些页面或部分。

我们当然可以用众多的`v-if`来嵌套我们的组件来实现页面的切换。但这太不容易管理了，并且使用v-if，浏览器的URL不会变，不方便记录页面位置

这时候我们就需要使用前端的又一个技术：`路由`

Vue Router 是 [Vue.js (opens new window)](http://cn.vuejs.org/)官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。包含的功能有：

- 嵌套的路由/视图表
- 模块化的、基于组件的路由配置
- 路由参数、查询、通配符
- 基于 Vue.js 过渡系统的视图过渡效果
- 细粒度的导航控制
- 带有自动激活的 CSS class 的链接
- HTML5 历史模式或 hash 模式，在 IE9 中自动降级
- 自定义的滚动条行为

https://next.router.vuejs.org/zh/guide/

> 之后的例子，我们都会在组合式API的基础上，选项式API的使用方式更简单不再缀述

---



# 1. 安装

```bash
# 在你的项目根目录执行,这里安装的是VueRouter的最新版V4来配合Vue3
npm install vue-router@4
```

待安装完成后，为你的Vue实例安装VueRouter

```javascript
import VueRouter from 'vue-router'

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
  	routes: [
      //这里定义我们的路由，我们先空着
    ]
})

const app = createApp(App)
app.use(Router)
app.mount('#app')
```

现在，我们就为Vue添加了路由功能

>如果你使用的是Vite，那么到这一步可能会报错：
>
>Uncaught SyntaxError: The requested module '/node_modules/.vite/vue-router.js?v=b585e2f7' does not provide an export named 'default'
>
>这是因为Vite只支持ES6 moudel不支持Common.js写法。你只需要将引用改为按需引用：
>
>import VueRouter from 'vue-router'   =>   import {createRouter,createWebHashHistory} from 'vue-router'
>
>这里我只引用了两个，如果你需要其他的就写在{}中间

---



# 2. 来，上手

为了方便讲解，我设计了一个页面并用不同颜色做了区分：

这是一个最简单的页面布局：左边是导航，右面是页面

![截屏2021-08-11 下午7.28.06](/Users/macos/Library/Application Support/typora-user-images/截屏2021-08-11 下午7.28.06.png)

```vue
<template>
  <div style="height: 100vh;width: 100%;display: flex">  <!-- 一个占满屏幕的flex布局的容器 --->
    <div id="menu" style="width: 250px;background-color: cadetblue">
      Menu
    </div>
    <div id="content" style="flex-grow: 1;background-color: aquamarine">
      Content
    </div>
  </div>
</template>

<style>
/*有些浏览器会自动给body加一个边距，我们这里去掉它*/
body {
  margin: 0;
}
</style>

```

接下来我们通过丰富这个页面的功能，来学习路由的使用。

---



## 2.1 入门

### 2.1.1 \<router-link>

用来跳转路由的超链接，不使用a标签是因为a标签会向后端请求，而我们是要将URL发给我们的单页应用来解析。

这不是唯一跳转路由的方式，也可以使用js代码来控制路由。

使用示例

```html
<router-link to="/">Link名称</router-link>
```

**props**

| key                | 说明                                                         |
| ------------------ | ------------------------------------------------------------ |
| to                 | 点击后转到的路由，可以是path(to="/") ,也可以是路由对象（:to="{name:'test'}"） |
| replace            | bool值。true表示调用 `router.replace()`，而不是 `router.push()`，所以导航后不会留下历史记录。 |
| active-class       | 链接激活时渲染\<a>的class                                    |
| custom             | bool值。true表示将内容包裹在\<a>中                           |
| aria-current-value | 当链接激活时，传递给属性 `aria-current` 的值。               |
| exact-active-class | 链接精准激活时，应用于渲染的 `<a>` 的 class。                |

[API 文档](https://next.router.vuejs.org/zh/api/#router-link-props)



### 2.1.2 \<router-view>

在路由变化时用来替换组件的地方。

**props**

| key  | 说明     |
| ---- | -------- |
| name | 命名视图 |

[API 文档](https://next.router.vuejs.org/zh/api/#router-view-props)



### 2.1.3 路由的匹配

* 定义的多个路由会按照从上往下的顺序尝试匹配，如果匹配成功则使用该路由的组件，否则继续向下匹配
* 路由以`/`开头，代表其是从根路由开始，是绝对路由，否则是相对路由

```javascript
//根路由
path:'/'
//任意路由，一般用在最后一个路由上，用来展示自定义的404页
path:'*'
//一般路由,
path:'/abc'
path:'/abc/def'
//动态路由
path:'/user/:id'
```

> 我们可以试着定义一个404路由，当路由没有命中时显示



### 2.1.4 不同的模式

前端路由有两种形式，没有优劣之分，可以根据需要自己选择

#### (1) Hash模式

hash 模式是用 `createWebHashHistory()` 创建的。

特点是URL中有个`#`，原理很简单：使用了URL中的`fragment（片段标识符）`，这个是用来标识页面中的次级资源，利用了它的特性：即更改#后面的内容不会引起页面请求

> 次级资源：不同的页面是主级资源，页面中不同的元素是次级资源

优点是实现简单。

缺点是对SEO不友好，并且太难看

> 似乎还不支持query参数，不过我没试过

#### (2) Histroy模式/历史模式/HTML5模式

用 `createWebHistory()` 创建 HTML5 模式，推荐使用这个模式

这个模式的URL很漂亮，和普通的URL没什么区别：https://example.com/user/id

不过这种方式需要你对服务器进行一点配置，否则会得到404。

它的原理是利用了HTML5提供的HistoryAPI，这个API允许代码修改访问历史（就是浏览器上前进后退的那个功能）。

优点是美观。

因为我喜欢这种方式，所以没有缺点。





## 2.2 路由的基本使用

> 这节需要掌握：
>
> 1. 命名路由
> 2. 使用router-link定义路由的跳转按钮
> 3. 使用router-view指定路由的渲染位置
> 4. 使用js代码来控制路由（编程式导航）

我们先来创建两个页面

Profile.vue

```vue
<template>
<!-- 我用不同颜色的边框来表示不同的组件，方便你观察 -->
  <div style="width: 100%; border: blueviolet solid 1px; color: blueviolet;padding: 5px">
    this is Profile.vue
  </div>
</template>
```

Account.vue

```vue
<template>
  <div style="width: 100%;color: darkred;border: darkred solid 1px;padding: 5px">
    this is Account.vue
  </div>
</template>
```

然后我们来定义两个基本的路由记录（RouterRecord）:

```javascript
routes: [
    {
        path: '/profile',   //路由的URL
        component: Profile  //路由对应的组件
    },
    {
      	name: 'myAccount'   //我们也可以给路由起一个唯一的名字，以后跳转的时候就不用写path了，更方便，这就是命名路由
        path: '/account',
        component: Account
    }
]
```

然后我们使用路由来访问这两个组件，有两种方式：一是使用router-link来控制路由跳转，一是使用js来控制路由跳转



### 2.2.1 使用\<router-link>来控制路由跳转

我们在`Menu`区域里面增加两个跳转路由的link

```html
<div id="menu" style="width: 250px;background-color: cadetblue">
  Menu
  <br/>
  <router-link to="/profile">Profile</router-link>
  <br/>
  <router-link :to="{name:'myAccount'}">Account</router-link>   <!-- 命名路由的使用 -->
</div>
```

> 如果路由定义了name属性，就可以使用命名路由的方式来访问，下面两种方式是等价的
>
> ```html
> <router-link to="/account">Account</router-link>
> ```
>
> ```html
> <router-link :to="{name:'myAccount'}">Account</router-link>   <!-- 命名路由的使用 -->
> ```

点击两个link，可以看到地址栏在变化，但是页面没动静，这是因为我们还没有给页面指定渲染位置

让我将页面渲染到页面上的`Content`区域

```html
<div id="content" style="flex-grow: 1;background-color: aquamarine">
  Content
  <router-view></router-view>
</div>
```

现在再点击Link就能看到Content区域的内容在实时变化了。



###　2.2.2 使用代码来控制路由跳转（组合式API）

如何在代码控制路由的跳转呢？我们把Menu里面的内容换成两个按钮

```html
<div id="menu" style="width: 250px;background-color: cadetblue">
  Menu
  <br/>
  <button @click="toProfile">Profile</button>
  <br/>
  <button @click="toAccount">Account</button>
</div>
```

在`setup`里定义`toProfile`和`toAccount`两个函数

```vue
<script>
import {useRouter} from "vue-router";

export default {
  setup() {
    const router = useRouter() 	//使用useRouter获得全局的router对象
    const toProfile = () => {
      router.push('/profile') 	//用router.push()来命令路由跳转
    }
    const toAccount = () => {
      router.push({name: 'myAccount'})  //可以使用命名路由
    }
    return {
      toProfile,
      toAccount
    }
  }
}
</script>
```

>同样的，对于命名路由，下面两种方式是等价的
>
>```javascript
>router.push({name: 'myAccount'})
>```
>
>```javascript
>router.push('/account')
>```



## 2.3 动态路由匹配

有时候我们需要将给定模式的路由全部匹配到一个组件上，就需要`动态路由匹配`。

我们来创建一个新的页面

User.vue

```vue
<template>
  This is User.vue.<br/>
  id is: {{ $route.params.id }}
</template>
```

然后定义一个动态路由

```javascript
{
    name: 'user',
    path: '/user/:id', // 这里使用:id 就是一个路径参数
    component: User
}
```

让我们试着访问

* /user
  * 无法命中，没有这样的路由
* /user/12
  * 命中，并且`$route.params.id`为`12`  
* /user/abc
  * 命中，并且`$route.params.id`为`abc`  



可以看到，在`/user/:id`处命中后，参数会传递给`$route.params`

**除此之外，也可以使用正则来更精细的定义路由**

| 说明         | 匹配模式                                                     | 匹配路径                                           | $route.params                                                |
| ------------ | ------------------------------------------------------------ | -------------------------------------------------- | ------------------------------------------------------------ |
| 路径参数     | /users/:username                                             | /users/eduardo                                     | `{ username: 'eduardo' }`                                    |
| 多个路径参数 | /users/:username/posts/:postId                               | /users/eduardo/posts/123                           | `{ username: 'eduardo', postId: '123' }`                     |
| 可选路径参数 | /user/:username?                                             | /users                                             | `{ username: ''}`                                            |
| 使用正则     | /users/:id(\\\d)<br/>/users/:id(\\\d+)?<br/>/users/:id(\\\d+)?<br/>/users/:id([A-Z]+) | /users/1<br/>/users/<br/>/users/123<br/>/users/ABC | `{ id: '1' }`<br/>`{ id: ''}`<br/>`{ id: '123' }`<br/>`{ id: 'ABC'}` |
| 可重复       | /:chapters+<br/>/:chapters*                                  | 匹配 /one, /one/two, /one/two/three, 等            | `{ chapters: ['one','two'] }`                                |

>需要留意
>
>* 正则可以与`可选`或`可重复`搭配使用
>* 正则需要**转义反斜杠**，\\\



## 2.4 命名路由

前面提到过，在定义路由的时候，定义一个唯一的name，就是命名路由。不再缀述。

建议你总是使用命名路由。

你可以定义一个公有的`enum`，并在定义路由和使用路由的时候，使用这个公有的`enum`来保证不会命名错误，这样在需要改名字的时候也方便。



## 2.5 重定向和别名

### 2.5.1 重定向

我们前面已经定义了两个路由：`/account`和`/profile`，现在我想让`/profile`是默认路由。

也就是当访问`/`时，页面重定向到`/profile`。让我们增加一个路由：

```javascript
{
    path: '/',
    redirect: '/profile'
},
```

现在当我们访问`/`时，页面自动重定向到了`/profile`。你可以看到连URL也发生了变化。

> 像其他使用router的地方一样，redirect也可以指定一个命名路由
>
> ```javascript
> {
>     path: '/',
>     redirect: { name: 'profile' }
> }
> ```
>
> 甚至可以是一个方法
>
> ```javascript
> {
>     path: '/',
>     redirect: to => {
>       // 方法接收目标路由作为参数
>       // return 重定向的字符串路径/路径对象
>       return { name: 'profile' }
>     },
>   },
> ```



### 2.5.2 别名

与重定向不同，使用别名可以让你访问的是`/`，得到的是`/profile`，而URL不会变化。

让我们删除刚才定义的`path: '/'`路由，转而给`/profile`定义一个别名

```javascript
{
    path: '/profile',    //路由的URL
    component: Profile,   //路由对应的组件
    alias: '/'
},
```

现在当我们访问`/`时，页面加载的是`/profile`。但是URL没有变化。

> 你可以为一个路由起多个别名
>
> ```javascript
> {
>     path: '/profile',    //路由的URL
>     component: Profile,   //路由对应的组件
>     alias: ['/','/abc']
> },
> ```

>需要注意的是，如果你的路由中有`路径参数`，那么你的别名也要有，定义要一样
>
>```javascript
>{
>    path: '/users/:id',
>    component: User,
>    alias: ['/:id','/abc/:id']
>}
>```



## 2.6 嵌套路由

现在我们的页面只有两个部分，路由也只有两个级别，下面我们来学习`嵌套路由`。

给Account.vue添加一个\<router-view>

```vue
<template>
  <div style="width: 100%;background-color: darkred">
    this is Account.vue
  </div>
  <router-view></router-view> <!-- 新增 -->
</template>
```

然后我们再定义两个页面/组件

Account_A.vue

```vue
<template>
  <div style="color: darkgoldenrod;border: darkgoldenrod solid 1px;padding: 5px">
    This is Account_A.vue
  </div>
</template>
```

Account_B.vue

```vue
<template>
  <div style="color: plum;border: plum solid 1px;padding: 5px">
    This is Account_B.vue
  </div>
</template>
```

然后更改路由设置

```javascript
{
    name: 'myAccount',     //我们也可以给路由起一个唯一的名字，以后跳转的时候就不用写path了
    path: '/account',
    component: Account,
    children: [   // 添加一个children数组，里面的每个元素都是一个路由。在里面被命中的路由会渲染到Account中的<router-view>里
        {path: "A", component: AccountA, name: 'account_a'},  //这里的一个路由与父级的类型是一样的，外面可以有的属性，里面也可以有
        {path: "B", component: AccountB, name: 'account_b'}
    ]
},
```

在App.vue的Menu中增加两个跳转按钮

```html
<br/>
<button @click="$router.push({name:'account_a'})">Account_A</button>
<br/>
<button @click="$router.push({name:'account_b'})">Account_B</button>
```

然后可以运行一下看看，当访问嵌套路由时，页面上只有一部分会变化，这就是嵌套路由。

>需要注意
>
>* 嵌套路由定义的`path`，不需要以`/`开头，它应当是一个相对路由
>
>* 可以将`path`定义为空字符串，来命中相对路由的根路由
>* 嵌套路由也是个完整的路由，前面我们学过的`路径参数`、`动态路由匹配`、`重定向`、`别名`都能在里面定义和使用
>* 嵌套路由也可以定义`children`数组来实现多层路由



## 2.7 命名视图

通过前面的学习，我们可以发现：路由只能命中一个同级的组件/页面。没关系，这已经能覆盖绝大多数的场景。

如果真的有个场景需要我们的路由同时命中多个组件/和页面，我们也可以通过将多个组件封装在一起的方式来实现。

emmm，能行是能行，就是凭空多了一个级别，不太美观。

其实我们有更优雅的方式——`命名视图`

我们将Menu和Content分别提出到单独的组件中

Menu.vue

```vue
<template>
  <div id="menu" style="width: 250px;background-color: cadetblue">
    Menu
    <br/>
    <button @click="toProfile">Profile</button>
    <br/>
    <button @click="toAccount">Account</button>
    <br/>
    <button @click="$router.push({name:'account_a'})">Account_A</button>
    <br/>
    <button @click="$router.push({name:'account_b'})">Account_B</button>
  </div>
</template>
<script>
import {useRouter} from "vue-router";

export default {
  setup() {
    const router = useRouter()              //使用useRouter获得全局的router对象
    const toProfile = () => {
      router.push('/profile')               //用router.push()来命令路由跳转
    }
    const toAccount = () => {
      router.push({name: 'myAccount'})      //可以使用命名路由
    }
    return {
      toProfile,
      toAccount
    }
  }
}
</script>
```

Content.vue

```vue
<template>
  <div id="content" style="flex-grow: 1;background-color: aquamarine">
    Content
    <router-view></router-view>
  </div>
</template>
```

然后更改一下App.vue

```vue
<template>
  <div style="height: 100vh;width: 100%;display: flex">  <!-- 一个占满屏幕的flex布局的容器 --->
    <!-- 将原来的两个div替换为了两个 <router-view>-->
    <router-view></router-view>
    <router-view name="other"></router-view>  <!-- 可以同时定义多个<router-view>,但是要给它们起不同的名字，没起的那个默认名称是default -->
  </div>
</template>

<style>
/*有些浏览器会自动给body加一个边距，我们这里去掉它*/
body {
  margin: 0;
}
</style>
```

然后添加一个命中多个组件的路由，我这里就用根路由了

```javascript
{
    path: '/',
    components: {
        default: Menu,
        other: Content
    }
},
```

现在当你访问`/`的时候，Menu和Content被同时命中了

> 需要注意
>
> `components`是复数，是对象
>
> 现在你访问其他路由应该是不好使了，因为其他路由用的是`components`，它只会命中`defalut`，想要好使，你需要重新调整其他路由，我这里只是demo
>
> * 可以让其他路由是`/`的子路由



## 2.8 总结一下

基础内容学完了，让我们回顾一下，顺便插入一些知识点：

定义**路由记录**时可用的属性

| item       | comment                                                      |
| ---------- | ------------------------------------------------------------ |
| path       | 记录的路径。应该以 `/` 开头，除非该记录是另一条记录的子记录。可以定义参数：`/users/:id` 匹配 `/users/1` 以及 `/users/posva` |
| redirect   | 重定向路径。指向另一个路由记录                               |
| children   | 当前记录的嵌套路由                                           |
| name       | 路由记录独一无二的名称                                       |
| alias      | 路由记录的别名                                               |
| component  | 路由命中后展示的组件                                         |
| components | 路由命中后展示的组件们                                       |

之后我们会学习其他几个路由记录可用的属性



# 3. 进阶

## 3.1 路由组件传参

每个路由的`component`都是一个组件，那么怎么给这个组件传值呢？

其实在前面我们已经接触了一种方式，就是使用路径参数，这个参数会自动的附加到`$route.params.xxx`上。

我们也可以借助路由对象里的`props`属性，更精细的控制它的行为。比如：

```javascript
{
    path: '/',
    component: Menu,
    props: true
},
```

根据`props`的取值不同和路由的不同，有多种模式，下面我们来一一介绍。



###　3.1.1 布尔模式

当`props`的值是`Bool`并且是`true`时，`route.params` 将被设置为组件的 props。

比如下面的情况：

```javascript
{
    name: 'user',
    path: '/user/:id([A-Z]+)',
    component: User,
    props: true
}
```

此时Vue会将`id`添加到我们的`props`中。（`route.params`依然可以使用）



### 3.1.2 对象模式

当`props`是一个对象时，Vue将原样设置为组件的`props`。比如

```javascript
{
    name: 'user',
    path: '/user/:id([A-Z]+)',
    component: User,
    props: {
        abc: 'abc123',
          xyz:'z'
    }
}
```

此时，在User组件中使用`props.abc`可以得到`"abc123"`。



### 3.1.3 函数模式

有时候，你需要根据当前的路由对组件的`props`进行调整，这时你可以将prop定义为函数。

函数的参数是当前的路由对象，函数的返回值将会是组件的`props`。比如

```javascript
{
    name: 'user',
    path: '/user/:id([A-Z]+)',
    component: User,
    props: (route) => {
        return {
            value: `ID is ${route.params.id}`
        }
    }
}
```



### 3.1.4 在命名视图中使用

如果我们的路由包含命名视图（有多个组件），那么我们需要为每个视图指定`props`配置。

```javascript
{
    path: '/',
    components: {
        default: Menu,
        other: Content
    },
    props: {
        default: true,
        other: true
    }
}
```



## 3.2 路由元信息

我们已经学习了好几个不同含义的路由记录的属性。在真正使用中这些属性是不够的，需要我们扩充**路由记录**

假设一个场景：我们的网站有很多个路由，有些路由不需要登录就能访问，有些则必须要登录后访问。

> 这里假设你知道路由有拦截器

我们需要在用户访问每个路由的时候，在拦截器里判断允不允许访问，允许就放行，否则就拦截。

假设路由如下：

```javascript
{
    // 任何人都能访问
    path: '/',
    component: Home,
    name: 'home'
},
{
    // 只有经过身份验证的用户才能访问
    path: '/account',
    component: Account,
    name: 'account'
}
```

那么拦截器要这样定义

```javascript
router.beforeEach((to, from) => {//from to 代表访问的前一个页面和要访问的页面
    if (to.name === 'account' && isLogined() === false) {
        // 不允许访问，重定向到/
        return {
            path: '/'
        }
    }
})
```

这样可以实现需求，但是如果路由记录有变化，拦截器就要改动，而且一个路由记录就要有一个判断，太麻烦了。有没有更好的变法呢？



当然有，我们可以使用路由记录中`meta`属性。

```javascript
{
    path: 'new',
        component: PostsNew,
    // 只有经过身份验证的用户才能访问
    meta: { requiresAuth: true } // 定义该访问路由需不需要登录
},
{
    path: ':id',
        component: PostsDetail
    // 任何人都可以访问
    meta: { requiresAuth: false }
}
```

然后Vue会把`meta`中的信息原封不动的放在`route.meta.xx`中，我们可以在拦截器中得到它

```javascript
router.beforeEach((to, from) => {
    // 不用去检查每条路由记录
    if (to.meta.requiresAuth && !auth.isLoggedIn()) { 
        // 此路由需要授权，请检查是否已登录
        // 如果没有，则重定向到登录页面
        return {
            path: '/'
        }
    }
})
```

现在如果路由记录发生变化或者增减，就不用再更改拦截器了。

> 需要注意
>
> 元信息的特点是：定义在元信息的内容，可以在任何使用route的地方得到
>
> 这里只是元信息的一个典型用法，你可以在任何需要的场景使用它。



## 3.3 导航守位          \*重点\*

上节我们提到的拦截器，它的官方名称是`导航守卫`，名字很形象。

根据守卫的位置，我们可以分为：

* 全局守卫：任何路由的改变都会调用
* 路由守卫：定义在某个路由上，只有该路由被命中时调用
* 组件守卫：定于在某个组件上，只有该组件被使用时调用

每个位置又根据调用时机不同分为前、中、后（粗略划分）



### 3.3.1 全局守卫

根据调用的时机，可以分为

* 全局前置守卫
* 全局解析守卫
* 全局后置钩子



### （1） 全局前置守卫

你可以使用 `router.beforeEach` 注册一个全局前置守卫：

```javascript
const router = createRouter({ ... })

router.beforeEach((to, from) => {
  // ...
  // 返回 false 以取消导航
  return false
})
```

当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于**等待中**。

回调函数有两个参数

* **`to`**: 即将要进入的目标
* **`from`**: 当前导航正要离开的路由

可以返回的值如下:

- `false`: 取消当前的导航。如果浏览器的 URL 改变了(可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。
- 一个[路由地址](https://next.router.vuejs.org/zh/api/#routelocationraw): 通过一个路由地址跳转到一个不同的地址，就像你调用 [`router.push()`](https://next.router.vuejs.org/zh/api/#push) 一样，你可以设置诸如 `replace: true` 或 `name: 'home'` 之类的配置。当前的导航被中断，然后进行一个新的导航，就和 `from` 一样。

> 如果你查资料，会告诉你还有第三个参数`next`，请不用使用，现在是不推荐的，因为容易导致遗漏

上面的未登录不允许访问就是一个很好的前置路由的例子，这里我写一个简单的Demo

```
router.beforeEach((to, from) => {
    if (from.path === '/profile' && to.name === 'myAccount') {
        return false
    }
})
```

试试看，现在不能从`profile`到`account`了，但是可以到account的子路由。



### （2） 全局解析守卫

这个守卫的用法和含义与`全局前置守卫`一样。也能取消路由。

唯一的区别是时机不同，它在所有路由内的守卫和异步的路由都完事之后调用。

后面介绍路由守卫的解析流程时可以看到不同。

示例：

```javascript
router.beforeResolve((to, from) => {
    if (from.path === '/profile' && to.name === 'myAccount') {
        return false
    }
})
```



### （3） 全局后置钩子

需要注意的是，这个钩子不是在路由离开时的钩子，而是在路由被确认后的钩子，此时页面DOM未更新。

你可以在这时候可以做一些更改标题，更改主题，更改图标之类的操作。

路由已经被确认了，所以在这个时候return是没意义的，你return啥也不好使了

用法没有什么特殊之处：

```javascript
router.afterEach((to, from) => {
    if (from.path === '/profile' && to.name === 'myAccount') {
        document.title = '从Profile到Account'
    } else {
        document.title = ''
    }
})
```



### 3.3.2 路由守卫

**`路由守卫`**顾名思义就是给某个路由设置的守位。用法是在`路由记录`上定义`beforeEnter`。

它只有一个前置守卫。

参数和用法与全局前置守卫一模一样，只是它只会在该路由被命中时调用（to永远是它自己）

例如：

```javascript
{
    name: 'user',
    path: '/user/:id([A-Z]+)',
    component: User,
    beforeEnter: (to, from) => {
        console.log(to)
    }
}
```

> 需要注意
>
> `beforeEnter` 守卫 **只在进入路由时触发**，不会在 `params`、`query` 或 `hash` 改变时触发。例如，从 `/users/2` 进入到 `/users/3` 或者从 `/users/2#info` 进入到 `/users/2#projects`。它们只有在 **从一个不同的** 路由导航时，才会被触发。

你也可以将一个函数数组传递给 `beforeEnter`，这在为不同的路由重用守卫时很有用：

```javascript
function removeQueryParams(to) {
  if (Object.keys(to.query).length)
    return { path: to.path, query: {}, hash: to.hash }
}

function removeHash(to) {
  if (to.hash) return { path: to.path, query: to.query, hash: '' }
}

const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: [removeQueryParams, removeHash],
  },
  {
    path: '/about',
    component: UserDetails,
    beforeEnter: [removeQueryParams],
  },
]
```



### 3.3.3 组件内守卫

你也可以在路由组件内直接定义路由导航守卫(传递给路由配置的)

它也按时机分为三个不同的守卫

* beforeRouteEnter         渲染组件时
* beforeRouteUpdate     复用组件时
* beforeRouteLeave        离开组件时

> 这里是选项式API

```javascript
const UserDetails = {
  template: `...`,
  beforeRouteEnter(to, from) {
    // 在渲染该组件的对应路由被验证前调用
    // 不能获取组件实例 `this` ！
    // 因为当守卫执行时，组件实例还没被创建！
  },
  beforeRouteUpdate(to, from) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，
    // 由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from) {
    // 在导航离开渲染该组件的对应路由时调用
    // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
  },
}
```

> 这里是组合式API

```java
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
export default {
  setup() {
    onBeforeRouteLeave((to, from) => {
      //......
    })

    const userData = ref()

    onBeforeRouteUpdate(async (to, from) => {
      //......
    })
  },
}
```

> 需要注意
>
> * 在组合式API中没有this一说，所以都不能访问this
>
> * 在组合式API中没有beforeRouteEnter，因为它是在create生命周期执行，setup也是在这一周期，所以要它没必要





### 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用 `beforeRouteLeave` 守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫(2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫(2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。



## 3.4 过渡动效

自学：

[过渡动效](https://next.router.vuejs.org/zh/guide/advanced/transitions.html#%E8%BF%87%E6%B8%A1%E5%8A%A8%E6%95%88)



## 3.5 滚动行为

自学：

[滚动行为](https://next.router.vuejs.org/zh/guide/advanced/scroll-behavior.html#%E6%BB%9A%E5%8A%A8%E8%A1%8C%E4%B8%BA)

