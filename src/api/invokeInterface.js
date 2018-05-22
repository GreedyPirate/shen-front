import ajaxRequest from 'common/js/ajax'

/**
 * 用户登录
 * @param data
 */
export function login(data) {
  return ajaxRequest('/user/login', data);
}

/**
 * 用户注册
 * @param data
 */
export function regist(data) {
  return ajaxRequest('/user/register', data, 'put');
}

/**
 * 侧边栏菜单
 */
export function loadSideMenu() {
  return ajaxRequest('/api/menu');
}

/**
 * 发送验证码
 */
export function sendMsg(data) {
  return ajaxRequest('/user/sendMsg', data);
}

/**
 * 侧边栏菜单
 */
export function loadArea() {
  return ajaxRequest('/api/area');
}

/**
 * 保存表单信息
 */
export function registForm(data) {
  return ajaxRequest('/regist/form', data);
}

/**
 * 上传附件
 */
export function upload() {
  return ajaxRequest('/regist/upload');
}

/**
 * 删除附件
 * @param data
 */
export function deleteFile(data) {
  return ajaxRequest('/regist/delete', data);
}

/**
 * 查询附件
 */
export function getAttachs(data) {
  return ajaxRequest('/regist/attachments',data,'get')
}

/**
 * 下载附件
 * @param data
 */
export function download(data) {
  return ajaxRequest('/regist/download', data)
}

/**
 * 查询档案信息
 */
export function getArchive() {
  return ajaxRequest('/regist/archives')
}

/**
 * 获取用户基本信息
 */
export function getUserInfo(data) {
  return ajaxRequest('user/base', data, 'get');
}

/**
 * 修改密码
 * @param data
 */
export function changePwd(data) {
  return ajaxRequest('user/modify/password', data)
}

/**
 * 设置邮箱
 * @param data
 */
export function changeEmail(data) {
  return ajaxRequest('user/modify/email', data)
}

/**
 * 设置头像
 * @param data
 */
export function uploadAvatarBase64(data) {
  return ajaxRequest('user/avatar/base64', data)
}

/**
 * 修改手机
 * @param data
 */
export function changePhone(data) {
  return ajaxRequest('user/modify/phone', data)
}

/**
 * 获取用户申请
 */
export function getUserHistory(data) {
  return ajaxRequest('busi/preview', data);
}

/**
 * 从办理任务里删除
 */
export function deleteRegister(data) {
  return ajaxRequest('busi/delete',data);
}

/**
 * 如果是从编辑页面进入，获取信息
 * @param data
 */
export function getEditRegister(data) {
  return ajaxRequest('/regist/editer', data,'get');
}

/**
 * 获取待办
 */
export function getTask() {
  return ajaxRequest('busi/tasks');
}

/**
 * 获取申请详情
 * @param data
 */
export function getDetail(data) {
  return ajaxRequest('/busi/detail', data,'get');
}

/**
 * 审批
 * @param data
 */
export function approve(data) {
  return ajaxRequest('/busi/approve', data);
}
