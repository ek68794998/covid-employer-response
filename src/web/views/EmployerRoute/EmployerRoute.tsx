import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";

import EmployerListPage from "../EmployerListPage/EmployerListPage";
import { EmployerListSearchFilter } from "../EmployerListSearch/EmployerListSearchFilter";
import EmployerPage from "../EmployerPage/EmployerPage";

import { EmployerRouteContext, EmployerRouteContextData } from "./EmployerRouteContext";

interface Params {
	id?: string;
}

type Props = RouteComponentProps<Params>;

const EmployerRoute: React.FC<Props> = (props: Props): React.ReactElement => {
	const [ pageIndex, setPageIndex ] = useState(0);
	const [ searchFilters, setSearchFilters ] = useState(new EmployerListSearchFilter());

	const contextData: EmployerRouteContextData = {
		pageIndex,
		searchFilters,
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
