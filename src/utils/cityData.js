import {getProvinceCityTree} from "../api/home.js"
async function getAdcodeFromAreaId(adCode) {
	let cityData=[]
	let cityres= uni.getStorageSync('cityData');
	if(cityres){
		cityData=JSON.parse(cityres);
	}else{
		cityData=  await getProvinceCityTree();
		uni.setStorageSync('cityData',JSON.stringify(cityData));
	}
	
	
	let list = []
	for (let index = 0; index < cityData.length; index++) {
		const element = cityData[index];
		if (element.adCode) {
			list.push({
				provinceId: element.id,
				name: element.name,
				adCode: element.adCode
			});
		}
		if (element.children && element.children.length) {
			element.children.forEach((e) => {
				list.push({
					provinceId: element.id,
					cityId: e.id,
					name: e.name,
					adCode: e.adCode
				})
				if (e.children && e.children.length) {
					e.children.forEach(m => {
						list.push({
							provinceId: element.id,
							cityId: e.id,
							areaId: m.id,
							name: e.name + m.name,
							adCode: m.adCode
						})
					})
				}
			})
		}

	}
console.log(list);
	return list.find(e => {
		return e.adCode == adCode
	})

}

export {
	getAdcodeFromAreaId
}
