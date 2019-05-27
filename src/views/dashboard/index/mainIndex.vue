<template>
  <div  class="dashboard-editor-container">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="card kjfs">
          <p class="title"><i class="fa fa-th-large fa-lg"></i>快捷方式</p>
          <ul>

            <li><router-link to="/tools/pass" class="kjfs kjfs-yelloww"><span><i class="fa fa-leanpub fa-2x"></i></span><span>新闻编审</span></router-link></li>
            <li><router-link to="/msg/uploadmsg" class="kjfs kjfs-pinkk"><span><i class="fa fa-truck fa-2x"></i></span><span>新闻采集</span></router-link></li>

          </ul> 
          
          <ul>
            <li><router-link to="/tools/type" class="kjfs kjfs-bluee"><span><i class="fa fa-tint fa-2x"></i></span><span>类型管理</span></router-link></li>
            <li><router-link to="/tools/read" class="kjfs kjfs-grennn"><span><i class="fa fa-book fa-2x"></i></span><span>阅读管理</span></router-link></li>
          </ul>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="card dbsx">
          <p class="title"><i class="fa fa-stethoscope fa-lg"></i>数据总览</p>
          <ul>
            <li><router-link to="#"><span>待审文章</span><span class="num">{{notIsRight}}</span></router-link></li>
            <li><router-link to="#"><span>已审阅</span><span class="num">{{isRight}}</span></router-link></li>
          </ul>
          <ul>
            <li><router-link to="#"><span>今日采集</span><span class="num">{{newGet}}</span></router-link></li>
            <li><router-link to="#"><span>类型种类</span><span class="num">{{typeCount}}</span></router-link></li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <maintable id="maintable" @count="updateDate"></maintable>
      </el-col>
    </el-row>
  </div>
</template>

<script>

import Maintable from './maintable'
import { getMainIndex } from '@/api/uedeitor'
export default {
  name: 'mainIndex',
  components: {Maintable},
  data () {
    return {
      msg:10,
      isRight:0,
      notIsRight:0,
      newGet:0,
      typeCount:0
    }
  },
  created() {
    
  },
  mounted () {
    this.selfAdaption()
    getMainIndex().then(res => {
      console.log('测试2', res)
      if(res.isRight != null){
        this.isRight = res.isRight
      }
      if(res.notIsRight != null) {
        this.notIsRight = res.notIsRight
      }
      if(res.newGet != null) {
        this.newGet = res.newGet
      }
      if(res.typeCount != null) {
        this.typeCount = res.typeCount
      }      
    }).catch(err => {
      console.log(err.response.data.message)
    })
  },
  methods: {
    // echart自适应
    selfAdaption () {
      let that = this
      setTimeout(() => {
        window.onresize = function () {
          if (that.$refs.echarts) {
            that.$refs.echarts.chart.resize()
          }
        }
      }, 10)
    }, 
    updateDate(count) {
        if(this.isRight == 0 && this.notIsRight == 0) {
            this.isRight = 0
            this.notIsRight = 0
        } else if(this.isRight != 0 && this.notIsRight == 0) {
            this.notIsRight--
        } else if(this.isRight == 0 && this.notIsRight != 0) {
            this.isRight++
            this.notIsRight--
        } else if(this.isRight != 0 && this.notIsRight != 0){
          this.isRight++
          this.notIsRight--
        }
        console.log('this.isRight', this.isRight)
        console.log('this.notIsRight', this.notIsRight)

    }
  }
}
</script>

<style lang="scss">
  $top:top;
  $bottom:bottom;
  $left:left;
  $right:right;
  $leftright: ($left, $right);
  $pinkk: #eec2d3;
  $bluee: #409eff;
  $yelloww: #f4d884;
  $grennn: #89dda0;
  $purplee: #78a2ea;
  $lightBluee: #b8d6ff;
  .dashboard-editor-container {
    padding: 20px;
    background-color: rgb(240, 242, 245);
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  $list: bluee pinkk yelloww grennn purplee lightBluee;
  $list1: $bluee $pinkk $yelloww $grennn $purplee $lightBluee;
  %shadow{
    background: #fff;
    -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.2);
    border-color: rgba(0, 0, 0, 0.2);
     .title{
      font-size: 14px;
      padding: 10px;
      i{
        margin-#{$right}: 5px;
      }
    }
  }

  @mixin flex($direction:row,$content:space-between){
    display: flex;
    flex-direction: $direction;
    justify-content: $content;
  }
  .card{
    color: #666;
    @extend %shadow;

    ul{
      @include flex;
      li{
        flex: 1;
        list-style-type:none;
        a{
          color: #666666;
          align-items:center;
          padding-#{$top}: 20px;
          padding-#{$bottom}: 20px;
          @include flex(column);
          span{
            height: 44px;
          }
          .num{
            line-height: 18px;
            font-size: 30px;
            color: $bluee;
            margin: 0px;
          }
        }
        .kjfs-bluee{
          color: $bluee;
        }
        .kjfs-pinkk{
          color: $pinkk;
        }
        .kjfs-yelloww{
          color: $yelloww;
        }
        .kjfs-grennn{
          color: $grennn;
        }
        .kjfs-purplee{
          color: $purplee;
        }
        .kjfs-lightBluee{
          color: $lightBluee;
        }
        &:hover{
          .kjfs-bluee{
            color: #ffffff;
            background: $bluee;
          }
          .kjfs-pinkk{
            color: #ffffff;
            background: $pinkk;
          }
          .kjfs-yelloww{
            color: #ffffff;
            background: $yelloww;
          }
          .kjfs-grennn{
            color: #ffffff;
            background: $grennn;
          }
          .kjfs-purplee{
            color: #ffffff;
            background: $purplee;
          }
          .kjfs-lightBluee{
            color: #ffffff;
            background: $lightBluee;
          }
        }
      }
    }
    .table{
      padding: 21px;
      p{
        height: 52px;
        line-height: 52px;
        border: 1px solid #cccccc;
        overflow: hidden;
        border-#{$top}: none;
        @include flex( null,start);
        &:first-child{
          border-#{$top}: 1px solid #cccccc;
        }
        span{
        }
        .tit{
          width: 90px;
          min-width: 90px;
          height: 100%;
          text-align: center;
          border-#{$right}: 1px solid #cccccc;
          margin-#{$right}: 18px;
        }
        span.gitbox{
          flex: 1;
          height: 100%;
          overflow: hidden;
          @include flex(row,start);
          a{
            &:first-child{
              margin-#{$right}: 30px;
            }
          }
        }
      }
    }
  }
  #lineEcharts{
    margin-#{$top}: 30px;
    padding-#{$top}: 30px;
    @extend %shadow;
  }
  #maintable{
    margin-#{$top}: 30px;
    padding-#{$top}: 10px;
    @extend %shadow;
  }
</style>





