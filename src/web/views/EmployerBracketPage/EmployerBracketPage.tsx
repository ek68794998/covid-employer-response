import React from "react";
import { useSelector } from "react-redux";

import { EmployerRecordMetadata } from "../../../common/EmployerRecordMetadata";
import { LocalizedStrings } from "../../../common/LocalizedStrings";
import { getEmployersList } from "../../state/ducks/employers/selectors";
import { getStrings } from "../../state/ducks/localization/selectors";

import AppHelmet from "../AppHelmet/AppHelmet";
import EmployerBracketList from "../EmployerBracketList/EmployerBracketList";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

import "./EmployerBracketPage.scss";

interface Props {
	mode: "recent" | "ranking";
}

const defaultDate: string = "2000-01-01T00:00:00Z";

const EmployerBracketPage: React.FC<Props> = (props: Props): React.ReactElement | null => {
	const strings: LocalizedStrings = useSelector(getStrings);
	const employersList: EmployerRecordMetadata[] | undefined = useSelector(getEmployersList);

	const { mode } = props;

	if (!employersList) {
		return <LoadingIndicator />;
	}

	const sortedEmployers: EmployerRecordMetadata[] =
		employersList
			.concat() // Copy the array.
			.sort((a: EmployerRecordMetadata, b: EmployerRecordMetadata) => {
				if (mode === "ranking") {
					return a.score - b.score;
				}

				if (mode === "recent") {
					return (
						new Date(a.lastUpdated || defaultDate).getTime()
						- new Date(b.lastUpdated || defaultDate).getTime()
					);
				}

				return 0;
			});

	const numberToShow: number = 10;

	const bottomEmployers: EmployerRecordMetadata[] =
		sortedEmployers.slice(0, numberToShow);

	const topEmployers: EmployerRecordMetadata[] =
		sortedEmployers.slice(-numberToShow).reverse();

	if (mode === "ranking") {
		return (
			<main id="employer-bracket">
				<AppHelmet
					title={strings.employerListRanking}
				/>
				<div className="EmployerBracketPage__Container">
					<div className="EmployerBracketPage__Content">
						<EmployerBracketList
							employers={topEmployers}
							metric="score"
							title={strings.employerListRankingBestTitle}
						/>
						<div className="EmployerBracketPage__ContentSpacer" />
						<EmployerBracketList
							employers={bottomEmployers}
							metric="score"
							title={strings.employerListRankingWorstTitle}
						/>
					</div>
				</div>
			</main>
		);
	}

	if (mode === "recent") {
		return (
			<main id="employer-bracket">
				<AppHelmet
					title={strings.employerListRecentTitle}
				/>
				<div className="EmployerBracketPage__Container">
					<div className="EmployerBracketPage__Content">
						<EmployerBracketList
							employers={topEmployers}
							metric="lastUpdated"
							title={strings.employerListRecentTitle}
						/>
					</div>
				</div>
			</main>
		);
	}

	return null;
};

export default EmployerBracketPage;
