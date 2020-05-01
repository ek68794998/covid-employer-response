/* eslint-disable unused-imports/no-unused-vars-ts */
/* Methods declared in the interface must be used in the context default value, but don't use their arguments. */

import React from "react";

import { EmployerListSearchFilter } from "../EmployerListSearch/EmployerListSearchFilter";

type ContextDataSetter<T> = (value: T) => void;

const getDefaultContextDataSetter = <T>(): ContextDataSetter<T> =>
	(value: T): void => (((): void => { /* Noop. */ }) as any)(value);

export const DefaultContextData: EmployerRouteContextData = {
	pageIndex: 1,
	searchFilters: new EmployerListSearchFilter(),
	setPageIndex: getDefaultContextDataSetter<number>(),
	setSearchFilters: getDefaultContextDataSetter<EmployerListSearchFilter>(),
};

export interface EmployerRouteContextData {
	pageIndex: number;

	searchFilters: EmployerListSearchFilter;

	setPageIndex: ContextDataSetter<number>;

	setSearchFilters: ContextDataSetter<EmployerListSearchFilter>;
}

export const EmployerRouteContext: React.Context<EmployerRouteContextData> =
	React.createContext(DefaultContextData);
