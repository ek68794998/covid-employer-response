import React, { useState } from "react";
import { RouteProps } from "react-router-dom";

import "./EmployerListSearchFiltersSelector.scss";

interface Props extends RouteProps {
	label: string;

	multiselect: boolean;

	onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const EmployerListSearchFiltersSelector: React.FC<Props> = (props: Props): React.ReactElement => {
	const [ id ] = useState(`EmployerListSearchFiltersSelector-${Math.random().toString(16).slice(-8)}`);

	const { label, multiselect, onChange } = props;

	return (
		<span>
			<input
				id={id}
				onChange={onChange}
				type={multiselect ? "checkbox" : "radio"}
			/>
			<label htmlFor={id}>{label}</label>
		</span>
	);
};

export default EmployerListSearchFiltersSelector;
