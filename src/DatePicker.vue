<script>
import { getMonthDayMatrix } from 'z-date-matrix'

function getTimeDetail(time) {
  const d = new Date(time)

  return {
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    date: d.getDate(),
    hour: d.getHours(),
    minute: d.getMinutes(),
  }
}

export default {
  props: {
    time: {
      type: Number,
      default: new Date().getTime()
    },
    withTime: {
      type: Boolean,
      default: false,
    },
    maxTime: {
      type: Number,
      default: new Date(2052, 11, 31).getTime(),
    },
    minTime: {
      type: Number,
      default: new Date(2002, 0, 1).getTime(),
    },
  },
  data() {
    return {
      weekdays: Object.freeze(['日', '一', '二', '三', '四', '五', '六']),
      viewYear: new Date(this.time).getFullYear(),
      viewMonth: new Date(this.time).getMonth() + 1,
      year: new Date(this.time).getFullYear(),
      month: new Date(this.time).getMonth() + 1,
      date: new Date(this.time).getDate(),
      hour: new Date(this.time).getHours(),
      minute: new Date(this.time).getMinutes(),
    }
  },
  methods: {
    selectDate({ dateStr, year, month, date, disable }) {
      if(disable) return

      this.year = year
      this.month = month
      this.date = date

      this.viewYear = year
      this.viewMonth = month

      if(this.withTime) {
        if(this.year === this.minTimeDetail.year && this.month === this.minTimeDetail.month && this.date === this.minTimeDetail.date && this.hour < Number(this.minTimeDetail.hour)) {
          this.hour = Number(this.minTimeDetail.hour)
        }
  
        if(this.year === this.minTimeDetail.year && this.month === this.minTimeDetail.month && this.date === this.minTimeDetail.date && this.hour === Number(this.minTimeDetail.hour) && this.minute < Number(this.minTimeDetail.minute)) {
          this.minute = Number(this.minTimeDetail.minute)
        }

        if(this.year === this.maxTimeDetail.year && this.month === this.maxTimeDetail.month && this.date === this.maxTimeDetail.date && this.hour > Number(this.maxTimeDetail.hour)) {
          this.hour = Number(this.maxTimeDetail.hour)
        }
  
        if(this.year === this.maxTimeDetail.year && this.month === this.maxTimeDetail.month && this.date === this.maxTimeDetail.date && this.hour === Number(this.maxTimeDetail.hour) && this.minute > Number(this.maxTimeDetail.minute)) {
          this.minute = Number(this.maxTimeDetail.minute)
        }
      }


      if(this.withTime) return

      this.$emit('update:time', new Date(dateStr).getTime())
      this.$emit('select')
    },
    incrementMonth(count) {
      if(this.viewYear === this.maxTimeDetail.year && this.viewMonth + count > this.maxTimeDetail.month) return

      if(this.viewYear === this.minTimeDetail.year && this.viewMonth + count < this.minTimeDetail.month) return

      if(this.viewMonth + count > 12) {
        this.viewYear += 1
        this.viewMonth = 1
      }
      if(this.viewMonth + count < 1) {
        this.viewYear -= 1
        this.viewMonth = 12
      }
      this.viewMonth += count
    },
    incrementYear(count) {
      if(this.viewYear + count > this.maxTimeDetail.year) return
      if(this.viewYear + count < this.minTimeDetail.year) return
      this.viewYear += count
    },
    selectToday() {
      if(this.disableToday) return

      const d = new Date()

      this.viewYear = d.getFullYear()
      this.viewMonth = d.getMonth() + 1
      

      this.year = this.viewYear
      this.month = this.viewMonth
      this.date = d.getDate()

      if(this.year === this.minTimeDetail.year && this.month === this.minTimeDetail.month && this.date === this.minTimeDetail.date && this.hour < Number(this.minTimeDetail.hour)) {
        this.hour = Number(this.minTimeDetail.hour)
      }

      if(this.year === this.minTimeDetail.year && this.month === this.minTimeDetail.month && this.date === this.minTimeDetail.date && this.hour === Number(this.minTimeDetail.hour) && this.minute < Number(this.minTimeDetail.minute)) {
        this.minute = Number(this.minTimeDetail.minute)
      }

      if(this.withTime) return
      
      this.$emit('update:time', d.getTime())
      this.$emit('select')
    },
    selectThisMonth() {
      if(this.disableMonth) return

      const d = new Date()
      this.viewYear = d.getFullYear()
      this.viewMonth = d.getMonth() + 1
    },
    selectHour(hour) {
      if(this.isDisableHour(hour)) return
      this.hour = hour
    },
    selectMinute(minute) {
      if(this.isDisableMinute(minute)) return
      this.minute = minute
    },
    confirm() {
      this.viewYear = this.year
      this.viewMonth = this.month
      this.date = this.date

      this.$emit('update:time', new Date(this.year, this.month - 1, this.date, this.hour, this.minute).getTime())
      this.$emit('select')
    },
    isDisableHour(hour) {
      if(this.year === this.maxTimeDetail.year && this.month === this.maxTimeDetail.month && this.date === this.maxTimeDetail.date && hour > Number(this.maxTimeDetail.hour)) return true
      if(this.year === this.minTimeDetail.year && this.month === this.minTimeDetail.month && this.date === this.minTimeDetail.date && hour < Number(this.minTimeDetail.hour)) return true
      return false
    },
    isDisableMinute(minute) {
      if(this.year === this.maxTimeDetail.year && this.month === this.maxTimeDetail.month && this.date === this.maxTimeDetail.date && this.hour === Number(this.maxTimeDetail.hour) && minute > Number(this.maxTimeDetail.minute)) return true
      if(this.year === this.minTimeDetail.year && this.month === this.minTimeDetail.month && this.date === this.minTimeDetail.date && this.hour === Number(this.minTimeDetail.hour) && minute < Number(this.minTimeDetail.minute)) return true
      return false
    },
  },
  computed: {
    curdayDateStr() {
      return `${this.year}-${this.month}-${this.date}`
    },
    todayDateStr() {
      const d = new Date()
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}` 
    },
    dayMartix() {
      return getMonthDayMatrix(this.viewYear, this.viewMonth).map((week) => {
        week = week.map((day) => {
          let disable = false

          if(day.year > this.maxTimeDetail.year) {
            disable = true
          }

          if(day.year === this.maxTimeDetail.year && day.month > this.maxTimeDetail.month) {
            disable = true
          }

          if(day.year === this.maxTimeDetail.year && day.month === this.maxTimeDetail.month && day.date > this.maxTimeDetail.date) {
            disable = true
          }

          if(day.year < this.minTimeDetail.year) {
            disable = true
          }

          if(day.year === this.minTimeDetail.year && day.month < this.minTimeDetail.month) {
            disable = true
          }

          if(day.year === this.minTimeDetail.year && day.month === this.minTimeDetail.month && day.date < this.minTimeDetail.date) {
            disable = true
          }

          day['disable'] = disable

          return day
        })

        return week
      })
    },
    maxTimeDetail() {
      return getTimeDetail(this.maxTime)
    },
    minTimeDetail() {
      return getTimeDetail(this.minTime)
    },
    disableToday() {
      const d = new Date().getTime()

      const { year, month, date } = getTimeDetail(d)

      if(year > this.maxTimeDetail.year) return true

      if(year === this.maxTimeDetail.year && month > this.maxTimeDetail.month) return true

      if(year === this.maxTimeDetail.year && month === this.maxTimeDetail.month && date > this.maxTimeDetail.date) return true

      if(year < this.minTimeDetail.year) return true

      if(year === this.minTimeDetail.year && month < this.minTimeDetail.month) return true

      if(year === this.minTimeDetail.year && month === this.minTimeDetail.month && date < this.minTimeDetail.date) return true

      return false
    },
    disableMonth() {
      const d = new Date().getTime()

      const { year, month } = getTimeDetail(d)

      if(year > this.maxTimeDetail.year) return true

      if(year === this.maxTimeDetail.year && month > this.maxTimeDetail.month) return true

      if(year < this.minTimeDetail.year) return true

      if(year === this.minTimeDetail.year && month < this.minTimeDetail.month) return true

      return false
    },
  },
  watch: {
    time(val) {
      const d = new Date(val)
      this.viewYear = d.getFullYear()
      this.viewMonth = d.getMonth() + 1
      this.year = d.getFullYear()
      this.month = d.getMonth() + 1
      this.date = d.getDate()
      this.hour = d.getHours()
      this.minute = d.getMinutes()
    },
  },
}
</script>

<template>
  <div class="z-date-picker">
    <div class="z-date-picker-wrapper">
      <div class="z-date-picker-date" :style="{ 'border-right-width': withTime ? '1px' : '0' }">
        <div class="z-date-picker-date-header">
          <svg :class="{ 'disable': viewYear === minTimeDetail.year }" @click="incrementYear(-1)" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M9.134 2.2c.266.267.266.7 0 .967L4.313 8l4.82 4.833c.267.267.267.7 0 .967a.68.68 0 0 1-.964 0L2.866 8.483a.685.685 0 0 1 0-.966L8.17 2.2a.68.68 0 0 1 .965 0Zm4 0c.266.267.266.7 0 .967L8.313 8l4.82 4.833c.267.267.267.7 0 .967a.68.68 0 0 1-.964 0L6.866 8.483a.685.685 0 0 1 0-.966L12.17 2.2a.68.68 0 0 1 .965 0Z" fill="#646A73" fill-rule="evenodd"/></svg>
          <svg :class="{ 'disable': viewYear === minTimeDetail.year && viewMonth === minTimeDetail.month }" @click="incrementMonth(-1)" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M11.134 2.2c.266.267.266.7 0 .967L6.313 8l4.82 4.833c.267.267.267.7 0 .967a.68.68 0 0 1-.964 0L4.866 8.483a.685.685 0 0 1 0-.966L10.17 2.2a.68.68 0 0 1 .965 0Z" fill="#646A73" fill-rule="evenodd"/></svg>
          <div class="z-date-picker-date-header-year-month">
            <span class="z-date-picker-date-header-year-month-year">{{ viewYear }}</span>
            <span>年</span>
            <span class="z-date-picker-date-header-year-month-month">{{ viewMonth }}</span>
            <span>月</span>
          </div>
          <svg :class="{ 'disable': viewYear === maxTimeDetail.year && viewMonth === maxTimeDetail.month }" @click="incrementMonth(1)" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M4.866 2.2a.685.685 0 0 0 0 .967L9.687 8l-4.82 4.833a.685.685 0 0 0 0 .967.68.68 0 0 0 .964 0l5.303-5.317a.685.685 0 0 0 0-.966L5.83 2.2a.68.68 0 0 0-.965 0Z" fill="#646A73" fill-rule="evenodd"/></svg>
          <svg :class="{ 'disable': viewYear === maxTimeDetail.year }" @click="incrementYear(1)" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M6.866 2.2a.685.685 0 0 0 0 .967L11.687 8l-4.82 4.833a.685.685 0 0 0 0 .967.68.68 0 0 0 .964 0l5.303-5.317a.685.685 0 0 0 0-.966L7.83 2.2a.68.68 0 0 0-.965 0Zm-4 0a.685.685 0 0 0 0 .967L7.687 8l-4.82 4.833a.685.685 0 0 0 0 .967.68.68 0 0 0 .964 0l5.303-5.317a.685.685 0 0 0 0-.966L3.83 2.2a.68.68 0 0 0-.965 0Z" fill="#646A73" fill-rule="evenodd"/></svg>
        </div>

        <div class="z-date-picker-date-week-header">
          <span v-for="(d, i) of weekdays" :key="i">{{ d }}</span>
        </div>

        <div class="z-date-picker-date-week-wrapper">
          <div class="z-date-picker-date-week-wrapper-item" v-for="(w, i) of dayMartix" :key="i">
            <span
              v-for="(d, i) of w"
              :key="i"
              :class="[
                'z-date-picker-date-week-wrapper-day',
                { 'other-month': d.inOtherMonth },
                { 'today': d.dateStr === todayDateStr },
                { 'focus': d.dateStr === curdayDateStr },
                { 'disable': d.disable },
              ]"
              @click="selectDate(d)"
            >
              {{ d.date }}
            </span>
          </div>
        </div>
      </div>
      <div class="z-date-picker-time" v-if="withTime">
        <div class="z-date-picker-time-header">{{ `${hour.toString().padStart(2, 0)}:${minute.toString().padStart(2, 0)}` }}</div>
        <div class="z-date-picker-time-wrapper">
          <div class="z-date-picker-time-wrapper-hour">
            <span @click="selectHour(n - 1)" v-for="n of 24" :key="n" :class="{ 'active': n - 1 === hour, 'disable': isDisableHour(n - 1) }">{{ (n - 1).toString().padStart(2, 0) }}</span>
          </div>
          <div class="z-date-picker-time-wrapper-minute">
            <span @click="selectMinute(n - 1)" v-for="n of 60" :key="n" :class="{ 'active': n - 1 === minute, 'disable': isDisableMinute(n - 1) }">{{ (n - 1).toString().padStart(2, 0) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="z-date-picker-date-shortcut">
      <span :class="['z-date-picker-date-shortcut-today', { 'disable': disableToday }]" @click="selectToday">今天</span>
      <span v-if="withTime" :class="['z-date-picker-date-shortcut-month', { 'disable': disableMonth }]" @click="selectThisMonth">本月</span>
      <el-button v-if="withTime" size="mini" type="primary" @click="confirm">确定</el-button>
    </div>
  </div>
</template>

<style lang="scss">
.z-date-picker {
  *, *::before, *::after {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: #DFE3E9;
    user-select: none;
  }

  height: 314px;
  display: flex;
  flex-direction: column;
  overflow: auto;

  &-wrapper {
    display: flex;
    overflow: auto;
  }

  &-date {
    box-sizing: border-box;
    width: 280px;

    &-header {
      height: 40px;
      border-bottom-width: 1px;
      padding: 0 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;

      svg {
        cursor: pointer;

        &.disable {
          cursor: not-allowed;

          path {
            opacity: .5;
          }
        }

        &:not(.disable):hover {
          path {
            fill: #000C25;
          }
        }
      }

      &-year-month {
        flex: 1;
        text-align: center;
        color: #000C25;
        font-size: 14px;
        font-weight: 500;

        &-year, &-month {
          cursor: pointer;
          display: inline-block;
          padding: 0 4px;

          &:hover {
            color: #0C58D2;
          }
        }
      }
    }

    &-week-header {
      display: flex;
      padding: 10px 24px 0 24px;
      justify-content: space-between;
      align-items: center;
      color: #000C25;
      font-weight: 500;
      font-size: 14px;
    }

    &-week-wrapper {
      padding: 10px 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      gap: 8px;

      &-item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      &-day {
        width: 24px;
        height: 24px;
        border-radius: 4px;
        font-size: 14px;
        transition: all .1s ease-in-out;
        cursor: pointer;
        color: #000C25;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          background-color: #F6F6F6;
        }

        &.disable {
          cursor: not-allowed;
          opacity: .4;
        }

        &.other-month {
          opacity: .4;
        }

        &.today {
          color: #0C58D2;
          border-width: 1px;
          border-color: #0C58D2;
        }

        &.focus {
          background-color: #0C58D2;
          color: #FFFFFF;
        }
      }
    }

    &-shortcut {
      height: 40px;
      padding: 0 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #0C58D2;
      font-size: 14px;
      gap: 40px;
      border-top-width: 1px;
      flex: none;

      &-today, &-month {
        cursor: pointer;

        &.disable {
          cursor: not-allowed;
          opacity: .5;
        }

        &:hover {
          opacity: .5;
        }
      }

      &-month {
        flex: 1;
        text-align: left;
      }
    }
  }

  &-time {
    width: 112px;
    display: flex;
    flex-direction: column;
    overflow: auto;

    &-header {
      height: 40px;
      border-bottom-width: 1px;
      display: flex;
      align-items: center;
      padding: 0 12px;
      color: #000C25;
      font-weight: 500;
      font-size: 14px;
    }

    &-wrapper {
      flex: 1;
      overflow: auto;
      display: flex;
      position: relative;

      &-hour {
        border-right-width: 1px;
      }

      &-hour, &-minute {
        flex: 1;
        height: 100%;
        overflow: auto;
        display: flex;
        flex-direction: column;
        
        span {
          flex: none;
          height: 33px;
          cursor: pointer;
          color: #000C25;
          font-size: 14px;
          font-weight: 500;
          padding: 0 10px;
          display: flex;
          align-items: center;

          &.disable {
            cursor: not-allowed;
            opacity: .5;
          }

          &.active {
            background-color: rgba(11, 87, 210, 0.1);
          }
          
          &:hover {
            background-color: #F6F6F6;
          }
        }
      }
    }
  }
}
</style>
