import { ref } from 'vue'
import { type FieldInputProp } from "../../types/FieldProps"

type FieldInputEmit = (event: 'update:value', val: string | number) => void;
const useFieldInput = (props: FieldInputProp , emit:FieldInputEmit) => {
    const text = ref<string | number | null>(props.value ?? '')
    const updateValue = (val: string | number) => {
        text.value = val
        emit('update:value', val)
    }   
    if (props.value) {
        text.value = props.value;
    }
    return {
        text,
        updateValue,
    }
}
export default useFieldInput