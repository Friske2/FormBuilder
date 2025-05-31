<template>
    <el-col :span="props.span">
        <slot></slot>
    </el-col>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
interface FieldColProp {
    span: number;
}

const props = defineProps<FieldColProp>();
</script>