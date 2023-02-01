import { ref, computed, unref, Ref } from 'vue'
import type { RuleObject } from 'ant-design-vue/lib/form/interface'
import { useI18n } from '/@/hooks/web/useI18n'
export function useFormValid<T extends Object = any>(formRef: Ref<any>) {
  async function validForm() {
    const form = unref(formRef)
    if (!form) return
    const data = await form.validate()
    return data as T
  }

  return { validForm }
}

export function useFormRules(formData?: Recordable) {
  const { t } = useI18n()

  const getName = computed(() => createRule(t('sys.site.namePlaceholder')))
  const validateName = async (_: RuleObject) => {
    return Promise.resolve()
  }

  const getFormRules = computed(() => {
    return {
      name: [...getName.value, { validator: validateName }],
    }
  })

  return { getFormRules }
}
function createRule(message: string) {
  return [
    {
      required: true,
      message,
      trigger: 'change',
    },
  ]
}
