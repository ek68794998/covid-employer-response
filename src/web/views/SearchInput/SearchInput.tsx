import React from "react";
import { useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";

import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { getStrings } from "../../state/ducks/localization/selectors";

import "./SearchInput.scss";

interface Props extends RouteProps {
	onChange: (value: string) => void;
}

const SearchInput: React.FC<Props> = (props: Props): React.ReactElement => {
	const strings: LocalizedStrings = useSelector(getStrings);
	const { onChange } = props;

	return (
		<div className="SearchInput__Container">
			<i className="material-icons">search</i>
			<input
				onInput={(e: React.FormEvent<HTMLInputElement>): void => onChange(e.currentTarget.value)}
				placeholder={strings.search}
				type="search"
			/>
		</div>
	);
};

export default SearchInput as any;
