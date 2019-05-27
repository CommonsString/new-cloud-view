const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  name: state => state.user.name,
  createTime: state => state.user.createTime,
  email: state => state.user.email,
  roles: state => state.user.roles,
  loadMenus: state => state.user.loadMenus,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  socketApi: state => state.api.socketApi,
  // imagesUploadApi: state => state.api.imagesUploadApi,
  // updateAvatarApi: state => state.api.updateAvatarApi,
  // qiNiuUploadApi: state => state.api.qiNiuUploadApi,

  content: state => state.uedeitor.content,
  title: state => state.uedeitor.title,
  permission: state => state.uedeitor.permission,
  row: state => state.uedeitor.row,
  inportContent: state => state.uedeitor.inportContent,
  secondrow:state => state.uedeitor.secondRow,

  // 类型阅读
  typeId:state => state.typeread.typeId,
  readId:state => state.typeread.readId
}
export default getters
