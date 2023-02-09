<template>
  <PageWrapper title="现场侧情况">
    <a-button type="primary" class="my-4" @click="openModal4"> 添加现场侧 </a-button>
    <Card>
      <CardGrid v-for="(site, index) in sites" :key="index" class="!md:w-1/3 !w-full">
        <div style="padding-right: 0; width: 100%; display: flex; align-items: center">
          <span style="font-size: 17px; font-weight: bold; width: 100%">名称：{{ site.name }}</span>
          <a-button
            type="primary"
            style="right: 0; width: auto"
            @click="
              updateSiteId(site.id),
                getSiteInfoById(site.id),
                manageSite(site),
                updateSiteClickedIndex(index)
            "
          >
            管理现场侧
          </a-button>
        </div>
        <Tabs v-model:activeKeys="activeKeys[index]">
          <TabPane key="1" tab="监控1">
            <span class="flex" style="margin-bottom: 10px">
              <video controls :src="site.video1" style="width: 100%; height: 100%"></video>
            </span>
            <div style="display: flex; align-items: center">
              <BasicUpload
                :emptyHidePreview="true"
                :showPreviewNumber="false"
                :maxSize="20"
                :maxNumber="1"
                :api="upload"
                @click="
                  updateSiteId(site.id), updateActiveKey(index, 1), updateSiteClickedIndex(index)
                "
                style="width: 100%"
              />
              <a-button
                type="primary"
                style="right: 0; width: auto"
                @click="disconnectVideo(site.id, index, 'video1')"
              >
                断开连接
              </a-button>
            </div>
          </TabPane>
          <TabPane key="2" tab="监控2">
            <span class="flex" style="margin-bottom: 10px">
              <video
                controls
                :src="site.video2"
                style="object-fit: cover; width: 100%; height: 100%"
              ></video>
            </span>
            <div style="align-items: center; display: flex">
              <BasicUpload
                :emptyHidePreview="true"
                :showPreviewNumber="false"
                :maxSize="20"
                :maxNumber="1"
                :api="upload"
                @click="
                  updateSiteId(site.id), updateActiveKey(index, 2), updateSiteClickedIndex(index)
                "
                style="width: 100%"
              />
              <a-button
                type="primary"
                style="right: 0; width: auto"
                @click="disconnectVideo(site.id, index, 'video2')"
              >
                断开连接
              </a-button>
            </div>
          </TabPane>
          <template #rightExtra>
            <a-button
              type="danger"
              @click="
                () => {
                  updateSiteId(site.id)
                  showDeleteConfirm()
                }
              "
              >删除现场侧
            </a-button>
          </template>
        </Tabs>
      </CardGrid>
    </Card>
    <Modal1 @register="register1" :site-Id="siteId" />
    <Modal4 @register="register4" />
    <Modal5 @register="register5" :site="currentSiteClicked" />
  </PageWrapper>
</template>
<script lang="ts">
  import Test from './Test.vue'
  import Modal1 from './Modal1.vue'
  import { BasicUpload } from '/@/components/Upload'
  import { Card, CardGrid, Modal, notification, Tabs, TabPane, Row, Table } from 'ant-design-vue'
  import { defineComponent, ref, nextTick, onMounted, createVNode, onBeforeMount } from 'vue'
  import { Alert, Space } from 'ant-design-vue'
  import { useModal } from '/@/components/Modal'
  import Modal4 from './Modal4.vue'
  import Modal5 from './Modal5.vue'
  import { PageWrapper } from '/@/components/Page'
  import { createImgPreview, ImagePreview } from '/@/components/Preview/index'
  import {
    deleteSiteApi,
    getSiteApi,
    video1Api,
    video2Api,
    deleteVideoApi,
    getSiteByIdApi,
  } from '/@/api/sys/site'
  import { useI18n } from '/@/hooks/web/useI18n'
  import { ExclamationCircleOutlined, DownloadOutlined } from '@ant-design/icons-vue'
  import { useTabs } from '/@/hooks/web/useTabs'
  // import { PreviewActions } from '/@/components/Preview/src/typing';

  let siteId = ref(0)

  const imgList: string[] = ['https://picsum.photos/id/66/346/216']
  export default defineComponent({
    components: {
      Test,
      Modal1,
      BasicUpload,
      Card,
      CardGrid,
      PageWrapper,
      ImagePreview,
      Alert,
      Modal4,
      ASpace: Space,
      Tabs,
      TabPane,
      Row,
      Table,
      DownloadOutlined,
      Modal5,
    },
    setup() {
      const t = useI18n()
      const [register4, { openModal: openModal4 }] = useModal()
      const [register1, { openModal: openModal1 }] = useModal()
      const [register5, { openModal: openModal5 }] = useModal()
      const modalVisible = ref<Boolean>(false)
      const userData = ref<any>(null)
      const { refreshPage } = useTabs()
      let siteClickedIndex = ref(0)
      const manageSite = (site: any) => {
        if (site.video1 === '' && site.video2 === '') {
          notification.error({
            message: '没有连接',
            duration: 2,
          })
          return
        }
        openModal5()
      }
      const currentSiteClicked = ref<any>(0)
      const getSiteInfoById = async (siteId: number) => {
        const res = await getSiteByIdApi(siteId)
        if (res) {
          currentSiteClicked.value = res
        }
      }
      const updateSiteClickedIndex = (index: number) => {
        siteClickedIndex.value = index
      }

      const upload = async (file: any) => {
        console.log('activeKeys:', activeKeys)
        let res: any = null
        if (activeKeys.value[siteClickedIndex.value] === 1) {
          res = await video1Api({
            file: file.file,
            siteId: siteId.value,
          })
        } else if (activeKeys.value[siteClickedIndex.value] === 2) {
          res = await video2Api({
            file: file.file,
            siteId: siteId.value,
          })
        }
        if (res) {
          notification.success({
            message: '上传成功',
            duration: 2,
          })
          // wait 2s to refresh page
          setTimeout(() => {
            refreshPage()
          }, 2000)
          return true
        } else {
          notification.error({
            message: '上传失败',
            duration: 2,
          })
          return false
        }
      }
      const updateSiteId = (id: number) => {
        siteId.value = id
        // console.log('siteId:', siteId.value)
      }

      const disconnectVideo = async (id: number, index: number, video: string) => {
        console.log('断开连接')
        console.log('id:', id)
        console.log('video:', video)
        console.log('index:', index)
        if (video === 'video1') {
          if (sites.value[index].video1 === '') {
            notification.error({
              message: '没有连接',
              duration: 2,
            })
            return
          }
        } else {
          if (sites.value[index].video2 === '') {
            notification.error({
              message: '没有连接',
              duration: 2,
            })
            return
          }
        }
        try {
          await deleteVideoApi({
            siteId: id,
            video: video,
          })
          notification.success({
            message: '断开连接成功',
            duration: 2,
          })
          // wait 2s to refresh page
          setTimeout(() => {
            refreshPage()
          }, 2000)
        } catch (error) {
          console.log('error:', error)
          notification.error({
            message: '断开连接失败',
            duration: 2,
          })
        }
      }

      function openImg() {
        const onImgLoad = ({ index, url, dom }) => {
          console.log(`第${index + 1}张图片已加载，URL为：${url}`, dom)
        }
        // 可以使用createImgPreview返回的 PreviewActions 来控制预览逻辑，实现类似幻灯片、自动旋转之类的骚操作
        createImgPreview({ imageList: imgList, defaultWidth: 700, rememberState: true, onImgLoad })
      }

      const deleteSite = async () => {
        try {
          const res = await deleteSiteApi({
            siteId: siteId.value,
          })
          if (res) {
            notification.success({
              message: '删除成功',
              duration: 2,
            })
          }
        } catch (error) {}
      }

      const showDeleteConfirm = () => {
        Modal.confirm({
          title: '是否确认删除当前现场侧',
          icon: createVNode(ExclamationCircleOutlined),
          okText: '是',
          okType: 'danger',
          cancelText: '否',
          onOk() {
            console.log('OK')
            deleteSite()
            refreshPage()
          },
          onCancel() {
            console.log('Cancel')
          },
        })
      }

      let sites = ref<any>(null)
      let activeKeys = ref<number[]>([])
      const updateActiveKey = (index: number, value: number) => {
        activeKeys.value[index] = value
        console.log('activeKeys:', activeKeys.value)
      }
      onMounted(async () => {
        try {
          const res = await getSiteApi()
          console.log('res:', res)
          sites.value = res
          for (let i = 0; i < res.length; i++) {
            activeKeys.value.push(1)
          }
          console.log('activeKeys:', activeKeys.value)
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
        t,
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
        showDeleteConfirm,
        deleteSite,
        refreshPage,
        activeKeys,
        updateActiveKey,
        disconnectVideo,
        updateSiteClickedIndex,
        manageSite,
        register5,
        openModal5,
        siteClickedIndex,
        getSiteInfoById,
        currentSiteClicked,
      }
    },
  })
</script>
