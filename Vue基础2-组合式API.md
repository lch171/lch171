# 组合式API

通过这些入门，你应该深刻的理解了这种写法为何叫**`选项式`**API。

> Vue给你提供了一个对象的模板，用来描述组件。你用这个对象来描述你的自己的组件，在对象中你需要什么属性就添加什么属性。要data就添加data属性，要methods就添加methods属性。

很容易对吧，但你仔细想想，这种API有很多缺点：

* 我可以复用组件，但是不能复用逻辑。比如：定义v-model需要使用data和prop和emit。抽不出公共方法。
* 一个处理流程可能在data、侦听器、计算属性、methods之间跳来跳去，而且可能杂揉业务逻辑和UI逻辑。
* 组件越来越大，代码越来越长，逻辑越来越跳跃，维护的噩梦

[你可以看这个例子](https://v3.cn.vuejs.org/guide/composition-api-introduction.html#%E4%BB%80%E4%B9%88%E6%98%AF%E7%BB%84%E5%90%88%E5%BC%8F-api)



总之，使用选项式API做大项目将会非常难，这时候就应该使用**`组合式API`**

* 组合式API大量的使用了Hook（是的这是React概念，Vue里似乎没有特殊的名字）

* 选项式API的代码定义顺序和执行顺序是乱的

  * 比如你的处理流程是：`watch检测到响应`->`修改某个data`->`影响计算属性`->`进而影响页面`，那为了实现逻辑，你的代码会变成：

    ```vue
    <script>
    	export default {
            data(){
                return {
                    A:''   // A流程需要使用的属性【2】
                    B:''   // B流程需要使用的属性
                }
            },
            watch:{
                AWatch(){
                    // A流程需要使用的侦听器【1】
                },
                BWatch(){
                    // B流程需要使用的侦听器
                }
            },
            computed:{
                AComputed:{
                    // A流程需要使用的计算属性【3】
    			},
                BComputed:{
                    // B流程需要使用的计算属性
    			},
    		}
        }
    </script>
    ```

    【】内为执行顺序

  * 一点儿也不内聚，如果同时管理多个状态，那代码更乱了。

* 组合式API（React的Hook也同理）是改变了逻辑定义的顺序

  * 实现上面的逻辑你可以写成：

    ```vue
    <script>
    	export default {
            setup(){
                // A流程
                const A = ref('') // A流程需要使用的属性【2】
                const AComputed = computed(()=>{
                    // A流程需要使用的计算属性【3】
                })
                const AWatch = watch(A,()=>{
                    // A流程需要使用的侦听器【1】
                })
                
                
                // B流程
                const B = ref('') // B流程需要使用的属性
                const BComputed = computed(()=>{
                    // B流程需要使用的计算属性
                })
                const BWatch = watch(B,()=>{
                    // A流程需要使用的侦听器
                })
            }
        }
    </script>
    ```

    没有改变执行顺序，但是代码是不是更清晰了呢。

* 组合式API使用箭头函数，也就是说他是没有this的。那么我们就可以将代码定义在Vue组件外。

  ```js
  //xxx.js  一个普通的js文件
  // 定义了一个加法器,每次加到5就归零
  function AddJiaFaQi(){
  	const count = ref(0)
      const countWatch = watch(count,(val)=>{
          if(count.value >= 5){
           	count.value = 0
          }
      })
      return {
          count,
          countWatch
      }
  }
  ```

  ```vue
  <script>
  export defalut{
      setup(){
          const {count,countWatch} = AddJiaFaQi()  // 使用了外部定义的data和watch，我们可以复用这些逻辑了！
      }
  }
  </script>
  ```

 

现在我们知道了为何要使用组合式API。接下来我们来学习如何使用组合式API。

# setup

对于选项式API的各个选项，前面已经介绍了很多，这里再介绍一个**`setup`**选项。

* setup是一个函数
* 它有两个参数：
  * props: 对应选项式API中的props
  * context: 一个javascript对象，里面有一些常用API
* 它的返回值是一个对象，对象中返回的property可以被template使用
* 它也可以返回渲染函数，这里暂且按下不表

## props 参数

看下面的例子：

```vue
<template>
  <button @click="sayhello">sayhello</button>
  <br/>
  <span style="color: blue">Hi {{ name }}</span>
</template>
<script>
export default {
  props: {
    name:{
      type:String,
      required:true
    }
  },
  emits: ['sayHello'],
  setup(props) {

    const sayhello = () => {
      alert("My name is: " + props.name)
    }

    return {
      sayhello
    }
  }
}
</script>
```





## context 参数

**context** 中是几个API，可以用console.log打印出来：

- attrs: 属性
- slots: 插槽
- emit: 方法

**context** 不是响应式的，所以可以解构（一般也这么用）

```javascript
export default {
  setup(props, { attrs, slots, emit }) {
    ...
  }
}
```



[Vue3 setup 文档](https://v3.cn.vuejs.org/guide/composition-api-setup.html#%E5%8F%82%E6%95%B0)

---

介绍完两个参数，我们再来看看 **setup** 的特点。

* 没有this（其实有，但不是我们期望的组件实例）
* 所有template要使用的属性/方法都必须return出来
* setup执行时，组件实例未创建（还在create的生命周期），所以setup里不能使用：**data**、**computed**、**methods**等API。
  * 推荐将所有选项API都写在setup里，除非不支持



# Refs

**data** 选项的作用是定义可以被Vue响应式跟踪的变量。但是它不能在 **setup** 中使用，为此要使用 **Refs**。

```typescript
ref:(value:T = any)=>toRef<T>
```

看一个例子

```javascript
export default {
    data(){
        return {
            name :'李四'
        }
    }
}
```

在组合式API中这样写：

```vue
<template>
	{{name}}
</template>
<script>
export default {
    setup(){
        const name = ref('李四') // 使用ref函数来定义一个响应式变量,参数是初始值
        
       	console.log(name.value) //使用时需要.value。 之所以封装起来，是为了响应式
        
        return{
            name // 需要在template中使用的响应式变量，必须通过setup返回，在template中使用时已经拆箱，无需.value
        }
    }
}
</script>
```



**Refs** 还有很多API，就不介绍了，看下面的链接

[Vue3 Refs 文档](https://v3.cn.vuejs.org/api/refs-api.html#refs)



# 生命周期钩子

在setup中可以定义生命周期钩子，用法是：在生命周期钩子前加**on**，不过并不是所有生命周期都可以使用：

| 选项式 API        | Hook inside `setup`                                          |
| ----------------- | ------------------------------------------------------------ |
| `beforeCreate`    | No needed* 不需要是因为setup本来就在这个阶段执行，如果要使用这个钩子，那直接写在setup里就行 |
| `created`         | No needed* 同上                                              |
| `beforeMount`     | `onBeforeMount`                                              |
| `mounted`         | `onMounted`                                                  |
| `beforeUpdate`    | `onBeforeUpdate`                                             |
| `updated`         | `onUpdated`                                                  |
| `beforeUnmount`   | `onBeforeUnmount`                                            |
| `unmounted`       | `onUnmounted`                                                |
| `errorCaptured`   | `onErrorCaptured`                                            |
| `renderTracked`   | `onRenderTracked`                                            |
| `renderTriggered` | `onRenderTriggered`                                          |
| `activated`       | `onActivated`                                                |
| `deactivated`     | `onDeactivated`                                              |

看个例子：

```javascript
export default{
    mounted(){
        console.log("mounted阶段到了！")
    }
}
```

在组合式API中这样写：

```javascript
export default{
    setup(){
        onMounted(()=>{
            console.log("mounted阶段到了1！")
        })
        
        onMounted(()=>{
            console.log("mounted阶段到了2！")
        })
        
    }
}
```

* 生命周期钩子接受一个函数参数，这个函数会在对应阶段执行
* 如同上面的例子，你可以同时定义多个生命周期，多个Flow的逻辑就能解耦了





# 计算属性

**computed** 像data一样也不能在setup中使用，需要使用另外的API。

```typescript
computed:(fun:()=>(T = any))=>toRef<T>
```



看下面的例子

```javascript
export default {
    data(){
      return {
          x:10,
          y:20
      }  
    },
    computed:{
        count(){
         return this.x+this.y   
        }
	}
}
```

在组合式API中这样写：

```javascript
export default {
    setup(){
        const x = ref(10)
        const y = ref(20)
        const count = computed(()=>x.value+y.value) // computed接受一个函数，函数返回值就是计算的值。因为没有this,所以我们可以用箭头函数
        
        console.log(count.value) // 同ref，需要.value
        return {
            count   // 同ref,在template中使用需要return, 同时在template中也不需要.value
        }
    }
}
```



# 侦听器

有两个侦听器，我们可以根据具体场景选择：

## watch

行为与选项式API的watch完全一致。

```typescript
watch:(source:T extends Object, cb:(val?:T, oldval?:T)=>void, options?:{immediate?:boolean,deep?:boolean,flush:'' ...}) => Function
```



看下面的例子

```javascript
export default {
    watch:{
        name(){//名字就是侦听源
            ...
        }
    }
}
```

在组合式API中这样用：

```javascript
export default {
    setup(){
        
       const namewatch = watch(
            name,//侦听源
            ()=>{ //回调函数
            	...
        	},
        	{
            ... 	// 侦听器参数，参数一样是immediate和deep两个
        }) 
        
       namewatch() // watch的返回值是一个函数，调用这个函数可以结束侦听 
        
    }
}
```

### 侦听单个数据源

```javascript
watch(()=>xxx,()=>{....}) //数据源可以是个getter

const a = ref(0)
watch(a,()=>{...})//数据源可以是响应式对象
```

### 侦听多个数据源

```javascript
watch([source1,source2,source3],()=>{...})  //要侦听多个数据源，直接给数组就行
```

### 清理副作用

watch函数回调参数除了会提供新值和旧值，还会提供一个onInvalidate函数。

这个函数的使用场景：

* 在侦听器里面有异步（调用后端API），但是异步没执行完侦听器就被干掉了（手动取消侦听或切换页面了组件被删除）

```javascript
watch(xxx, (val, oldval, onInvalidate) => {
  const token = performAsyncOperation(id.value) //调用后端API的
  onInvalidate(() => {
    // id被更改或侦听器被干掉时,使先前挂起的异步操作无效，以免Promise的then被执行而影响到其他响应式变量
    token.cancel()
  })
})
```



### 副作用刷新时机

watch的回调函数会在数据源更新后执行，它的执行时机是可选的，可以通过**flush**选项来控制

* `pre` ：（默认） 在`update`执行前执行
* `post`：在`update`执行后执行
* `sync`：强制同步执行，效率低下，不常用，除非对时效有要求

来看个例子

```vue
<template>
  <button @click="plus">plus</button>
  {{ times }}
</template>
<script>
import {defineComponent, watch, ref, onUpdated, onBeforeUpdate} from "vue";

export default defineComponent({
  setup(props, context) {
    const times = ref(0)
    const plus = () => {
      times.value++
      console.log("click")
    }

    onBeforeUpdate(() => {
      console.log("beforeUpdate")
    })

    onUpdated(() => {
      console.log("updated")
    })

    watch(times, () => {
      console.log("pre")
    }, {
      flush: 'pre'
    })

    watch(times, () => {
      console.log("sync")
    }, {
      flush: 'sync'
    })

    watch(times, () => {
      console.log("post")
    }, {
      flush: 'post'
    })

    return {
      plus,
      times
    }
  }
})
</script>
```

你能列出它们的打印结果吗？



### 侦听器调试

不做重点，参考官网



## watchEffect

与watch不同，它会自动追踪依赖，并在依赖变化时执行回调。

```typescript
watchEffect(()=>{}, options?:{flush?:'pre' | 'post' | 'sync', onTrack?:(x)=>{}, onTrigger?:(x)=>{} }): Function
```

用法：

```javascript
export default{
    setup(){
        const x = ref(0)
        const y = ref(0)
        
       const stop =  watchEffect(()={ // 不用指定数据源，它会自己跟踪依赖
            y.value = x.value * 2
        })
       
       stop() //和watch一样，它也返回一个回调用于停止侦听
    }
}
```

### 清理副作用

同`watch`

### 副作用刷新时机

同watch

### 侦听器调试

同watch



## watch与watchEffect比较

||watch|watchEffect|
|----|:--:|:--:|
|数据源|显式的指定数据源，可以具体的说明哪些情况触发侦听器|自动跟踪响应式数据源，所有被跟踪的数据源更新都会触发|
|侦听回调|可以获得数据源变化前后的值|只知道数据源变化了|
|参数选项|所有参数都可使用|没有`deep`和`immediate`|



