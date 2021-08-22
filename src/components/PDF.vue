<template>
  <div id="pdf-container">
    <el-button @click="handleExportPDF">导出PDF</el-button>
    <div id="pdf-table-container">
      <el-table
        :data="tableData1"
        border
        ref="pdfTable1"
        height="250"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          width="180"
        >
          <template slot-scope="{row}">
            <div class="green-tips" v-if="row.age == row.maxAge">
              <el-tooltip style="display:block;width:100%;height:100%"  content="该值是最大值，请关注">
                <span>{{row.age}}</span>
              </el-tooltip>
            </div>
            <div class="red-tips" v-else-if="row.age == row.minAge">
              <el-tooltip style="display:block;width:100%;height:100%"  content="该值是最小值，请关注">
                <span>{{row.age}}</span>
              </el-tooltip>
            </div>
            <div v-else>
              <span>{{row.age}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="score"
          label="分数"
        >
          <template slot-scope="{row}">
            <div class="green-tips" v-if="row.score == row.maxScore">
              <el-tooltip style="display:block;width:100%;height:100%"  content="该值是最大值，请关注">
                <span>{{row.score}}</span>
              </el-tooltip>
            </div>
            <div class="red-tips" v-else-if="row.score == row.minScore">
              <el-tooltip style="display:block;width:100%;height:100%"  content="该值是最小值，请关注">
                <span>{{row.score}}</span>
              </el-tooltip>
            </div>
            <div v-else>
              <span>{{row.score}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
      <el-table
        :data="tableData2"
        border
        height="250"
        ref="pdfTable2"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import htmlToPdf from '@/utils/htmlToPdf';
export default {
  name: 'PDF',
  data () {
    return {
      tableData1: [],
      tableData2: [{
        date: '2016-05-03',
        name: '王小虎11',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎22',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎33',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎44',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎55',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎66',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎77',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  created() {
    this.loadTableData();
  },
  methods: {
    async handleExportPDF() {
      // var tHeaderHeight = (this.$refs.pdfTable.$el.getElementsByClassName('el-table__header-wrapper')[0]).offsetHeight;
      // var tBodyHeight = (this.$refs.pdfTable.$el.getElementsByClassName('el-table__body-wrapper')[0]).scrollHeight;
      // cloneDom.style.height = (tHeaderHeight + tBodyHeight) + 'px';
      // cloneDom.getElementsByClassName('el-table__body-wrapper')[0].style.height = tBodyHeight + "px";
      // document.body.appendChild(cloneDom);

      // const image = await htmlToPdf.convertToImage(this.$refs.pdfTable.$el, {
      //   width: this.$refs.pdfTable.$el.offsetWidth,
      //   height: tHeaderHeight + tBodyHeight
      // });
      // return image;
      // document.body.removeChild(cloneDom);
      // document.body.appendChild(canvas)

      const imgData = await this.getImagesData();
      htmlToPdf.exportPDF(imgData);
    },
    async getImagesData() {
      var tHeaderHeight = (this.$refs.pdfTable1.$el.getElementsByClassName('el-table__header-wrapper')[0]).offsetHeight;
      var tBodyHeight = (this.$refs.pdfTable1.$el.getElementsByClassName('el-table__body-wrapper')[0]).scrollHeight;
      const images = await Promise.all([
        htmlToPdf.convertToImage(this.$refs.pdfTable1.$el, {
          width: this.$refs.pdfTable1.$el.offsetWidth,
          height: tHeaderHeight + tBodyHeight
        }),
        htmlToPdf.convertToImage(this.$refs.pdfTable2.$el, {
          width: this.$refs.pdfTable2.$el.offsetWidth,
          height: tHeaderHeight + tBodyHeight
        })
      ]);
      console.log(images);
      return images;
    },
    loadTableData() {
      var data = [{
        date: '2016-05-03',
        name: '王小虎1',
        address: '上海市普陀区金沙江路 1518 弄',
        age: 25,
        score: 80
      }, {
        date: '2016-05-02',
        name: '王小虎2',
        address: '上海市普陀区金沙江路 1518 弄',
        age: 28,
        score: 90
      }, {
        date: '2016-05-04',
        name: '王小虎3',
        address: '上海市普陀区金沙江路 1518 弄',
        age: 27,
        score: 100
      }, {
        date: '2016-05-01',
        name: '王小虎4',
        address: '上海市普陀区金沙江路 1518 弄',
        age: 29,
        score: 85
      }, {
        date: '2016-05-08',
        name: '王小虎5',
        address: '上海市普陀区金沙江路 1518 弄',
        age: 38,
        score: 75
      }, {
        date: '2016-05-06',
        name: '王小虎6',
        address: '上海市普陀区金沙江路 1518 弄',
        age: 21,
        score: 86
      }, {
        date: '2016-05-07',
        name: '王小虎7',
        address: '上海市普陀区金沙江路 1518 弄',
        age: 25,
        score: 99
      }];
      let {max:maxAge, min:minAge} =this.getMaxMinValue(data, "age");
      let {max:maxScore, min:minScore} =this.getMaxMinValue(data, "score");
      console.log(maxAge, minAge);
      data.forEach(row => {
        row.maxAge = maxAge;
        row.minAge = minAge;
        row.maxScore = maxScore;
        row.minScore = minScore;
      })
      this.tableData1 = data;
    },
    getMaxMinValue(data = [], key) {
      let arr = [];
      data.forEach(item => {
        arr.push(item[key])
      })
      let max = Math.max.apply(null, arr);
      let min = Math.min.apply(null, arr);
      return {
        max,
        min
      }
    }
  }
}
</script>

<style scoped>
#pdf-container{
  width: 800px;
  height: 860px;
}
.green-tips, .red-tips{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 12px 10px;
}
.green-tips{
  background: green;
}
.red-tips{
  background: red;
}
</style>
