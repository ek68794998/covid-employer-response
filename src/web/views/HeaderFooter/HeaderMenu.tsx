import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

import { getIsProd, getIsTest } from "../../state/ducks/environment/selectors";
import { getStrings } from "../../state/ducks/localization/selectors";

import { ProjectIssueSubmissionUrl } from "../../../common/constants/UrlConstants";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import "./HeaderFooter.scss";

const HeaderMenu: React.FC = (): React.ReactElement => {
	const [ isHamburgerMenuOpen, setIsHamburgerMenuOpen ] = useState(false);

	const { pathname } = useLocation();

	const showBrand: boolean = pathname !== "/";

	const isTest: boolean = useSelector(getIsTest);
	const isProd: boolean = useSelector(getIsProd);
	const strings: LocalizedStrings = useSelector(getStrings);

	const closeHamburgerMenu = (): void => {
		setIsHamburgerMenuOpen(false);
	};

	const openHamburgerMenu = (): void => {
		setIsHamburgerMenuOpen(true);
	};

	const navLinks: JSX.Element = (
		<>
			<NavLink exact={true} className="HeaderMenu__Link" onClick={closeHamburgerMenu} to="/employers">
				{strings.employerList}
			</NavLink>
			<NavLink exact={true} className="HeaderMenu__Link" onClick={closeHamburgerMenu} to="/about">
				{strings.about}
			</NavLink>
			<a
				className="HeaderMenu__Link"
				href={`${ProjectIssueSubmissionUrl}`}
				onClick={closeHamburgerMenu}
				rel="noopener noreferrer"
				target="_blank"
			>
				{strings.submit}
			</a>
		</>
	);

	const classState: string = isHamburgerMenuOpen ? "Open" : "Closed";

	return (
		<>
			{!isTest && (
				<>
					<div className={`HeaderFooter__BurgerMenu HeaderFooter__BurgerMenu--${classState}`}>
						<div className="HeaderFooter__BurgerMenuItems">
							{navLinks}
						</div>
					</div>
					<div
						className={`HeaderFooter__BurgerMenuShade HeaderFooter__BurgerMenuShade--${classState}`}
						onClick={closeHamburgerMenu}
					/>
				</>
			)}
			<header>
				<div className="HeaderFooter__Container">
					<button className="HeaderFooter__OpenHamburgerMenu" onClick={openHamburgerMenu}>
						<i className="material-icons">menu</i>
					</button>
					<div id="brand" className={`${showBrand ? "" : "HeaderMenu__HiddenBrand"}`}>
						<NavLink title={strings.home} to="/">
							{strings.appTitleShort}
							{!isProd && <span style={{ color: "red" }}>&nbsp; [DEV]</span>}
						</NavLink>
						<div className="HeaderMenu__BrandLarge">{strings.appTitle}</div>
					</div>
					{navLinks}
				</div>
			</header>
		</>
	);
};

export default HeaderMenu;
