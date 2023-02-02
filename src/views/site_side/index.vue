<template>
  <PageWrapper title="现场侧情况">
    <a-button type="primary" class="my-4" @click="send"> 添加现场侧 </a-button>
    <Card>
      <CardGrid v-for="site in sites" :key="site" class="!md:w-1/3 !w-full">
        <span class="flex">
          <video
            class="w-32 h-20"
            controls
            :src="site.video1"
            :poster="site.video1"
            style="object-fit: cover"
          ></video>
        </span>
        <span class="flex">
          <span class="text-lg ml-4">{{ site.id }} - {{ site.name }}</span>
        </span>
        <span class="flex">
          <BasicUpload
            :emptyHidePreview="true"
            :showPreviewNumber="false"
            :maxSize="20"
            :maxNumber="1"
            :api="upload"
            @click="updateSiteId(site.id)"
          />
        </span>
      </CardGrid>
    </Card>
    <Modal4 @register="register4" />
  </PageWrapper>
</template>
<script lang="ts">
  import { BasicUpload } from '/@/components/Upload'
  import { Card, CardGrid } from 'ant-design-vue'
  import { defineComponent, shallowRef, ComponentOptions, ref, nextTick, onMounted } from 'vue'
  import { Alert, Space } from 'ant-design-vue'
  import { useModal } from '/@/components/Modal'
  import Modal4 from './Modal4.vue'
  import { PageWrapper } from '/@/components/Page'
  import { createImgPreview, ImagePreview } from '/@/components/Preview/index'
  import { getSiteApi, videoApi } from '/@/api/sys/site'
  // import { PreviewActions } from '/@/components/Preview/src/typing';

  let siteId = ref(0)

  const upload = (file: any) => {
    console.log(file)
    console.log('siteId:', siteId.value)
    return videoApi({
      file: file.file,
      siteId: siteId.value,
    })
  }
  const imgList: string[] = ['https://picsum.photos/id/66/346/216']
  export default defineComponent({
    components: {
      BasicUpload,
      Card,
      CardGrid,
      PageWrapper,
      ImagePreview,
      Alert,
      Modal4,
      ASpace: Space,
    },
    setup() {
      const currentModal = shallowRef<Nullable<ComponentOptions>>(null)
      const [register4, { openModal: openModal4 }] = useModal()
      const modalVisible = ref<Boolean>(false)
      const userData = ref<any>(null)

      const updateSiteId = (id: number) => {
        siteId.value = id
        // console.log('siteId:', siteId.value)
      }

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
      let sites = ref<any>(null)
      onMounted(async () => {
        try {
          const res = await getSiteApi()
          console.log('res:', res)
          sites.value = res
        } catch (e) {
          console.log(e)
        }
      })
      nextTick(() => {
        // `useModal` not working with dynamic component
        // passing data through `userData` prop
        userData.value = { data: Math.random(), info: 'Info222' }
        // open the target modal
        modalVisible.value = true
      })
      return {
        siteId,
        upload,
        imgList,
        openImg,
        register4,
        openModal4,
        modalVisible,
        userData,
        send,
        currentModal,
        sites,
        updateSiteId,
      }
    },
  })
</script>
