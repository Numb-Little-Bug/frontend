<template>
  <div class="step1">
    <div class="step1-form">
      <BasicForm @register="register" />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { BasicForm, useForm } from '/@/components/Form'
  import { step1Schemas } from './data'

  import { Select, Input, Divider } from 'ant-design-vue'
  export default defineComponent({
    components: {
      BasicForm,
      [Select.name]: Select,
      [Input.name]: Input,
      [Input.Group.name]: Input.Group,
      [Divider.name]: Divider,
    },
    emits: ['next'],
    setup(_, { emit }) {
      const [register, { validate }] = useForm({
        labelWidth: 80,
        schemas: step1Schemas,
        actionColOptions: {
          span: 24,
        },
        showResetButton: false,
        submitButtonOptions: {
          text: '下一步',
        },
        submitFunc: customSubmitFunc,
      })
      async function customSubmitFunc() {
        try {
          const values = await validate()
          emit('next', values)
        } catch (error) {
          console.log(error)
        }
      }

      return { register }
    },
  })
</script>
<style lang="less" scoped>
  .step1 {
    &-form {
      width: 900px;
      margin: 0 auto;
    }

    h3 {
      margin: 0 0 12px;
      font-size: 16px;
      line-height: 32px;
      color: @text-color;
    }

    h4 {
      margin: 0 0 4px;
      font-size: 14px;
      line-height: 22px;
      color: @text-color;
    }

    p {
      color: @text-color;
    }
  }

  .pay-select {
    width: 20%;
  }

  .pay-input {
    width: 70%;
  }
</style>
