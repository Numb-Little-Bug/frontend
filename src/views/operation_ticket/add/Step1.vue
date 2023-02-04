<template>
  <div class="step1">
    <div class="step1-form">
      <BasicForm @register="register">
        <template #customSlot>
          <div style="display: flex">
            <a-button
              v-show="StepNum > 1"
              style="float: right; margin-top: 10px"
              type="danger"
              @click="deleteStep"
            >
              删除步骤
            </a-button>
            <a-button
              style="float: right; margin-top: 10px; margin-left: 10px"
              type="primary"
              @click="newStep"
            >
              新增步骤
            </a-button>
          </div>
        </template>
      </BasicForm>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { BasicForm, FormSchema, useForm } from '/@/components/Form'
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
      const [register, { validate, appendSchemaByField, removeSchemaByField }] = useForm({
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

      let StepNum = ref(1)

      function newStep() {
        const newStepSchema: FormSchema[] = [
          {
            field: 'step_desc_' + (StepNum.value + 1),
            label: '步骤' + (StepNum.value + 1),
            colProps: {
              span: 12,
            },
            component: 'Input',
            required: true,
          },
          {
            field: 'step_type_' + (StepNum.value + 1),
            label: '步骤类型',
            colProps: {
              span: 5,
            },
            component: 'Select',
            componentProps: {
              options: [
                {
                  label: '类型一',
                  value: 1,
                },
                {
                  label: '类型二',
                  value: 2,
                },
                {
                  label: '类型三',
                  value: 3,
                },
              ],
            },
            required: true,
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
        appendSchemaByField(newStepSchema, 'step' + StepNum.value)
        StepNum.value++
      }

      function deleteStep() {
        if (StepNum.value > 1) {
          removeSchemaByField('step_desc_' + StepNum.value)
          removeSchemaByField('step_type_' + StepNum.value)
          removeSchemaByField('step_remark_' + StepNum.value)
          removeSchemaByField('step' + StepNum.value)
          StepNum.value--
        }
      }

      async function customSubmitFunc() {
        try {
          const values = await validate()
          emit('next', values)
          console.log(values)
        } catch (error) {}
      }
      return { register, newStep, deleteStep, StepNum }
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
