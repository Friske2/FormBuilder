<template>
    <el-col :span="props.span">
        <slot></slot>
    </el-col>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
const props = defineProps<{
    span: number
}>();
</script>