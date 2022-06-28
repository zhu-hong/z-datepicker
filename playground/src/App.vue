<script>
import DatePicker from '../../src/DatePicker.vue'

export default {
  components: {
    DatePicker,
  },
  data() {
    return {
      time: new Date().getTime(),
      show: false,
      withTime: false,
    }
  },
}
</script>

<template>
  <div class="w-screen h-screen flex flex-col gap-8 items-center justify-center bg-gray-900">
    <div class="flex items-center gap-8">
      <el-switch v-model="withTime">with time</el-switch>
      <span class="text-gray-400">{{ time }}</span>
      <span class="text-gray-400">{{ new Date(time).toLocaleString() }}</span>
    </div>
    <el-popover v-model="show" :visible-arrow="false" popper-class="p-0">
      <span slot="reference" class="cursor-pointer text-gray-400">date-pick</span>
      <DatePicker :time.sync="time" :withTime="withTime" @select="show = false" />
    </el-popover>
  </div>
</template>

<style lang="scss">
</style>
