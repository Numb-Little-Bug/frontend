<template>
  <div class="step1">
    <div class="step1-form">
      <BasicForm @register="register">
        <template #slot>
          <a-button @click="handleNext"> 下一步 </a-button>
        </template>
      </BasicForm>
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
      const [register, { validate, removeSchemaByField, appendSchemaByField, getFieldsValue }] =
        useForm({
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

      let light_line_number = ref(0)
      let strap_line_number = ref(0)
      let switch_line_number = ref(0)

      function handleNext() {
        for (let i = light_line_number.value; i > 0; i--) {
          removeSchemaByField('light_line_' + i)
        }
        for (let i = strap_line_number.value; i > 0; i--) {
          removeSchemaByField('strap_line_' + i)
        }
        for (let i = switch_line_number.value; i > 0; i--) {
          removeSchemaByField('switch_line_' + i)
        }
        light_line_number.value = getFieldsValue().light_line
        strap_line_number.value = getFieldsValue().strap_line
        switch_line_number.value = getFieldsValue().switch_line
        for (let i = light_line_number.value; i > 0; i--) {
          appendSchemaByField(
            [
              {
                field: 'light_line_' + i,
                label: '第' + i + '行指示灯数量',
                component: 'Select',
                show: true,
                labelWidth: 120,
                colProps: {
                  span: 24 / light_line_number.value,
                },
                componentProps: {
                  options: [
                    {
                      label: '1',
                      value: 1,
                    },
                    {
                      label: '2',
                      value: 2,
                    },
                    {
                      label: '3',
                      value: 3,
                    },
                    {
                      label: '4',
                      value: 4,
                    },
                  ],
                },
              },
            ],
            'light_line_number',
          )
        }
        for (let i = strap_line_number.value; i > 0; i--) {
          appendSchemaByField(
            [
              {
                field: 'strap_line_' + i,
                label: '第' + i + '行压板数量',
                component: 'Select',
                show: true,
                labelWidth: 120,
                colProps: {
                  span: 24 / strap_line_number.value,
                },
                componentProps: {
                  options: [
                    {
                      label: '1',
                      value: 1,
                    },
                    {
                      label: '2',
                      value: 2,
                    },
                    {
                      label: '3',
                      value: 3,
                    },
                    {
                      label: '4',
                      value: 4,
                    },
                  ],
                },
              },
            ],
            'strap_line_number',
          )
        }
        for (let i = switch_line_number.value; i > 0; i--) {
          appendSchemaByField(
            [
              {
                field: 'switch_line_' + i,
                label: '第' + i + '行开关数量',
                component: 'Select',
                show: true,
                labelWidth: 120,
                colProps: {
                  span: 24 / switch_line_number.value,
                },
                componentProps: {
                  options: [
                    {
                      label: '1',
                      value: 1,
                    },
                    {
                      label: '2',
                      value: 2,
                    },
                    {
                      label: '3',
                      value: 3,
                    },
                    {
                      label: '4',
                      value: 4,
                    },
                  ],
                },
              },
            ],
            'switch_line_number',
          )
        }
      }

      async function customSubmitFunc() {
        try {
          const values = await validate()
          emit('next', values)
        } catch (error) {
          console.log(error)
        }
      }

      return { register, handleNext }
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
