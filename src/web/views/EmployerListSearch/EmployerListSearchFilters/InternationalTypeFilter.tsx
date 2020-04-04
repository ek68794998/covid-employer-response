import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { LocalizedStrings } from "../../../../common/LocalizedStrings";

import { getStrings } from "../../../state/ducks/localization/selectors";

import EmployerListSearchFiltersPopup, { SelectorProps } from "../../EmployerListSearchFiltersPopup/EmployerListSearchFiltersPopup";

import { EmployerListSearchFilterProps } from "../EmployerListSearchFilterProps";

import "./EmployerListSearchFilters.scss";

const InternationalTypeFilter: React.FC<EmployerListSearchFilterProps> =
	(props: EmployerListSearchFilterProps): React.ReactElement => {
		const strings: LocalizedStrings = useSelector(getStrings);

		const [ showNational, setShowNational ] = useState(false);
		const [ showInternational, setShowInternational ] = useState(false);
		const [ isPopupOpen, setIsPopupOpen ] = useState(false);
		const [ displayText, setDisplayText ] = useState(strings.filters.locationDefault);

		const { onUpdateFilterValue } = props;

		const clear = (e: React.MouseEvent<HTMLElement>): void => {
			setShowNational(false);
			setShowInternational(false);

			e.stopPropagation();
		};

		useEffect(
			(): void => {
				let internationalType: boolean | undefined;
				let newDisplayText: string;

				if (showNational && !showInternational) {
					newDisplayText = strings.filters.locationNational;
					internationalType = false;
				} else if (showInternational && !showNational) {
					newDisplayText = strings.filters.locationInternational;
					internationalType = true;
				} else {
					newDisplayText = strings.filters.locationDefault;
					internationalType = undefined;
				}

				onUpdateFilterValue({ internationalType });
				setDisplayText(newDisplayText);
			},
			[ showNational, showInternational ]);

		const children: SelectorProps[] = [
			{
				label: strings.filters.locationNational,
				onChange: (e: React.ChangeEvent<HTMLInputElement>): void => setShowNational(e.target.checked),
			},
			{
				label: strings.filters.locationInternational,
				onChange: (e: React.ChangeEvent<HTMLInputElement>): void => setShowInternational(e.target.checked),
			},
		];

		const popup: JSX.Element | null =
			isPopupOpen
				? (
					<EmployerListSearchFiltersPopup
						childProps={children}
						multiselect={true}
						onClose={(): void => setIsPopupOpen(false)}
					/>
				)
				: null;

		const isActive: boolean = showNational !== showInternational;

		const buttonClasses: string[] = [ "EmployerListSearchFilters__Button" ];

		if (isActive) {
			buttonClasses.push("EmployerListSearchFilters__Button--Active");
		}

		return (
			<div className="EmployerListSearchFilters__Container">
				<button className={buttonClasses.join(" ")} onClick={(): void => setIsPopupOpen(!isPopupOpen)}>
					{isActive && <i className="material-icons" onClick={clear}>clear</i>}
					<div>{displayText}</div>
				</button>
				{popup}
			</div>
		);
	};

export default InternationalTypeFilter;
