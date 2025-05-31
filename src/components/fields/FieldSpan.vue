<template>
    <span :style="props.style">{{ props.content }}</span>
</template>
<script lang="ts" setup>
interface FieldSpanProp {
    content: string | undefined | null;
    style?: Record<string, any>;
}
const props = defineProps<FieldSpanProp>();
</script>