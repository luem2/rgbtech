import axios from "axios";

import {
	dashboardInfo
} from "./adminSlice";

export const dashboardAction = () => {
	return async (dispatch) => {
		try {
			const info = await axios.get("admin/dashboard");
            dispatch(dashboardInfo(info.data));
            console.log("INFO",info);
		} catch (error) {
			console.error(e);
		}
	};
};