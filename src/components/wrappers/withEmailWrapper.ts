import { defineComponent,h } from 'vue'
import FieldInput from '../fields/FieldInput.vue'
function withEmailWrapper(OriginalComponent: any) {
    return defineComponent({
        props: {
            value: {
                type: [String, Number, null],
                default: null
            },
            props: {
                type: Object,
                default: () => ({})
            }
        },
        setup(props, { emit }) {
            const onUpdate = (val: any) => {
                emit('update:value', val)
            }
            return () => 
                h(OriginalComponent, {
                    props: props.props,
                    value: props.value,
                    'onUpdate:value': onUpdate,
                })
            
        }
    })
}

export const EmailWrapper = withEmailWrapper(FieldInput)