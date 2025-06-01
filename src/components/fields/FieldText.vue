<template>
    <div :style="props.props.style">{{ props.props.content }}</div>
</template>
<script lang="ts" setup>
interface FieldSpanProp {
props: {
    [key: string]: any;
  };
}
const props = defineProps<FieldSpanProp>();
</script>