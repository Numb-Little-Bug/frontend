<template>
  <div class="step1">
    <div class="step1-form">
      <BasicForm @register="register" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { BasicForm, FormSchema, useForm } from '/@/components/Form'
  const props = defineProps(['schema', 'values'])
  const emit = defineEmits(['next', 'prev'])
  async function customSubmitFunc() {
    try {
      const values = await validate()
      emit('next', values)
    } catch (error) {
      console.log(error)
    }
  }

  async function customResetFunc() {
    emit('prev')
  }
  const [register, { validate, appendSchemaByField, removeSchemaByField, getFieldsValue }] =
    useForm({
      labelWidth: 80,
      schemas: props.schema,
      actionColOptions: {
        span: 24,
      },
      submitButtonOptions: {
        text: '下一步',
      },
      resetButtonOptions: {
        text: '上一步',
      },
      resetFunc: customResetFunc,
      submitFunc: customSubmitFunc,
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
