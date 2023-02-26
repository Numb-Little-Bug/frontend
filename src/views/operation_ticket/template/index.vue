<template>
  <PageWrapper title="添加操作设备">
    <div class="step-form-form">
      <a-steps :current="current">
        <a-step title="设置设备操作项目" />
        <a-step title="设置项目业务" />
        <a-step title="确认设备信息" />
        <a-step title="完成" />
      </a-steps>
    </div>
    <div class="mt-5">
      <Step1 @next="handleStep1Next" v-show="current === 0" />
      <Step2
        @prev="handleStepPrev"
        @next="handleStep2Next"
        v-show="current === 1"
        v-if="initSetp2"
        :values="step1_Values"
        :schema="step1_Schema"
      />
      <Step3
        @prev="handleStepPrev"
        @next="handleStep3Next"
        v-show="current === 2"
        v-if="initSetp3"
        :values="step2_Values"
      />
      <Step4 v-show="current === 3" @redo="handleRedo" v-if="initSetp4" />
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, toRefs } from 'vue'
  import Step1 from './Step1.vue'
  import Step2 from './Step2.vue'
  import Step3 from './Step3.vue'
  import Step4 from './Step4.vue'
  import { PageWrapper } from '/@/components/Page'
  import { Steps } from 'ant-design-vue'
  import { FormSchema } from '/@/components/Table'

  export default defineComponent({
    name: 'FormStepPage',
    components: {
      Step1,
      Step2,
      Step3,
      Step4,
      PageWrapper,
      [Steps.name]: Steps,
      [Steps.Step.name]: Steps.Step,
    },
    onMounted() {
      console.log('onMounted')
    },
    setup() {
      const current = ref(0)

      const state = reactive({
        initSetp2: false,
        initSetp3: false,
        initSetp4: false,
      })

      const step1_Values = ref({})
      const step2_Values = ref({})
      const step1_Schema = ref([])
      function handleStep1Next(step1Values: any) {
        step1_Values.value = step1Values
        current.value++
        step1_Schema.value = []
        let schema: FormSchema[] = []
        let light_line_num = step1Values['light_line']
        for (let i = 1; i <= light_line_num; i++) {
          for (let j = 1; j <= step1Values['light_line_' + i]; j++) {
            schema.push({
              field: 'light_' + i + '_' + j + '_name',
              label: '第' + i + '行' + '第' + j + '列指示灯名称',
              component: 'Input',
              colProps: { span: 12 },
            })
            schema.push({
              field: 'light_' + i + '_' + j + '_description',
              label: '第' + i + '行' + '第' + j + '列指示灯描述',
              component: 'Input',
              colProps: { span: 12 },
            })
            schema.push({
              field: 'light_' + i + '_' + j + '_status',
              label: '第' + i + '行' + '第' + j + '列指示状态',
              component: 'Input',
              colProps: { span: 24 },
            })
          }
        }
        let switch_line_num = step1Values['switch_line']
        for (let i = 1; i <= switch_line_num; i++) {
          for (let j = 1; j <= step1Values['switch_line_' + i]; j++) {
            schema.push({
              field: 'switch_' + i + '_' + j + '_name',
              label: '第' + i + '行' + '第' + j + '列开关名称',
              component: 'Input',
              colProps: { span: 12 },
            })
            schema.push({
              field: 'switch_' + i + '_' + j + '_description',
              label: '第' + i + '行' + '第' + j + '列开关描述',
              component: 'Input',
              colProps: { span: 12 },
            })
            schema.push({
              field: 'switch_' + i + '_' + j + '_status',
              label: '第' + i + '行' + '第' + j + '列开关状态',
              component: 'Input',
              colProps: { span: 24 },
            })
          }
        }
        let strap_line_num = step1Values['strap_line']
        for (let i = 1; i <= strap_line_num; i++) {
          for (let j = 1; j <= step1Values['strap_line_' + i]; j++) {
            schema.push({
              field: 'strap_' + i + '_' + j + '_name',
              label: '第' + i + '行' + '第' + j + '列压板名称',
              component: 'Input',
              colProps: { span: 12 },
            })
            schema.push({
              field: 'strap_' + i + '_' + j + '_description',
              label: '第' + i + '行' + '第' + j + '列压板描述',
              component: 'Input',
              colProps: { span: 12 },
            })
            schema.push({
              field: 'strap_' + i + '_' + j + '_status',
              label: '第' + i + '行' + '第' + j + '列压板状态',
              component: 'Input',
              colProps: { span: 24 },
            })
          }
        }
        step1_Schema.value = schema
        state.initSetp2 = true
      }

      function handleStepPrev() {
        current.value--
      }

      function handleStep2Next(step2Values: any) {
        step2_Values.value = step2Values
        console.log(step2_Values.value)
        current.value++
        state.initSetp3 = true
      }

      function handleStep3Next(step3Values: any) {
        current.value++
        state.initSetp4 = true
      }

      function handleRedo() {
        current.value = 0
        state.initSetp2 = false
        state.initSetp3 = false
      }

      return {
        step1_Values,
        step2_Values,
        step1_Schema,
        current,
        handleStep1Next,
        handleStep2Next,
        handleStep3Next,
        handleRedo,
        handleStepPrev,
        ...toRefs(state),
      }
    },
  })
</script>
<style lang="less" scoped>
  .step-form-content {
    padding: 24px;
    background-color: @component-background;
  }

  .step-form-form {
    width: 750px;
    margin: 0 auto;
  }
</style>
