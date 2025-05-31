<template>
    <span :style="props.style">{{ props.content }}</span>
</template>
<script lang="ts" setup>
const props = defineProps<{
    content: string | undefined | null;
    style?: Record<string, any>;
}>();
</script>