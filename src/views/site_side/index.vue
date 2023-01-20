<template>
  <PageWrapper title="现场侧情况">
    <a-button type="primary" class="my-4" @click="send"> 添加现场侧 </a-button>
    <ImagePreview :imageList="imgList" />
    <component :is="currentModal" />
    <Modal1 @register="register1" :minHeight="100" />
    <Modal4 @register="register4" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, shallowRef, ComponentOptions, ref, nextTick } from 'vue'
  import { Alert, Space } from 'ant-design-vue'
  import { useModal } from '/@/components/Modal'
  import Modal1 from './Modal1.vue'
  import Modal4 from './Modal4.vue'
  import { PageWrapper } from '/@/components/Page'
  import { createImgPreview, ImagePreview } from '/@/components/Preview/index'
  // import { PreviewActions } from '/@/components/Preview/src/typing';

  const imgList: string[] = [
    'https://picsum.photos/id/66/346/216',
    'https://picsum.photos/id/67/346/216',
    'https://picsum.photos/id/68/346/216',
  ]
  export default defineComponent({
    components: { PageWrapper, ImagePreview, Alert, Modal1, Modal4, ASpace: Space },
    setup() {
      const currentModal = shallowRef<Nullable<ComponentOptions>>(null)
      const [register1, { openModal: openModal1 }] = useModal()
      const [register4, { openModal: openModal4 }] = useModal()
      const modalVisible = ref<Boolean>(false)
      const userData = ref<any>(null)

      function openImg() {
        const onImgLoad = ({ index, url, dom }) => {
          console.log(`第${index + 1}张图片已加载，URL为：${url}`, dom)
        }
        // 可以使用createImgPreview返回的 PreviewActions 来控制预览逻辑，实现类似幻灯片、自动旋转之类的骚操作
        createImgPreview({ imageList: imgList, defaultWidth: 700, rememberState: true, onImgLoad })
      }

      function send() {
        openModal4(true, {
          data: null,
          info: null,
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
          case 4:
            currentModal.value = Modal4
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
        imgList,
        openImg,
        register1,
        openModal1,
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
