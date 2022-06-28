<script>
import { getMonthDayMatrix } from 'z-date-matrix'

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
    selectDate({ dateStr, year, month, date }) {
      if(year < 2002 || year > 2052) return

      this.year = year
      this.month = month
      this.date = date

      this.viewYear = year
      this.viewMonth = month

      if(this.withTime) return

      this.$emit('update:time', new Date(dateStr).getTime())
      this.$emit('select')
    },
    incrementMonth(count) {
      if(count === -1 && this.viewYear === 2002 && this.viewMonth === 1) return
      if(count === 1 && this.viewYear === 2052 && this.viewMonth === 12) return

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
      if(count === -1 && this.viewYear === 2002) return
      if(count === 1 && this.viewYear === 2052) return

      this.viewYear += count
    },
    selectToday() {
      const d = new Date()
      this.viewYear = d.getFullYear()
      this.viewMonth = d.getMonth() + 1

      this.year = this.viewYear
      this.month = this.viewMonth
      this.date = d.getDate()

      if(this.withTime) return
      
      this.$emit('update:time', d.getTime())
      this.$emit('select')
    },
    selectThisMonth() {
      const d = new Date()
      this.viewYear = d.getFullYear()
      this.viewMonth = d.getMonth() + 1
    },
    selectHour(hour) {
      this.hour = hour
    },
    selectMinute(minute) {
      this.minute = minute
    },
    confirm() {
      this.viewYear = this.year
      this.viewMonth = this.month
      this.data = this.data

      console.log(new Date(this.year, this.month, this.date, this.hour, this.minute).getTime())

      this.$emit('update:time', new Date(this.year, this.month, this.date, this.hour, this.minute).getTime())
      this.$emit('select')
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
      return getMonthDayMatrix(this.viewYear, this.viewMonth)
    },
  },
}
</script>

<template>
  <div class="z-date-picker">
    <div class="z-date-picker-wrapper">
      <div class="z-date-picker-date" :style="{ 'border-right-width': withTime ? '1px' : '0' }">
        <div class="z-date-picker-date-header">
          <svg :class="{ 'disable': viewYear === 2002 }" @click="incrementYear(-1)" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M9.134 2.2c.266.267.266.7 0 .967L4.313 8l4.82 4.833c.267.267.267.7 0 .967a.68.68 0 0 1-.964 0L2.866 8.483a.685.685 0 0 1 0-.966L8.17 2.2a.68.68 0 0 1 .965 0Zm4 0c.266.267.266.7 0 .967L8.313 8l4.82 4.833c.267.267.267.7 0 .967a.68.68 0 0 1-.964 0L6.866 8.483a.685.685 0 0 1 0-.966L12.17 2.2a.68.68 0 0 1 .965 0Z" fill="#646A73" fill-rule="evenodd"/></svg>
          <svg :class="{ 'disable': viewYear === 2002 && viewMonth === 1 }" @click="incrementMonth(-1)" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M11.134 2.2c.266.267.266.7 0 .967L6.313 8l4.82 4.833c.267.267.267.7 0 .967a.68.68 0 0 1-.964 0L4.866 8.483a.685.685 0 0 1 0-.966L10.17 2.2a.68.68 0 0 1 .965 0Z" fill="#646A73" fill-rule="evenodd"/></svg>
          <div class="z-date-picker-date-header-year-month">
            <span class="z-date-picker-date-header-year-month-year">{{ viewYear }}</span>
            <span>年</span>
            <span class="z-date-picker-date-header-year-month-month">{{ viewMonth }}</span>
            <span>月</span>
          </div>
          <svg :class="{ 'disable': viewYear === 2052 && viewMonth === 12 }" @click="incrementMonth(1)" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M4.866 2.2a.685.685 0 0 0 0 .967L9.687 8l-4.82 4.833a.685.685 0 0 0 0 .967.68.68 0 0 0 .964 0l5.303-5.317a.685.685 0 0 0 0-.966L5.83 2.2a.68.68 0 0 0-.965 0Z" fill="#646A73" fill-rule="evenodd"/></svg>
          <svg :class="{ 'disable': viewYear === 2052 }" @click="incrementYear(1)" xmlns="http://www.w3.org/2000/svg" width="16" height="16"><path d="M6.866 2.2a.685.685 0 0 0 0 .967L11.687 8l-4.82 4.833a.685.685 0 0 0 0 .967.68.68 0 0 0 .964 0l5.303-5.317a.685.685 0 0 0 0-.966L7.83 2.2a.68.68 0 0 0-.965 0Zm-4 0a.685.685 0 0 0 0 .967L7.687 8l-4.82 4.833a.685.685 0 0 0 0 .967.68.68 0 0 0 .964 0l5.303-5.317a.685.685 0 0 0 0-.966L3.83 2.2a.68.68 0 0 0-.965 0Z" fill="#646A73" fill-rule="evenodd"/></svg>
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
                { 'disable': d.year < 2002 || d.year > 2052 }
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
            <span @click="selectHour(n - 1)" v-for="n of 24" :key="n" :class="{ 'active': n - 1 === hour }">{{ (n - 1).toString().padStart(2, 0) }}</span>
          </div>
          <div class="z-date-picker-time-wrapper-minute">
            <span @click="selectMinute(n - 1)" v-for="n of 60" :key="n" :class="{ 'active': n - 1 === minute }">{{ (n - 1).toString().padStart(2, 0) }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="z-date-picker-date-shortcut">
      <span class="z-date-picker-date-shortcut-today" @click="selectToday">今天</span>
      <span v-if="withTime" class="z-date-picker-date-shortcut-month" @click="selectThisMonth">本月</span>
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

        &:hover {
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

        &.disable {
          cursor: not-allowed;
        }

        &:hover {
          background-color: #F6F6F6;
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

        &:hover {
          opacity: .7;
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
