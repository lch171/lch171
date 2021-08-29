<template>
  <el-container class="container">
    <el-header>
      <el-avatar icon="el-icon-user-solid"></el-avatar>
      {{$store.state.staff.STF_CARD}}
      {{$store.state.staff.STF_NAME}}
      </el-header>
    <el-container>
      <el-aside>
        <el-menu>
          <el-menu-item v-for="(row, index) in varAppMenuList" :key="index" @click="handleClick(row)">
            {{ row.MenuName }}
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <div class="maindiv">
            <router-view></router-view>
          </div>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import evalualist from '../components/evalualist.vue'
import evaluaothers from '../components/evaluaothers.vue'
import evalechart from '../components/evalechart.vue'
import staffAnsInfo from '../components/staffAnsInfo.vue'
import { Router, useRouter } from 'vue-router'
import { Options, Vue } from 'vue-class-component'
import { HttpInterceptorService } from '@/common/Services/request'
import { CommonUtil } from '@/common/Utils/Common'
import { Common } from '@/common/Const/common'
import { ResultObject } from '@/common/Entity/ResultObjects'
import { AppMenu } from '@/common/Entity/Main/AppMenu'

@Options({
  name: 'mainview',
  props: {
    inworklist: Array
  },
  components: {
    evalualist,
    evaluaothers,
    evalechart,
    staffAnsInfo
  }
})
export default class mainview extends Vue {
  inworklist!: Array<any>
  $https!: HttpInterceptorService
  $CommonUtil!: CommonUtil
  $message: any

  varAppMenuList: Array<AppMenu>=[]
  private router: Router = useRouter()

  created () : void {
    this.$https.post('/api/Main/GetMenuList', this.$store.state.staff).then((res: any) => {
      this.GetMenuInfo(res)
    }).catch(
      (error: any) => {
        this.$message.error(Common.CONNECTION_FAIL)
        console.log(error)
      }
    )
  }

  GetMenuInfo (event: any): void {
    if (event.data.Code !== Common.RESULT_SUCCESS) {
      this.$message.error(event.data.Message)
      return
    }

    const res: ResultObject<AppMenu> = this.$CommonUtil.ResultObjectToEntity(event.data, AppMenu)
    const AppMenuList: AppMenu[] = JSON.parse(JSON.stringify(res.Results))
    this.varAppMenuList = AppMenuList
  }

  handleClick (row: AppMenu): void {
    if (row.MenuId === 1) {
      this.router.push('/mainview/evalualist')
    } else if (row.MenuId === 2) {
      this.router.push('/mainview/evalechart')
    } else if (row.MenuId === 3) {
      this.router.push('/mainview/staffAnsInfo')
    } else {
      this.router.push('/mainview/evaluaothers')
    }
  }
}

</script>

<style scoped>
.container{
  height: 100%;
}

.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
}

.el-aside {
  width: 200px !important;
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  padding: 15px;
  line-height: unset;
}
.maindiv{
  height: 100%;
  background-color: #FFF;
}
</style>
