/* eslint-disable unused-imports/no-unused-vars-ts */
/* Methods declared in the interface must be used in the context default value, but don't use their arguments. */

import React from "react";

import { EmployerListSearchFilter } from "../EmployerListSearch/EmployerListSearchFilter";

import { EmployerListViewMode } from "./EmployerListViewMode";

type ContextDataSetter<T> = (value: T) => void;

const getDefaultContextDataSetter = <T>(): ContextDataSetter<T> =>
	(value: T): void => (((): void => { /* Noop. */ }) as any)(value);

export const DefaultContextData: EmployerRouteContextData = {
	listViewMode: "cards",
	pageIndex: 0,
	searchFilters: new EmployerListSearchFilter(),
	setListViewMode: getDefaultContextDataSetter<EmployerListViewMode>(),
	setPageIndex: getDefaultContextDataSetter<number>(),
	setSearchFilters: getDefaultContextDataSetter<EmployerListSearchFilter>(),
};

export interface EmployerRouteContextData {
	listViewMode: EmployerListViewMode;

	pageIndex: number;

	searchFilters: EmployerListSearchFilter;

	setListViewMode: ContextDataSetter<EmployerListViewMode>;

	setPageIndex: ContextDataSetter<number>;

	setSearchFilters: ContextDataSetter<EmployerListSearchFilter>;
}

export const EmployerRouteContext: React.Context<EmployerRouteContextData> =
	React.createContext(DefaultContextData);
