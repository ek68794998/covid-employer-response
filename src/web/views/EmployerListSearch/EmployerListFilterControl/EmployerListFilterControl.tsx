import React, { useState } from "react";
import { RouteProps } from "react-router-dom";

import EmployerListSearchFiltersPopup, { SelectorProps } from "../../EmployerListSearchFiltersPopup/EmployerListSearchFiltersPopup";

import "./EmployerListFilterControl.scss";

export interface ChildSelectorProps {
	initialValue: boolean;

	label: string;

	setValue: (value: boolean) => void;
}

interface Props extends RouteProps {
	getDisplayText: () => string;

	isActive: boolean;

	onClear: () => void;

	popupTitle: string;

	selectorPropsList: ChildSelectorProps[];
}

const EmployerListFilterControl: React.FC<Props> =
	(props: Props): React.ReactElement => {
		const { getDisplayText, isActive, onClear, popupTitle, selectorPropsList } = props;

		const [ isPopupOpen, setIsPopupOpen ] = useState(false);
		const [ displayText, setDisplayText ] = useState(getDisplayText());

		const clear = (e: React.MouseEvent<HTMLElement>): void => {
			onClear();
			setDisplayText(getDisplayText());
			e.stopPropagation();
		};

		const children: SelectorProps[] =
			selectorPropsList.map((value: ChildSelectorProps): SelectorProps => ({
				initialValue: value.initialValue,
				label: value.label,
				onChange: (e: React.ChangeEvent<HTMLInputElement>): void => {
					value.setValue(e.target.checked);
					setDisplayText(getDisplayText());
				},
			}));

		const popup: JSX.Element | null =
			isPopupOpen
				? (
					<EmployerListSearchFiltersPopup
						childProps={children}
						multiselect={true}
						onClose={(): void => setIsPopupOpen(false)}
						title={popupTitle}
					/>
				)
				: null;

		const buttonClasses: string[] = [ "EmployerListFilterControl__Button" ];

		if (isActive) {
			buttonClasses.push("EmployerListFilterControl__Button--Active");
		}

		return (
			<div className="EmployerListFilterControl__Container">
				<button className={buttonClasses.join(" ")} onClick={(): void => setIsPopupOpen(!isPopupOpen)}>
					{isActive && <i className="material-icons" onClick={clear}>clear</i>}
					<div>{displayText}</div>
				</button>
				{popup}
			</div>
		);
	};

export default EmployerListFilterControl;
