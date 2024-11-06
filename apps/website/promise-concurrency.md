---
layout: doc
---

<script setup lang="ts">
import { defineClientComponent } from 'vitepress'
const ShikiCode = defineClientComponent(() => {
  return import('./components/ShikiCode.vue')
})
import axios from 'axios'
import { ref } from 'vue'

const allRes = ref([])
const allSettledRes = ref([])

function emitResolve (timeout:number){
  return axios.post('/api/resolve', { timeout }).then(res=>res.data)
}

function emitReject (timeout:number){
  return axios.post('/api/reject', { timeout }).then(res=>res.data)
}

async function all() {
  try {
    allRes.value = await Promise.all([
      emitResolve(100),
      emitResolve(200),
      emitResolve(300)
    ])
  }
  catch (err) {
    allRes.value = [err]
  }
}

async function allSettled(){
  try {
    allSettledRes.value = await Promise.allSettled([
      emitResolve(100),
      emitResolve(200),
      emitResolve(300)
    ])
  }
  catch (err) {
    allSettledRes.value = [err]
  }
}
</script>

# promise 并发

## [Promise.all()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

`Promise.all()` 静态方法接受一个 Promise 可迭代对象作为输入，并返回一个 Promise。当所有输入的 Promise 都被兑现时，返回的 Promise 也将被兑现（即使传入的是一个空的可迭代对象），并返回一个包含所有兑现值的数组。如果输入的任何 Promise 被拒绝，则返回的 Promise 将被拒绝，并带有第一个被拒绝的原因。

<button @click="all">emit</button>

<ShikiCode :code="JSON.stringify(allRes,null,2)" lang="json"></ShikiCode>

<ShikiCode :code="all.toString()"></ShikiCode>

## [Promise.allSettled()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)

Promise.allSettled() 静态方法将一个 Promise 可迭代对象作为输入，并返回一个单独的 Promise。当所有输入的 Promise 都已敲定时（包括传入空的可迭代对象时），返回的 Promise 将被兑现，并带有描述每个 Promise 结果的对象数组。

<button @click="allSettled">emit</button>

<ShikiCode :code="JSON.stringify(allSettledRes,null,2)" lang="json"></ShikiCode>

<ShikiCode :code="allSettled.toString()"></ShikiCode>

<!-- ```jsonc-vue
{{JSON.stringify(allSettledRes,null,2)}}
``` -->

<!-- ::: details 代码块 -->
<!--
```ts-vue
{{allSettled.toString()}}
``` -->

<!-- ::: -->

<!-- ```jsonc-vue
{{JSON.stringify(allRes,null,2)}}
``` -->

<!-- ::: details 代码块 -->

<!-- ```ts-vue
{{all.toString()}}
``` -->

<!-- ::: -->
