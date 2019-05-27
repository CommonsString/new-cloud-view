<script>
export default {
  /**
   * 它就是运用了重定向到 Redirect页面之后再重定向回原始页面的方法。
   */
  beforeCreate() {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>
