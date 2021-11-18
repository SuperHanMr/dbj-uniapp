const baseUrl = process.env.VUE_APP_BASE_API;
let logId = "default-" + new Date().getTime();


export function setLogId(id) {
  logId = id;
}

// 后端记录一下日志
export function log(data) {
  uni.request({
    url: `${baseUrl}/api/alive`,
    data: {
      logId: logId,
      ...data
    }
  });
};
