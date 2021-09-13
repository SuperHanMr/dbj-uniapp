import dayjs from "dayjs";

export function formatDate(timestamp){
	
	let format = 'YYYY-MM-DD HH:mm:ss';
	if(!timestamp){
		return ''
	}
	
	if(arguments[1]){
		format=arguments[1]
	}
	return dayjs(timestamp).format(format)
}
