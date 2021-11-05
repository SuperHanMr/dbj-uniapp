import dayjs from "dayjs";

export function formatDate(timestamp){
	
	let format = 'YYYY-MM-DD HH:mm:ss';
	if(!timestamp){
		return ''
	}
	
	if(arguments[1]){
		format=arguments[1]
	}
	timestamp=Number(timestamp);
	return dayjs(timestamp).format(format)
}

export function imgFormat(imgUrl){
	if(!imgUrl){
		return ''
	}
	return imgUrl+`?x-oss-process=image/resize,m_mfit,w_686,h_686`
}