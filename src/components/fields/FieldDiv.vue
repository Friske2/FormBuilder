<template>
    <div :class="props.props.className" :style="props.props.style"><slot></slot></div>
</template>
<script lang="ts" setup>
interface FieldSpanProp {
props: {
    [key: string]: any;
  };
}
const props = defineProps<FieldSpanProp>();
</script>