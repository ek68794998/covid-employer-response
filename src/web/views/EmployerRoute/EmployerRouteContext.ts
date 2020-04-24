/* eslint-disable unused-imports/no-unused-vars-ts */
/* Methods declared in the interface must be used in the context default value, but don't use their arguments. */

import React from "react";

import { EmployerListSearchFilter } from "../EmployerListSearch/EmployerListSearchFilter";

export interface EmployerRouteContextData {
	searchFilters: EmployerListSearchFilter;

	setSearchFilters: (newFilters: EmployerListSearchFilter) => void;
}

export const EmployerRouteContext: React.Context<EmployerRouteContextData> =
	React.createContext({
		searchFilters: new EmployerListSearchFilter(),
		setSearchFilters: (newFilters: EmployerListSearchFilter): void => { /* Nothing by default. */ },
	});
