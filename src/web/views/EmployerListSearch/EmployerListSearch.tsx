import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";

import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { getStrings } from "../../state/ducks/localization/selectors";

import "./EmployerListSearch.scss";
import { EmployerListSearchFilter } from "./EmployerListSearchFilter";

interface Props extends RouteProps {
	onChange: (value: EmployerListSearchFilter) => void;
}

const EmployerListSearch: React.FC<Props> = (props: Props): React.ReactElement => {
	const [ searchFilters, setSearchFilters ] = useState(new EmployerListSearchFilter());

	const strings: LocalizedStrings = useSelector(getStrings);
	const { onChange } = props;

	useEffect(
		(): void => {
			onChange(searchFilters);
		},
		[ searchFilters ]);

	const updateSearchFilters = (updates: Partial<EmployerListSearchFilter>): void => {
		setSearchFilters({ ...searchFilters, ...updates });
	};

	return (
		<div className="EmployerListSearch__Container">
			<i className="material-icons">search</i>
			<input
				onInput={(e: React.FormEvent<HTMLInputElement>): void => updateSearchFilters({ text: e.currentTarget.value })}
				placeholder={strings.search}
				type="search"
			/>
		</div>
	);
};

export default EmployerListSearch;
