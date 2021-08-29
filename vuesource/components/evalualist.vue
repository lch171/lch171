<template>
<div class="evalualist">
  <el-table
    v-if="showflg"
    :data="evalualist"
    border
    style="width: 100%">
    <el-table-column
      property="evaluaid"
      label="序号"
      width="50">
    </el-table-column>
    <el-table-column
      property="evaluaname"
      label="考试名称"
      width="300">
    </el-table-column>
    <el-table-column
      label="操作"
      width="100">
      <template v-slot="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">开始考试</el-button>
      </template>
    </el-table-column>
  </el-table>
  <problemlist v-if="!showflg" @backchange='viewback' :inevaluateNo="evaluaid"></problemlist>
</div>
</template>

<script lang="ts">

import problemlist from '../components/problemlist.vue'
import { Options, Vue } from 'vue-class-component'

@Options({
  name: 'evalualist',
  props: {
  },
  components: {
    problemlist
  }
})

export default class evalualist extends Vue {
  // inevalualist!: Array<any>

  evalualist: Array<any> = [{
    evaluaid: '1',
    evaluaname: 'TEST自我评价'
  }, {
    evaluaid: '2',
    evaluaname: '团队角色自测问卷'
  }]

  public showflg = true
  public evaluaid : string = this.evalualist[0].evaluaid

  handleClick (row: any): any {
    this.showflg = false
    this.evaluaid = row.evaluaid
  }

  viewback ():void {
    this.showflg = true
  }
}
</script>

<style scoped>
.evalualist{
  height: 100%;
}
</style>
