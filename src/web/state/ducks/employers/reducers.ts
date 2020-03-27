export const getEmployers = (state: any = null, action: any): {} => {
	switch (action.type) {
		case "getEmployersSuccess":
			return (state || action.payload) && { ...state, items: [ ...action.payload ] };

		default:
			return state;
	}
};