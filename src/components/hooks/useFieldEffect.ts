import type { Schema, FormType, effects } from "../../types/Schema";
import { watch, onBeforeUnmount } from "vue";
const useFieldEffects = (fields: Schema, form: FormType) => {
  const effectMap: Record<string, effects[]> = {};
  const unwatchList: (() => void)[] = [];
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
  // handleFilterOptions
  const handleFilterOptions = function (
    effect: effects,
    newVal: string | number | undefined
  ) {
    // clear form.targetCode
    const targetField = fields.find((f) => f.code === effect.target);
    if (
      targetField &&
      targetField.is === "select" &&
      originalOptions[effect.target] == undefined
    ) {
      // const originalOptions = targetField.props.options || [];
      // กรอง options ตามเงื่อนไข
      originalOptions[effect.target] = targetField.props.options || [];
    } else {
      // reset options to original
      if (targetField && targetField.props) {
        targetField.props.options = originalOptions[effect.target] || [];
      }
    }
    // กรอง options ตามค่าใหม่
    if (targetField && targetField.is === "select") {
      const options = targetField.props.options || [];
      targetField.props.options = options.filter(
        (option) => option.parentId === newVal
      );
      let formTargetValue = form[effect.target];
      // ถ้า options หลังจาก filter ไม่มีค่า ให้
      if (
        targetField.props.options.find(
          (option) => option.value == formTargetValue
        ) == undefined
      ) {
        // clear form.targetCode
        form[effect.target] = null;
      }
    }
  };
  // handleSetValue
  const handleSetValue = function (
    sourceCode: string,
    effect: effects,
    newVal: string | number | undefined
  ) {
    const ownConfig = fields.find((f) => f.code === sourceCode);
    let options = new Array();
    if (ownConfig) {
      options = ownConfig.props.options || [];
    }
    //   console.log("ownConfig", ownConfig);
    if (form.hasOwnProperty(effect.target)) {
      // ถ้ามี ให้ตั้งค่า value ตามที่กำหนดใน effect
      const { valueField } = effect;
      if (valueField) {
        const targetValue = options.find((option) => option.value === newVal);
        if (targetValue) {
          form[effect.target] = targetValue[valueField];
          // console.log("targetValue", effect.target);
        }
      }
    }
  };
  Object.entries(effectMap).forEach(([sourceCode, effects]) => {
    const stop = watch(
      () => form[sourceCode],
      (newVal: string | number | undefined) => {
        effects.forEach(
          (effect) => {
            if (effect.actionType === "FILTER_OPTIONS") {
              handleFilterOptions(effect, newVal);
            } else if (effect.actionType === "SET_VALUE") {
              handleSetValue(sourceCode, effect, newVal);
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
  });
};

export default useFieldEffects;
