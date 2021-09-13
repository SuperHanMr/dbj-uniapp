import dayjs from "dayjs";

export function formatDate(timestamp){
	return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')
}
