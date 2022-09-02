import axios from "axios";

import {
	dashboardInfo,
	usersTable
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

export const usersTableAction = () => {
	return async (dispatch) => {
		try {
			const info = await axios.get("admin/users");
            dispatch(usersTable(info.data));
            console.log("INFO",info);
		} catch (error) {
			console.error(e);
		}
	};
};