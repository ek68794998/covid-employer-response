import React from "react";
import { RouteProps } from "react-router-dom";

import "./EmployerListSearchFiltersSelector.scss";

interface Props extends RouteProps {
	initialValue: boolean;

	label: string;

	multiselect: boolean;

	onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const EmployerListSearchFiltersSelector: React.FC<Props> = (props: Props): React.ReactElement => {
	const { initialValue, label, multiselect, onChange } = props;

	return (
		<label className="EmployerListSearchFiltersSelector">
			<input
				defaultChecked={initialValue}
				onChange={onChange}
				type={multiselect ? "checkbox" : "radio"}
			/>
			<span>{label}</span>
		</label>
	);
};

export default EmployerListSearchFiltersSelector;
