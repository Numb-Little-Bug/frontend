<template>
  <PageWrapper title="modal组件使用示例">
    <Alert
      message="使用 useModal 进行弹窗操作，默认可以拖动，可以通过 draggable
    参数进行控制是否可以拖动/全屏，并演示了在Modal内动态加载内容并自动调整高度"
      show-icon
    />
    <a-button type="primary" class="my-4" @click="openModalLoading">
      打开弹窗,加载动态数据并自动调整高度(默认可以拖动/全屏)
    </a-button>

    <Alert message="内外数据交互" show-icon />
    <a-button type="primary" class="my-4" @click="send"> 打开弹窗并传递数据 </a-button>

    <component :is="currentModal" />

    <Modal1 @register="register1" :minHeight="100" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, shallowRef, ComponentOptions, ref, nextTick } from 'vue'
  import { Alert, Space } from 'ant-design-vue'
  import { useModal } from '/@/components/Modal'
  import Modal1 from './Modal1.vue'
  import { PageWrapper } from '/@/components/Page'

  export default defineComponent({
    components: { Alert, Modal1, PageWrapper, ASpace: Space },
    setup() {
      const currentModal = shallowRef<Nullable<ComponentOptions>>(null)
      const [register1, { openModal: openModal1 }] = useModal()
      const [register2, { openModal: openModal2 }] = useModal()
      const [register3, { openModal: openModal3 }] = useModal()
      const [register4, { openModal: openModal4 }] = useModal()
      const modalVisible = ref<Boolean>(false)
      const userData = ref<any>(null)

      function send() {
        openModal4(true, {
          data: 'content',
          info: 'Info',
        })
      }
      function openModalLoading() {
        openModal1(true)
        // setModalProps({ loading: true });
        // setTimeout(() => {
        //   setModalProps({ loading: false });
        // }, 2000);
      }

      function openTargetModal(index) {
        switch (index) {
          case 1:
            currentModal.value = Modal1

            break
        }
        nextTick(() => {
          // `useModal` not working with dynamic component
          // passing data through `userData` prop
          userData.value = { data: Math.random(), info: 'Info222' }
          // open the target modal
          modalVisible.value = true
        })
      }

      return {
        register1,
        openModal1,
        register2,
        openModal2,
        register3,
        openModal3,
        register4,
        openModal4,
        modalVisible,
        userData,
        openTargetModal,
        send,
        currentModal,
        openModalLoading,
      }
    },
  })
</script>
