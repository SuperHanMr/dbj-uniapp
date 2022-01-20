import dayjs from "dayjs";

export function formatDate(timestamp) {

	let format = 'YYYY-MM-DD HH:mm:ss';
	if (!timestamp) {
		return ''
	}

	if (arguments[1]) {
		format = arguments[1]
	}
	timestamp = Number(timestamp);
	return dayjs(timestamp).format(format)
}

export function imgFormat(imgUrl) {
	if (!imgUrl) {
		return ''
	}
	let imgWidth = 686;
	let imgHeight = 686;
	if (arguments[1]) {
		imgWidth = arguments[1]
	}
	if (arguments[2]) {
		imgHeight = arguments[2]
	}
	return imgUrl + `?x-oss-process=image/resize,m_mfit,w_${imgWidth},h_${imgHeight}`
}
// 防抖函数， 规定时间内触发，如果在计时时间内再次触发就能重新计时
export function debounce (fn, wait) {
  let timer;
  const debounced = function () {
    let result;
    let args = arguments;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      result = fn.apply(this, args)
    }, wait)
    return result;
  }
  debounced.cancel = function () {
    console.log('cace;')
    clearTimeout(timer);
    timer = null;
  }
  return debounced;
}
