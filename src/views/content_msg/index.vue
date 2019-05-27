<template>

    <div class="content-container">
        
         <el-row type="flex" justify="center">
            <el-col :span="22"><div> <h2>{{title}}</h2> </div></el-col>
        </el-row>       
         <el-row type="flex" justify="center">
            <el-col :span="22"><div v-html="msg"> </div></el-col>
        </el-row>
        <!-- 工具栏 -->
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="6"><div >阅读权限：{{read_permission}}</div></el-col>
            <el-col :span="6"><div ><el-button type="text" icon="el-icon-edit" size="medium"  @click="getMsg">编辑</el-button></div></el-col>
        </el-row>
    </div>
</template>


<script>

export default {

  data() {
    return {
        msg: ' <p>参考消息网4月21日报道韩国媒体称，美国“信息技术（IT）巨头企业”之间30万亿韩元（100韩元约合0.6元人民币）规模的专利诉讼在庭审第一天戏剧性地达成协议。苹果和高通16日（当地时间）发表联合声明称：“两家公司就专利诉讼达成了协议，决定取消全世界范围内的各种法律诉讼。”</p><p>　　韩国《东亚日报》4月18日报道称，至此，两家公司的专利纠纷画上了句号。有人预测，苹果最快将在今年内推出首款搭载高通5G调制解调器芯片的5G版本iPhone。</p><p>　　报道称，全球电子业界的解释是，代表美国的两家IT公司为了不在新开的5G市场落后于竞争对手，选择了“和解”，而不是“悬崖决战”。三星电子本月初在世界上首次推出“Galaxy S10 5G”机型，率先进入5G市场，苹果的危机感达到了高潮。</p><p>　　报道指出，有分析认为，尤其是在美国总统特朗普连日强硬要求抢占5G市场的情况下，美国公司之间不能继续争斗的氛围也产生了影响。韩国电子业界相关人士解释说：“特朗普总统连日来不断发出‘必须在5G竞争中取得胜利’的信息，所以两家公司也不得不尽快达成协议。”</p><p>　　据报道，实际上，当天在美国加利福尼亚州圣迭戈联邦法院进行的庭审在辩论开始几个小时后就达成了协议。虽然具体金额及合约条件尚未公开，但据悉，苹果决定一次性向高通支付一定金额的专利费，双方已就签署“延长两年”选项的6年授权合同达成一致。此次协议自2019年4月1日起生效。</p><p>　　报道认为，通过此次协议，高通将维持现有的技术使用费收益模式，并重新确保高端智能手机行业的巨头苹果成为公司旗下客户。</p><p>　　报道称，从2011年开始一直在iPhone上使用高通芯片的苹果于2017年与高通展开专利纷争，并在去年推出的iPhone最新机型上使用了英特尔芯片。不过，随着本月初5G市场的正式开启，苹果也不再游刃有余。目前，能够制造5G调制解调器芯片的公司只有高通、三星电子和中国企业华为，而英特尔的研发依然处于停滞状态。</p><p>　　报道指出，英特尔公司的5G调制解调器芯片开发起步较晚，与高通的纷争也持续时间较长，外界一直担心苹果会不会在新开启的5G版手机中处于落后位置。此外，华为16日还公开提议“有意向苹果提供5G芯片”。</p><p>　　报道称，在高通与苹果当天达成协议后，英特尔随即宣布，将退出5G智能手机调制解调器业务，专注于5G网络业务。有猜测称，美国国防部等政府部门是否出面说服高通和苹果之间达成协议。《今日美国报》解读称，“高通和苹果在适应新时代，引领5G创新方面应该可以更加积极应对。”</p><p>　　报道指出，另一方面，分析人士认为，苹果比预期更快进入5G市场，对三星电子等厂商来说也并非坏事。韩国通信业界相关人士解释称：“只有‘玩家’迅速增加，市场才会随之迅速扩大。如果继三星电子之后苹果加入进来，全球通信公司的投资也会增加，消费者也会增加，这将成为停滞的智能手机市场新的增长动力。”</p><p><br/></p> '
        ,
        title: '这是一个标题',
        read_permission: '老师'
    }
  },
  mounted() {
    let obj = this.$store.getters.row
    this.title = obj.name
    this.msg = obj.content
    this.read_permission = obj.tag
    console.log("显示页面", obj)
  },
  methods: {
    getMsg () {      
      let msgObj = this.$store.getters.row
      // this.$router.push({ path: '/tools/ueditor' })
      this.$store.dispatch('PassValue', msgObj).then(() => {
        // 登录成功跳转页面
        this.$router.push({ path: '/tools/ueditor' })
      }).catch(() => {
        // this.loading = false
      })       
    }
  }
}
</script>

<style>
  .content-container {
    padding: 20px;
    background-color: rgb(240, 242, 245);
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

    .row-bg {
    padding: 10px 0;

  }
</style>
