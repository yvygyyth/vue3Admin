import { defineModel, useTemplateRef, type PropType } from 'vue'
import type { FormInstance } from '@arco-design/web-vue'
import LoadingButton from '@/components/LoadingButton/index.vue'
import { useVModel } from '@vueuse/core'
import { defineComponent, h } from 'vue'

export default defineComponent({
    name: 'SaveModal',
    setup() {
        const modelValue = defineModel<{
            name: string
        }>({
            required: true
        })

        const formRef = useTemplateRef<FormInstance>('formRef')

        const handleSubmit = async () => {
            await formRef.value?.validate()
            // emit('submit', modelValue.value)
        }

        return () => h('div', [
            h('a-form', {
                model: modelValue.value,
                ref: formRef
            }, [
                h('a-form-item', {
                    field: 'name',
                    tooltip: 'Please enter username',
                    label: 'Username'
                }, [
                    h('a-input', {
                        modelValue: modelValue.value?.name,
                        'onUpdate:modelValue': (value: string) => {
                            if (modelValue.value) {
                                modelValue.value.name = value
                            }
                        },
                        placeholder: 'please enter your username...'
                    })
                ]),
                h('a-form-item', [
                    h(LoadingButton, {
                        'html-type': 'submit',
                        onClick: handleSubmit
                    }, 'Submit')
                ])
            ])
        ])
    }
})
