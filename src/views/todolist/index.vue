<template>
  <PageWrapper :class="prefixCls" title="代办操作票">
    <div :class="`${prefixCls}__top`">
      <a-row :gutter="12">
        <a-col :span="8" :class="`${prefixCls}__top-col`">
          <div>我的待办</div>
          <p>{{ tickets.length }}个任务</p>
        </a-col>
        <a-col :span="8" :class="`${prefixCls}__top-col`">
          <div>本周任务平均处理时间</div>
          <p>32分钟</p>
        </a-col>
        <a-col :span="8" :class="`${prefixCls}__top-col`">
          <div>本周完成任务数</div>
          <p>24个任务</p>
        </a-col>
      </a-row>
    </div>

    <div :class="`${prefixCls}__content`">
      <a-list>
        <a-row :gutter="16">
          <template v-for="item in tickets" :key="item.id">
            <a-col :xs="1" :sm="2" :md="3" :lg="4" :xl="6" v-if="item.status !== 2">
              <a-list-item>
                <a-card :hoverable="true" :class="`${prefixCls}__card`">
                  <Descriptions :column="1" :title="item.name">
                    <template #extra>
                      <a-button type="primary" @click="updateCurrentTicket(item), toPerform(item)"
                        >执行</a-button
                      >
                    </template>
                    <DescriptionsItem label="唱票人">{{ item.tellerName }}</DescriptionsItem>
                    <DescriptionsItem label="执行人">{{ item.operatorName }}</DescriptionsItem>
                    <DescriptionsItem label="现场侧">{{ item.siteName }}</DescriptionsItem>
                    <DescriptionsItem label="发布人">{{ item.publisherName }}</DescriptionsItem>
                    <DescriptionsItem label="开始时间">
                      {{ timestampToTime(item.startTime) }}
                    </DescriptionsItem>
                    <DescriptionsItem label="结束时间">
                      {{ timestampToTime(item.endTime) }}
                    </DescriptionsItem>
                  </Descriptions>
                </a-card>
              </a-list-item>
            </a-col>
          </template>
        </a-row>
      </a-list>
    </div>
    <NoticeModal @register="noticeModalRegister" :ticket="currentTicket" />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, onMounted, reactive, ref } from 'vue'
  import { cardList } from './data'
  import { PageWrapper } from '/@/components/Page'
  import { Card, Row, Col, List, Descriptions, DescriptionsItem } from 'ant-design-vue'
  import { getTicketByIdApi } from '/@/api/sys/ticket'
  import { getUserInfo } from '/@/api/sys/user'
  import { getUsernameByIdApi } from '/@/api/sys/ticket'
  import { getSiteByIdApi } from '/@/api/sys/site'
  import NoticeModal from './NoticeModal.vue'
  import { useModal } from '/@/components/Modal'
  const [noticeModalRegister, { openModal: openNoticeModal }] = useModal()

  export default defineComponent({
    components: {
      PageWrapper,
      [Card.name]: Card,
      [List.name]: List,
      [List.Item.name]: List.Item,
      [Row.name]: Row,
      [Col.name]: Col,
      Descriptions,
      DescriptionsItem,
      NoticeModal: NoticeModal,
    },
    setup() {
      let tickets: any[] = reactive([])
      let currentTicket: any = ref({})

      // 时间戳：1637244864707
      /* 时间戳转换为时间 */
      function timestampToTime(timestamp) {
        timestamp = timestamp ? timestamp : null
        let date = new Date(timestamp) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-'
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
        let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
        let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
        return Y + M + D + h + m + s
      }
      const updateCurrentTicket = (item: any) => {
        currentTicket.value = item
      }
      const getUsernameById = async (id: number) => {
        try {
          const res: any = await getUsernameByIdApi(id)
          return res.name
        } catch (e) {
          console.log(e)
        }
      }
      const toPerform = (item: any) => {
        console.log(item)
        openNoticeModal()
      }
      onMounted(async () => {
        try {
          const res: any = await getUserInfo()
          const re: any = await getTicketByIdApi(res.id)

          for (let i = 0; i < re.length; i++) {
            let tellerName = await getUsernameById(re[i].tellerId)
            let operatorName = await getUsernameById(re[i].operatorId)
            let publisherName = await getUsernameById(re[i].publisherId)
            let siteName: any = await getSiteByIdApi(re[i].siteId)
            tickets.push({
              id: re[i].id,
              name: re[i].name,
              tellerId: re[i].tellerId,
              operatorId: re[i].operatorId,
              notice: re[i].notice,
              publisherId: re[i].publisherId,
              siteId: re[i].siteId,
              startTime: re[i].startTime,
              endTime: re[i].endTime,
              remark: re[i].remark,
              status: re[i].status,
              tellerName: tellerName,
              operatorName: operatorName,
              publisherName: publisherName,
              siteName: siteName.name,
            })
          }
        } catch (e) {
          console.log(e)
        }
      })
      return {
        prefixCls: 'list-card',
        list: cardList,
        tickets,
        currentTicket,
        noticeModalRegister,
        openNoticeModal,
        timestampToTime,
        getUsernameById,
        toPerform,
        updateCurrentTicket,
      }
    },
  })
</script>
<style lang="less" scoped>
  .list-card {
    &__link {
      margin-top: 10px;
      font-size: 14px;

      a {
        margin-right: 30px;
      }

      span {
        margin-left: 5px;
      }
    }

    &__top {
      padding: 24px;
      text-align: center;
      background-color: @component-background;

      &-col {
        &:not(:last-child) {
          border-right: 1px dashed @border-color-base;
        }

        div {
          margin-bottom: 12px;
          font-size: 14px;
          line-height: 22px;
          color: @text-color;
        }

        p {
          margin: 0;
          font-size: 24px;
          line-height: 32px;
          color: @text-color;
        }
      }
    }

    &__card {
      width: 100%;
      margin-bottom: -8px;

      .ant-card-body {
        padding: 16px;
      }

      &-title {
        margin-bottom: 5px;
        font-size: 20px;
        font-weight: 500;
        color: @text-color;

        .icon {
          margin-top: -5px;
          margin-right: 10px;
          font-size: 18px !important;
        }
      }

      &-detail {
        padding-top: 10px;
        padding-left: 30px;
        font-size: 14px;
        color: @text-color;
      }
    }
  }
  .card-content {
    font-weight: bold;
  }
</style>
