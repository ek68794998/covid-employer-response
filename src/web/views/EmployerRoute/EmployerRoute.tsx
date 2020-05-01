import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";

import EmployerListPage from "../EmployerListPage/EmployerListPage";
import EmployerPage from "../EmployerPage/EmployerPage";

import { DefaultContextData, EmployerRouteContext, EmployerRouteContextData } from "./EmployerRouteContext";

interface Params {
	id?: string;
}

type Props = RouteComponentProps<Params>;

const EmployerRoute: React.FC<Props> = (props: Props): React.ReactElement => {
	const [ listViewMode, setListViewMode ] = useState(DefaultContextData.listViewMode);
	const [ pageIndex, setPageIndex ] = useState(DefaultContextData.pageIndex);
	const [ searchFilters, setSearchFilters ] = useState(DefaultContextData.searchFilters);

	const contextData: EmployerRouteContextData = {
		listViewMode,
		pageIndex,
		searchFilters,
		setListViewMode,
		setPageIndex,
		setSearchFilters,
	};

	const employerId: string | undefined = props.match.params.id;

	return (
		<EmployerRouteContext.Provider value={contextData}>
			{employerId ? <EmployerPage employerId={employerId} /> : <EmployerListPage />}
		</EmployerRouteContext.Provider>
	);
};

export default EmployerRoute;
