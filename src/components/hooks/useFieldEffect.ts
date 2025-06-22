import type { Schema, FormType, effects } from "../../types/Schema";
import { watch, onBeforeUnmount } from "vue";
const useFieldEffects = (fields: Schema, form: FormType) => {
    const effectMap: Record<string, effects[]> = {};
    const unwatchList: (() => void)[] = []
    fields.forEach((field) => {
        if (field.effects && field.effects.length > 0) {
            effectMap[field.code] = field.effects;
        }
    });

    const originalOptions: Record<
        string,
        {
            value: string | number;
            label: string;
            parent?: string | number;
        }[]
    > = {};

    Object.entries(effectMap).forEach(([sourceCode, effects]) => {
        const stop = watch(
            () => form[sourceCode],
            (newVal: string | number | undefined) => {
                effects.forEach(
                    (effect) => {
                        if (effect.actionType === "FILTER_OPTIONS") {
                            // คืนค่า เดิมก่อน filter
                            console.log("originalOptions", originalOptions);
                            // clear form.targetCode
                            if (form.hasOwnProperty(effect.target)) {
                                form[effect.target] = null;
                            }
                            const targetField = fields.find((f) => f.code === effect.target);
                            if (
                                targetField &&
                                targetField.is === "select" &&
                                originalOptions[effect.target] == undefined
                            ) {
                                // const originalOptions = targetField.props.options || [];
                                // กรอง options ตามเงื่อนไข
                                originalOptions[effect.target] =
                                    targetField.props.options || [];
                                // targetField.props.options = filteredOptions;
                            } else {
                                // reset options to original
                                if (targetField && targetField.props) {
                                    targetField.props.options =
                                        originalOptions[effect.target] || [];
                                }
                            }
                            // กรอง options ตามค่าใหม่
                            if (targetField && targetField.is === "select") {
                                const options = targetField.props.options || [];
                                targetField.props.options = options.filter(
                                    (option) => option.parentId === newVal
                                );
                            }
                            console.log("effect", effect);
                        }
                    },
                    { immediate: true } // หรือไม่ก็ได้
                );
            }
        );
        // เก็บ stop function เพื่อให้สามารถหยุดการ watch ได้ในอนาคต
        unwatchList.push(stop);
    });

    onBeforeUnmount(() => {
        // หยุดการ watch ทั้งหมดเมื่อ component ถูกทำลาย
        unwatchList.forEach((stop) => stop());
    })
};

export default useFieldEffects;
