<template>
  <div class="problem">
    <div class="d1" v-if="question.QUESTION_TYP === '0'">
      <div class="field">
        <span class="req">*</span>
        <span>{{ question.QUESTION_NM }}</span>
        <span class="anscss">【单选题】</span>
      </div>
      <div class="op">
        <el-radio-group v-model="question.AnsSelect" @change="rideochange">
          <div v-for="option in question.OptionsList" :key="option.OPTIONS_NO">
            <el-radio :label="option.OPTIONS_NO">
              {{ option.OPTIONS_NM }}
            </el-radio>
          </div>
        </el-radio-group>
      </div>
    </div>
    <div class="d2" v-if="question.QUESTION_TYP == '1'">
      <div class="field">
        <span class="req">*</span>
        <span>{{ question.QUESTION_NM }}</span>
        <span class="anscss">【多选题】</span>
      </div>
      <div class="op">
        <el-checkbox-group v-model="question.AnsSelectList" @change="checkboxchange">
          <div v-for="option in question.OptionsList" :key="option.OPTIONS_NO">
            <el-checkbox :label="option.OPTIONS_NO">
              {{ option.OPTIONS_NM }}
            </el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
    </div>
    <div class="d3" v-if="question.QUESTION_TYP == '2'">
      <div class="field">
        <span class="req">*</span>
        <span>{{ question.QUESTION_NM }}</span>
        <span class="anscss">【选分题】</span>
      </div>
      <div class="op">
        <div v-for="(option) in question.OptionsList" :key="option.OPTIONS_NO">
          <div class="selectscore">
            <div class="w80">
              {{ option.OPTIONS_NM }}
            </div>
            <el-slider
              class="slider"
              v-model="option.AnsOptionScore"
              show-stops
              show-input
              input-size="large"
              @change="sliderchange(option)"
              :max="maxscore">
            </el-slider>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { EvaluateOptions } from '@/common/Entity/Evaluate/EvaluateOptions'
import { EvaluateQuestion } from '@/common/Entity/Evaluate/EvaluateQuestion'
import { Options, Vue } from 'vue-class-component'

@Options({
  name: 'problem',
  props: {
    inquestion: Object
  },
  components: {
  },
  watch: {
    inquestion (curVal: EvaluateQuestion, oldVal: EvaluateQuestion) {
      if (curVal) {
        this.question = curVal
      }
    }
  }
})
export default class problem extends Vue {
  inquestion!: EvaluateQuestion
  $message: any

  public question: EvaluateQuestion = new EvaluateQuestion()
  public maxscore = 10

  created () : void {
    this.question = this.inquestion
  }

  rideochange ():void {
    // console.log(this.question.select)
  }

  checkboxchange ():void {
    // console.log(this.question.AnsSelectList)
  }

  sliderchange (option: EvaluateOptions):void {
    let sumvalue = 0
    this.question.OptionsList.forEach((element: EvaluateOptions) => {
      sumvalue += element.AnsOptionScore
    })
    const overvalue = sumvalue - this.maxscore
    if (overvalue > 0) {
      this.$message({
        message: '警告:每道题的总分为' + this.maxscore,
        type: 'warning'
      })
      if (option.AnsOptionScore >= overvalue) {
        option.AnsOptionScore -= overvalue
      } else {
        option.AnsOptionScore = 0
      }
    }
  }
}
</script>

<style scoped>
.problem{
  margin: 0;
  padding: 10px;
  font-size: 14px;
  flex: 1;
}
.el-radio{
  margin-bottom: 10px;
}
.el-checkbox {
  margin-bottom: 10px;
}
.selectscore {
  margin-bottom: 10px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.field {
  position: relative;
  font-size: 20px;
  font-weight: bold;
  padding: 0 0 8px 0;
  display: block;
  text-align: left;
  color: #646566;
}
.req {
  color: red;
  margin: 2px 5px 0 2px;
}
.anscss {
  font-weight: normal;
  color: #999;
}
.op {
  padding: 0px 10px;
}
.w80{
  width: 120px;
}
.slider{
  width: 500px;
}
</style>
