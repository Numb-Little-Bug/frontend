<template>
  <div class="step1">
    <div class="step1-form">
      <BasicForm @register="register" @change="handleChange">
        <template #customSlot>
          <div>
            <a-button
              v-show="StepNum > 0"
              style="margin-top: 10px"
              type="danger"
              @click="deleteStep"
            >
              删除步骤
            </a-button>
            <a-button style="float: right; margin-top: 10px" type="primary" @click="newStep">
              新增步骤
            </a-button>
          </div>
        </template>
      </BasicForm>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, reactive } from 'vue'
  import { BasicForm, FormSchema, useForm } from '/@/components/Form'
  import { step2Schemas } from './step'

  import { Select, Input, Divider } from 'ant-design-vue'
  import { getItemsApi } from '/@/api/sys/device'
  export default defineComponent({
    components: {
      BasicForm,
      [Select.name]: Select,
      [Input.name]: Input,
      [Input.Group.name]: Input.Group,
      [Divider.name]: Divider,
    },
    props: ['values'],
    emits: ['next', 'prev'],
    setup(_, { emit }) {
      const [register, { validate, appendSchemaByField, removeSchemaByField, getFieldsValue }] =
        useForm({
          labelWidth: 80,
          schemas: step2Schemas,
          actionColOptions: {
            span: 24,
          },
          resetButtonOptions: {
            text: '上一步',
          },
          resetFunc: customResetFunc,
          submitButtonOptions: {
            text: '下一步',
          },
          submitFunc: customSubmitFunc,
        })

      async function customSubmitFunc() {
        try {
          const values = await validate()
          for (let item in _.values) {
            values[item] = _.values[item]
          }
          console.log(values)
          emit('next', values)
        } catch (error) {
          console.log(error)
        }
      }

      async function customResetFunc() {
        while (StepNum.value !== 0) {
          deleteStep()
        }
        emit('prev')
      }

      let StepNum = ref(0)
      let device = ref('')

      async function newStep() {
        // console.log(_.values)
        let items: any = await getItemsApi(_.values.device)
        // console.log(items)
        let options: any = []
        for (let item in items) {
          options.push({
            label: items[item],
            value: items[item],
          })
        }
        //console.log(options)
        const newStepSchema: FormSchema[] = [
          {
            field: 'step_item_' + (StepNum.value + 1),
            label: '步骤' + (StepNum.value + 1),
            colProps: {
              span: 24,
            },
            component: 'Divider',
          },
          {
            field: 'step_desc_' + (StepNum.value + 1),
            label: '操作对象',
            colProps: {
              span: 10,
            },
            component: 'Select',
            // required: true,
            componentProps: {
              options: options,
            },
          },
          {
            field: 'step_type_' + (StepNum.value + 1),
            label: '操作类型',
            colProps: {
              span: 5,
            },
            component: 'Select',
            componentProps: {
              options: [
                {
                  label: '开',
                  value: '开',
                },
                {
                  label: '关',
                  value: '关',
                },
                {
                  label: '调整',
                  value: '调整',
                },
              ],
            },
            // required: true,
          },
          {
            field: 'step_remark_' + (StepNum.value + 1),
            label: '备注',
            colProps: {
              span: 7,
            },
            component: 'Input',
          },
          {
            field: 'step' + (StepNum.value + 1),
            label: '步骤' + (StepNum.value + 1),
            colProps: {
              span: 24,
            },
            component: 'Input',
            show: false,
          },
        ]
        await appendSchemaByField(newStepSchema, 'step' + StepNum.value)
        StepNum.value++
      }

      function deleteStep() {
        if (StepNum.value > 0) {
          removeSchemaByField('step_desc_' + StepNum.value)
          removeSchemaByField('step_type_' + StepNum.value)
          removeSchemaByField('step_item_' + StepNum.value)
          removeSchemaByField('step_remark_' + StepNum.value)
          removeSchemaByField('step' + StepNum.value)
          StepNum.value--
        }
      }



      function handleChange() {
        device.value = getFieldsValue().device
      }

      return { register, newStep, deleteStep, StepNum, device, handleChange }
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
