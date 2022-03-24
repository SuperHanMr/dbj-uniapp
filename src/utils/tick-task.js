
const callbacks = [];
let interval = null;

function startTimer() {
  if (interval) {
    return;
  }
  interval = setInterval(() => {
    callbacks.forEach(cb => cb());
  }, 1000)
}

function stopTimer() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
}
/**
 * 添加定时回调任务，添加任务如果无用时，一定要移除
 * @param {function} fn 
 * @returns 
 */
export function addTask(fn) {
  console.log("tick task length:", callbacks.length);
  if (callbacks.length > 100) {
    // 太多就清除比较早的20个，防止有人只加不清
    callbacks.splice(0, 20);
  }
  callbacks.push(fn);
  startTimer();
  return function() {
    removeTask(fn);
  }
}

export function removeTask(fn) {
  let idx = callbacks.indexOf(fn);
  if (idx >= 0) {
    callbacks.splice(idx, 1);
  }
  if (callbacks.length) {
    stopTimer();
  }
}

export function clearAllTask() {
  callbacks.length = 0;
  stopTimer();
}