<template>
  <div class="tabs-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="root">
      <el-tab-pane label="用户管理" name="first">
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
        <p>用户管理</p>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>

<style scoped>
.tabs-container{
  height: 800px;
  border: 1px solid red;
}
.root {
  flex: auto;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
/deep/ .root .el-tabs__content {
  overflow-y: auto;
}
/deep/ .root .el-tabs__header{
  margin-bottom: 0;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/  
/deep/ .root .el-tabs__content::-webkit-scrollbar
{  
  width: 3px;  /*滚动条宽度*/
  height: 6px;  /*滚动条高度*/
}  
  
/*定义滚动条轨道 内阴影+圆角*/  
/deep/ .root .el-tabs__content::-webkit-scrollbar-track
{  
  box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
  border-radius: 10px;  /*滚动条的背景区域的圆角*/
  background-color: red;/*滚动条的背景颜色*/  
}  

/*定义滑块 内阴影+圆角*/
/deep/ .root .el-tabs__content::-webkit-scrollbar-thumb
{  
  border-radius: 10px;  /*滚动条的圆角*/
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
  background-color: green;  /*滚动条的背景颜色*/
} 
</style>