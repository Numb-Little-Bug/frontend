<template>
  <a-button type="dashed" @click="showDeleteConfirm">Delete</a-button>
</template>
<script>
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue'
  import { createVNode, defineComponent } from 'vue'
  import { Modal } from 'ant-design-vue'
  export default defineComponent({
    props: {
      siteId: {
        type: String,
        required: true,
      },
    },
    setup() {
      const showConfirm = () => {
        Modal.confirm({
          title: 'Do you Want to delete these items?',
          icon: createVNode(ExclamationCircleOutlined),
          content: createVNode(
            'div',
            {
              style: 'color:red;',
            },
            'Some descriptions',
          ),
          onOk() {
            console.log('OK')
          },
          onCancel() {
            console.log('Cancel')
          },
          class: 'test',
        })
      }
      const showDeleteConfirm = () => {
        Modal.confirm({
          title: 'Are you sure delete this task?',
          icon: createVNode(ExclamationCircleOutlined),
          content: 'Some descriptions',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk() {
            console.log('OK')
          },
          onCancel() {
            console.log('Cancel')
          },
        })
      }
      const showPropsConfirm = () => {
        Modal.confirm({
          title: 'Are you sure delete this task?',
          icon: createVNode(ExclamationCircleOutlined),
          content: 'Some descriptions',
          okText: 'Yes',
          okType: 'danger',
          okButtonProps: {
            disabled: true,
          },
          cancelText: 'No',
          onOk() {
            console.log('OK')
          },
          onCancel() {
            console.log('Cancel')
          },
        })
      }
      function showPromiseConfirm() {
        Modal.confirm({
          title: 'Do you want to delete these items?',
          icon: createVNode(ExclamationCircleOutlined),
          content: 'When clicked the OK button, this dialog will be closed after 1 second',
          async onOk() {
            try {
              return await new Promise((resolve, reject) => {
                setTimeout(Math.random() > 0.5 ? resolve : reject, 1000)
              })
            } catch {
              return console.log('Oops errors!')
            }
          },
          onCancel() {},
        })
      }
      return {
        showConfirm,
        showDeleteConfirm,
        showPropsConfirm,
        showPromiseConfirm,
      }
    },
  })
</script>
