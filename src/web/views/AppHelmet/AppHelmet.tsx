import React from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { getStrings } from "../../state/ducks/localization/selectors";

interface Props {
	description?: string;

	title: string;
}

const AppHelmet: React.FC<Props> = (props: Props): React.ReactElement => {
	const strings: LocalizedStrings = useSelector(getStrings);

	const titleString: string = `${props.title} | ${strings.appTitle}`;

	const description: string =
		props.description
		|| "A collaborative, open-source project designed to track the responses of employers to the coronavirus (COVID-19) pandemic of 2019-2020.";

	return (
		<Helmet>
			<title>{titleString}</title>
			<meta property="og:title" content={titleString} />
			<meta property="description" content={description} />
			<meta property="og:description" content={description} />
		</Helmet>
	);
};

export default AppHelmet;
