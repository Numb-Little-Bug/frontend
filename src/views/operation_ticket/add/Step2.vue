<template>
  <div class="step2">
    <a-alert message="请确认操作票信息正确无误" show-icon />
    <a-descriptions :column="1" class="mt-5">
      <a-descriptions-item label="任务名称">10kV××线***开关由运行转检修 </a-descriptions-item>
    </a-descriptions>
    <a-descriptions :column="3" class="mt-5">
      <a-descriptions-item label="现场侧名"> XXXXXXXXX </a-descriptions-item>
      <a-descriptions-item label="起止时间"> XXXX-XXXX </a-descriptions-item>
      <a-descriptions-item label="类别"> XXXXXXX </a-descriptions-item>
      <a-descriptions-item label="唱票人"> XXX </a-descriptions-item>
      <a-descriptions-item label="操作人"> XXX </a-descriptions-item>
      <a-descriptions-item label="发布人"> XXX </a-descriptions-item>
    </a-descriptions>
    <a-descriptions :column="1" class="mt-5">
      <a-descriptions-item label="操作步骤">无</a-descriptions-item>
      <a-descriptions-item label="安全事项"> 无 </a-descriptions-item>
      <a-descriptions-item label="备注"> 无 </a-descriptions-item>
    </a-descriptions>
    <a-divider />
    <BasicForm @register="register" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { BasicForm, useForm } from '/@/components/Form'
  import { Alert, Divider, Descriptions } from 'ant-design-vue'

  export default defineComponent({
    components: {
      BasicForm,
      [Alert.name]: Alert,
      [Divider.name]: Divider,
      [Descriptions.name]: Descriptions,
      [Descriptions.Item.name]: Descriptions.Item,
    },
    emits: ['next', 'prev'],
    setup(_, { emit }) {
      const [register, { validate, setProps }] = useForm({
        labelWidth: 80,
        actionColOptions: {
          span: 30,
        },
        resetButtonOptions: {
          text: '上一步',
        },
        submitButtonOptions: {
          text: '提交',
        },
        resetFunc: customResetFunc,
        submitFunc: customSubmitFunc,
      })

      async function customResetFunc() {
        emit('prev')
      }

      async function customSubmitFunc() {
        try {
          const values = await validate()
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
            emit('next', values)
          }, 1500)
        } catch (error) {}
      }

      return { register }
    },
  })
</script>
<style lang="less" scoped>
  .step2 {
    width: 450px;
    margin: 0 auto;
  }
</style>
