const merchantEntry = {
	state: {
		cityList: [],
	},
	getters: {
		getCityList(state) {
		  return state.cityList || [];
		}
	},
	actions: {
		setCityList(context, payload){
			context.state.cityList = payload.cityList;
		},
		deleteCity(context, payload){
			context.state.cityList = payload.cityList;
		}
	}
}

export default merchantEntry;