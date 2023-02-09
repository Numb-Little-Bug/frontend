<template>
  <PageWrapper title="操作票模板">
    <BasicForm @register="register" />
  </PageWrapper>
</template>
<script lang="ts">
  import { BasicForm, useForm } from '/@/components/Form'
  import { defineComponent } from 'vue'
  import { schemas } from './data'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { PageWrapper } from '/@/components/Page'

  export default defineComponent({
    name: 'FormBasicPage',
    components: { BasicForm, PageWrapper },
    setup() {
      const { createMessage } = useMessage()
      const [register, { validate, setProps }] = useForm({
        /*labelWidth: 80,
        labelCol: {
          span: 5,
        },
        wrapperCol: {
          span: 15,
        },
        schemas: schemas,
        actionColOptions: {
          offset: 5,
          span: 23,
        },*/
        labelWidth: 80,
        schemas: schemas,
        actionColOptions: {
          span: 24,
        },
        submitButtonOptions: {
          text: '提交',
        },
        submitFunc: customSubmitFunc,
      })

      async function customSubmitFunc() {
        try {
          await validate()
          setProps({
            submitButtonOptions: {
              loading: true,
            },
          })
          setTimeout(() => {
            setProps({
              submitButtonOptions: {
                loading: false,
              },
            })
            createMessage.success('提交成功！')
          }, 2000)
        } catch (error) {}
      }

      return { register }
    },
  })
</script>
<style lang="less" scoped>
  .form-wrap {
    padding: 5px;
    width: 450px;
    margin: 0 auto;
    background-color: @component-background;
  }
</style>
