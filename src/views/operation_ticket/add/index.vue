<template>
  <PageWrapper title="添加操作票">
    <div class="step-form-form">
      <a-steps :current="current">
        <a-step title="填写操作票" />
        <a-step title="确认操作票信息" />
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
      />
      <Step3 v-show="current === 2" @redo="handleRedo" v-if="initSetp3" />
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive, toRefs } from 'vue'
  import Step1 from './Step1.vue'
  import Step2 from './Step2.vue'
  import Step3 from './Step3.vue'
  import { PageWrapper } from '/@/components/Page'
  import { Steps } from 'ant-design-vue'

  export default defineComponent({
    name: 'FormStepPage',
    components: {
      Step1,
      Step2,
      Step3,
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
      })

      const step1_Values = ref({})
      function handleStep1Next(step1Values: any) {
        current.value++
        state.initSetp2 = true
        step1_Values.value = step1Values
      }

      function handleStepPrev() {
        current.value--
      }

      function handleStep2Next(step2Values: any) {
        current.value++
        state.initSetp3 = true
        console.log('step2Value', step2Values)
      }

      function handleRedo() {
        current.value = 0
        state.initSetp2 = false
        state.initSetp3 = false
      }

      return {
        step1_Values,
        current,
        handleStep1Next,
        handleStep2Next,
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
