import type { FormConfig } from "../../types/Schema";
import { reactive } from "vue";
const useConfigForm = () => {
    const config = reactive<FormConfig>({
        labelWidth: "150px",
        labelPosition: "left",
        showMessage: true,
        inline: false,
        size: "default",
    })
    return {
        config
    }
}

export default useConfigForm;