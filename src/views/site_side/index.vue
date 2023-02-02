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
          <AButton type="danger" class="ml-4" @click="()=>{
            updateSiteId(site.id)
            openModal1()
          }"> 删除现场侧 </AButton>
        </span>
      </CardGrid>
    </Card>
    {{ siteId }}
    <Modal1 @register="register1" :sideId="siteId" />
    <Modal4 @register="register4" />
  </PageWrapper>
</template>
<script lang="ts">
  import Modal1 from './Modal1.vue'
  import { BasicUpload } from '/@/components/Upload'
  import { Card, CardGrid, notification } from 'ant-design-vue'
  import { defineComponent, ref, nextTick, onMounted } from 'vue'
  import { Alert, Space } from 'ant-design-vue'
  import { useModal } from '/@/components/Modal'
  import Modal4 from './Modal4.vue'
  import { PageWrapper } from '/@/components/Page'
  import { createImgPreview, ImagePreview } from '/@/components/Preview/index'
  import { getSiteApi, videoApi } from '/@/api/sys/site'
  import { t } from '/@/hooks/web/useI18n'
  // import { PreviewActions } from '/@/components/Preview/src/typing';

  let siteId = ref(0)

  const upload = async (file: any) => {
    const res = await videoApi({
      file: file.file,
      siteId: siteId.value,
    })
    if (res) {
      notification.success({
        message: t('sys.site.videoSuccessTitle'),
        duration: 2,
      })
      return true
    } else {
      notification.error({
        message: t('sys.site.videoErrorTitle'),
        duration: 2,
      })
      return false
    }
  }
  const imgList: string[] = ['https://picsum.photos/id/66/346/216']
  export default defineComponent({
    components: {
      Modal1,
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
      const [register4, { openModal: openModal4 }] = useModal()
      const [register1, { openModal: openModal1 }] = useModal()
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
        register1,
        getSiteApi,
        openModal1,
        siteId,
        upload,
        imgList,
        openImg,
        register4,
        openModal4,
        modalVisible,
        userData,
        sites,
        updateSiteId,
      }
    },
  })

</script>
