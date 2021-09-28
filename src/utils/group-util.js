import TIM from 'tim-wx-sdk'
import store from '@/store'

const state = store.state.message;
const dispatch = store.dispatch;
const commit = store.commit;

/**
 * 获取群消息提示文字
 * @param {Object} message
 */
function getTextFromGroupTipMessage(message, conversationID) {
  conversationID = conversationID || message.conversationID;
  const payload = message.payload;
  const isGustChat = conversationID === state.cstServConv.conversationID;
  const groupId = conversationID.replace(/^GROUP/, '');
  const memberList = state.groupMembersMap[groupId] || [];
  const getMemberName = userID => {
    let member = memberList.find(m => m.userID = userID);
    return member && member.nick ? member.nick : userID;
  };
  let userIDList = payload.userIDList || [];
  let groupProfile = payload.groupProfile || {};
  if (!userIDList.length && groupProfile.to) {
    userIDList = [groupProfile.to];
  }
  let text;
  if (isGustChat && payload.operationType === TIM.TYPES.GRP_TIP_MBR_JOIN) {
    let spports = [];
    let members = [];
    userIDList.forEach(id => {
      if (id !== state.currentIMUserId) {
        spports.push(getMemberName(id));
      } else {
        members.push(getMemberName(id));
      }
    })
    if (spports.length) {
      text = `客服${spports.join(",")}很高兴为您服务`;
      if (members.length) {
        text = text + ", " + `${members.join(",")} 进入会话`;
      }
      return text;
    } else {
      return `${members.join(",")} 进入会话`;
    }
  }

  switch (payload.operationType) {
    case TIM.TYPES.GRP_TIP_MBR_JOIN:
      return `${userIDList.map(getMemberName).join(
        ","
      )} ${isGustChat ? "进入会话" : "进入服务"}`;
    case TIM.TYPES.GRP_TIP_MBR_QUIT:
      return `${userIDList.map(getMemberName).join(
        ","
      )} ${isGustChat ? "退出会话" : "退出服务"}`;
    case TIM.TYPES.GRP_TIP_MBR_KICKED_OUT:
      return `${userIDList.map(getMemberName).join(
        ","
      )} ${isGustChat ? "退出会话" : "退出服务"}`;
    case TIM.TYPES.GRP_TIP_MBR_SET_ADMIN:
      return `${userIDList.map(getMemberName).join(
        ","
      )} 成为管理员`;
    case TIM.TYPES.GRP_TIP_MBR_CANCELED_ADMIN:
      return `${userIDList.map(getMemberName).join(
        ","
      )} 被撤销管理员`;
    case TIM.TYPES.GRP_TIP_GRP_PROFILE_UPDATED:
      return `${message.nick}修改群名称为“${message.payload.newGroupProfile.introduction}”`;
    case TIM.TYPES.GRP_TIP_MBR_PROFILE_UPDATED:
      return "服务成员资料修改";
    default:
      return "[服务群提示消息]";
  }
}

export {
  getTextFromGroupTipMessage
}