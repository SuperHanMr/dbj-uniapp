const merchantEntry = {
	state: {
		cityList: [],
		accountInfo: {
			
		}
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