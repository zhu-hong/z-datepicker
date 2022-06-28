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
  <div class="w-screen h-screen flex justify-center bg-gray-900">
    <el-switch v-model="withTime">with time</el-switch>
    <el-popover v-model="show" :visible-arrow="false" popper-class="p-0">
      <span slot="reference" class="cursor-pointer text-gray-400">date-pick</span>
      <DatePicker :time.sync="time" :withTime="withTime" @select="show = false" />
    </el-popover>
  </div>
</template>

<style lang="scss">
</style>
