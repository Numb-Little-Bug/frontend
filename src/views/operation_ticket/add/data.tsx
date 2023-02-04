import { FormSchema } from '/@/components/Form'
import { getSiteApi } from '/@/api/sys/site'
import { getSiteUserApi } from '/@/api/sys/user'
import { newStep } from './Step1.vue'

// @ts-ignore
export const step1Schemas: FormSchema[] = [
  {
    field: 'title',
    component: 'Input',
    label: '任务名称',
    colProps: {
      span: 24,
    },
    required: true,
  },
  {
    field: 'site_side_name',
    component: 'ApiSelect',
    label: '现场侧名',
    colProps: {
      span: 6,
    },
    componentProps: {
      api: () => getSiteApi(),
      valueField: 'id',
      labelField: 'name',
      immediate: false,
    },
    required: true,
  },
  {
    field: 'start_end_time',
    label: '起止日期',
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD HH:mm',
      placeholder: ['开始时间', '结束时间'],
      showTime: { format: 'HH:mm' },
    },
    colProps: {
      span: 12,
    },
    required: true,
  },
  {
    field: 'name1',
    component: 'ApiSelect',
    label: '唱票人',
    required: true,
    colProps: {
      span: 8,
    },
    componentProps: {
      api: () => getSiteUserApi(),
      valueField: 'id',
      labelField: 'name',
      immediate: false,
    },
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          message: '操作人不能为空',
          trigger: ['change', 'blur'],
        },
        {
          //效验唱票人与操作人不同
          validator: (rule, value) => {
            if (value === values.operator_name) {
              return Promise.reject('唱票人与操作人不能相同')
            }
            return Promise.resolve()
          },
          trigger: ['change', 'blur'],
        },
      ]
    },
  },
  {
    field: 'operator_name',
    component: 'ApiSelect',
    label: '操作人',
    //required: true,
    colProps: {
      span: 8,
    },
    componentProps: {
      api: () => getSiteUserApi(),
      valueField: 'id',
      labelField: 'name',
      immediate: false,
    },
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          message: '操作人不能为空',
          trigger: ['change', 'blur'],
        },
        {
          //效验唱票人与操作人不同
          validator: (rule, value) => {
            if (value === values.name1) {
              return Promise.reject('唱票人与操作人不能相同')
            }
            return Promise.resolve()
          },
          trigger: ['change', 'blur'],
        },
      ]
    },
  },
  {
    field: 'step',
    component: 'Divider',
    label: '操作步骤',
    colProps: {
      span: 20,
    },
  },
  {
    field: 'step0',
    component: 'Input',
    label: '',
    colProps: {
      span: 4,
    },
    slot: 'customSlot',
  },
  {
    field: 'step_desc_1',
    label: '步骤1',
    colProps: {
      span: 12,
    },
    component: 'Input',
    required: true,
  },
  {
    field: 'step_type_1',
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
    field: 'step_remark_1',
    label: '备注',
    colProps: {
      span: 7,
    },
    component: 'Input',
  },
  {
    field: 'step1',
    label: '步骤1',
    colProps: {
      span: 24,
    },
    component: 'Input',
    show: false,
  },
  {
    field: 'step_end',
    component: 'Divider',
    label: '',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'safety_precautions',
    component: 'InputTextArea',
    label: '安全事项',
    componentProps: {
      rows: 4,
    },
    colProps: {
      span: 24,
    },
    required: true,
  },
  {
    field: 'notes',
    component: 'InputTextArea',
    label: '备注',
    componentProps: {
      rows: 3,
    },
    colProps: {
      span: 24,
    },
  },
]
