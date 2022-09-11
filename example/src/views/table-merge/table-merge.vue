<script setup lang="ts">
import { data, columns } from './mock.js';
import { useTableMerge } from '@el-ext/hooks';

const merge = useTableMerge(data, 'row');
</script>

<template>
  <div class="table-merge">
    <el-table ref="table" :data="data" :span-method="merge" border style="width: 100%">
      <el-table-column v-for="col in columns" :key="col.prop" :prop="col.prop" :label="col.label" align="center" />
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
.table-merge {
}
</style>
