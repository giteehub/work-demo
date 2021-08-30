<template>
  <!-- type="monthrange" -->
  <el-date-picker
    :picker-options="pickerOptions"
    v-model="searchTime"
    type="daterange"
    range-separator="至"
    @change="datePickerChange"
    start-placeholder="开始月份"
    end-placeholder="结束月份">
  </el-date-picker>
</template>

<script>
// import moment from "moment";

export default {
  name: 'Date',
  data() {
    return {
      searchTime: null,
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          console.log(maxDate, minDate)
        },
        // 返回true表示禁止选择
        // disabledDate: time => {
        //   // 禁止选择2020-1-1之前的时间
        //   let startFlag = new Date("2020-1-1").getTime() > time.getTime();
        //   // 禁止选择6月份之后的时间
        //   let endFlag = time.getTime() > moment().subtract(2, "month").endOf().toDate().getTime();
        //   return startFlag || endFlag;
        // }
      }
    }
  },
  methods: {
    datePickerChange(val) {
      console.log(val);
    }
  },
  watch: {
    searchTime (newVal, oldVal) {
      console.log(newVal, oldVal)
    }
  }
}
</script>

