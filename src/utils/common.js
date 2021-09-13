import dayjs from "dayjs";

export function formatDate(timestamp){
	return dayjs.unix(timestamp).format('YYYY-MM-DD HH:mm:ss')
}