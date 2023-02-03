<template>
  <div class="step2">
    <a-alert message="请确认操作票信息正确无误" show-icon />
    <a-descriptions :column="1" class="mt-5">
      <a-descriptions-item label="任务名称"> {{ values.title }} </a-descriptions-item>
    </a-descriptions>
    <a-descriptions :column="3" class="mt-5">
      <a-descriptions-item label="现场侧名"> {{ values.site_side_name }} </a-descriptions-item>
      <a-descriptions-item label="起止时间">
        {{ values.start_end_time[0] }} - {{ values.start_end_time[1] }}</a-descriptions-item
      >
      <a-descriptions-item label="类别"> {{ values.type }}</a-descriptions-item>
      <a-descriptions-item label="唱票人"> {{ values.name1 }} </a-descriptions-item>
      <a-descriptions-item label="操作人"> {{ values.operator_name }} </a-descriptions-item>
      <a-descriptions-item label="发布人"> {{ values.name2 }} </a-descriptions-item>
    </a-descriptions>
    <a-descriptions :column="1" class="mt-5">
      <a-descriptions-item label="操作步骤"> {{ values.step }} </a-descriptions-item>
      <a-descriptions-item label="安全事项"> {{ values.safety_precautions }} </a-descriptions-item>
      <a-descriptions-item label="备注"> {{ values.notes }} </a-descriptions-item>
    </a-descriptions>
    <a-divider />
    <BasicForm @register="register" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue'
  import { BasicForm, useForm } from '/@/components/Form'
  import { Alert, Divider, Descriptions } from 'ant-design-vue'
  import { addTicketApi } from '/@/api/sys/ticket'
  import { AddTicketParams } from '/@/api/sys/model/ticketModel'

  export default defineComponent({
    components: {
      BasicForm,
      [Alert.name]: Alert,
      [Divider.name]: Divider,
      [Descriptions.name]: Descriptions,
      [Descriptions.Item.name]: Descriptions.Item,
    },
    props: ['values'],
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

      const Ticket: AddTicketParams = {
        name: _.values.title,
        siteId: _.values.site_side_name,
        startTime: _.values.start_end_time[0],
        endTime: _.values.start_end_time[1],
        teller: _.values.name1,
        operator: _.values.operator_name,
        publisher: _.values.name2,
        notice: _.values.safety_precautions,
        remark: _.values.notes,
        status: 0,
      }

      async function customSubmitFunc() {
        try {
          const Step2_values = await validate()
          await setProps({
            submitButtonOptions: {
              loading: true,
            },
          })
          const res = await addTicketApi(Ticket)
          console.log(res)
          setTimeout(() => {
            setProps({
              submitButtonOptions: {
                loading: false,
              },
            })
            emit('next', Step2_values)
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
