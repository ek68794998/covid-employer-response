import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";

import EmployerBracketList from "../EmployerBracketList/EmployerBracketList";
import EmployerListPage from "../EmployerListPage/EmployerListPage";
import EmployerPage from "../EmployerPage/EmployerPage";

import { EmployerListViewMode, EmployerListViewModeValues } from "./EmployerListViewMode";
import { DefaultContextData, EmployerRouteContext, EmployerRouteContextData } from "./EmployerRouteContext";

export const RankingsRoute: string = "ranking";
export const RecentsRoute: string = "recent";

interface Params {
	id?: string;
}

type Props = RouteComponentProps<Params>;

const canUseSessionStorage: boolean = typeof sessionStorage !== "undefined";

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

	if (canUseSessionStorage) {
		useEffect(
			(): void => {
				const sessionListViewMode: string | null =
					canUseSessionStorage ? sessionStorage.getItem("EmployerRoute.listViewMode") : null;

				if (EmployerListViewModeValues.indexOf(sessionListViewMode as any) >= 0) {
					setListViewMode(sessionListViewMode as EmployerListViewMode);
				}
			},
			[]);

		useEffect(
			(): void => {
				sessionStorage.setItem("EmployerRoute.listViewMode", listViewMode);
			},
			[ listViewMode ]);
	}

	const employerId: string | undefined = props.match.params.id;

	let employerRoutedComponent: JSX.Element;

	if (employerId) {
		if (employerId === RecentsRoute) {
			employerRoutedComponent = <EmployerBracketList mode="recent" />;
		} else if (employerId === RankingsRoute) {
			employerRoutedComponent = <EmployerBracketList mode="ranking" />;
		} else {
			employerRoutedComponent = <EmployerPage employerId={employerId} />;
		}
	} else {
		employerRoutedComponent = <EmployerListPage />;
	}

	return (
		<EmployerRouteContext.Provider value={contextData}>
			{employerRoutedComponent}
		</EmployerRouteContext.Provider>
	);
};

export default EmployerRoute;
