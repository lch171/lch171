<template>
<div>
  <button @click="submit2()">tttttttt</button>
</div>
</template>

<script lang="ts">

import { Options, Vue } from 'vue-class-component'
@Options({
  props: {
    msg: String
  }
})
export default class HelloWorld extends Vue {
  msg!: string
  $axios: any
  $https: any
  $http1: any
  $http2: any

  // submittt (): void {
  //   this.$axios({
  //     url: 'https://localhost:5001/api/Values/getvalue',
  //     method: 'get'
  //   }).then((res: any) => {
  //     return res.data
  //   }, (err: any) => {
  //     console.log(err)
  //   })
  // }

  // submittts (): void {
  //   this.$https.get('/api/Values/getvalue', null).then((res: any) => {
  //     console.log('submittt')
  //     console.log(res)
  //   })
  // }

  // submit1 (): void {
  //   this.$http1.get('/api/Values/getvalues', null).then((res: any) => {
  //     console.log('submittt')
  //     console.log(res)
  //   })
  // }

  submit2 (): void {
    this.$https.get('/api/Values/getvalue', null).then((res: any) => {
      console.log('submittt')
      console.log(res)
    }).catch(
      (error: any) => {
        console.log(error)
      }
    )
  }
}
</script>
