import React from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { Citation } from "../../../common/Citation";
import { GetCitationTypeValue } from "../../../common/CitationType";
import { employerLocationToString } from "../../../common/EmployerLocation";
import { EmployerRecord } from "../../../common/EmployerRecord";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { AppState } from "../../state/AppState";
import { getStrings } from "../../state/ducks/localization/selectors";

import EmployerCitation from "../EmployerCitation/EmployerCitation";
import EmployerDetail from "../EmployerDetail/EmployerDetail";

import "./EmployerListDetails.scss";

interface Props extends RouteComponentProps {
	employer: EmployerRecord;

	isOpen: boolean;

	onClick: () => void;
}

const citationSort = (a: Citation, b: Citation): number => {
	if (a.positivity !== b.positivity) {
		return b.positivity - a.positivity;
	}

	const aType: number = GetCitationTypeValue(a.type);
	const bType: number = GetCitationTypeValue(b.type);

	if (aType !== bType) {
		return bType - aType;
	}

	return b.sources.length - a.sources.length;
};

const getDetailComponents = (employer: EmployerRecord, strings: LocalizedStrings): JSX.Element[] => {
	const iconSize: number = 24;
	const detailComponents: JSX.Element[] = [];

	detailComponents.push(
		<li key={detailComponents.length} title={strings.detailDescriptions.rating}>
			<EmployerDetail
				icon={"thumbs_up_down"}
				iconSize={iconSize}
				text={strings.ratingLabels[`${employer.rating}`]}
			/>
		</li>
	);

	if (employer.employeesBeforeMax > 0) {
		detailComponents.push(
			<li key={detailComponents.length} title={strings.detailDescriptions.employees}>
				<EmployerDetail
					icon={"people"}
					iconSize={iconSize}
					text={`${employer.employeesBeforeMin} ${String.fromCharCode(0x2013)} ${employer.employeesBeforeMax}`}
				/>
			</li>
		);
	}

	const locationWikipediaUrl: string | null = getWikipediaUrl(employer.location.wiki);

	detailComponents.push(
		<li key={detailComponents.length} title={strings.detailDescriptions.location}>
			<EmployerDetail
				icon={"place"}
				iconSize={iconSize}
				link={locationWikipediaUrl}
				text={employerLocationToString(employer.location)}
			/>
		</li>
	);

	const employerWikipediaUrl: string | null = getWikipediaUrl(employer.wiki);

	if (employerWikipediaUrl) {
		detailComponents.push(
			<li key={detailComponents.length} title={strings.detailDescriptions.wikipedia}>
				<EmployerDetail
					icon={"language"}
					iconSize={iconSize}
					link={employerWikipediaUrl}
					text={strings.wikipedia}
				/>
			</li>
		);
	}

	if (employer.officialWebsite) {
		detailComponents.push(
			<li key={detailComponents.length} title={strings.detailDescriptions.officialWebsite}>
				<EmployerDetail
					icon={"home"}
					iconSize={iconSize}
					link={employer.officialWebsite}
					text={strings.officialWebsite}
				/>
			</li>
		);
	}

	return detailComponents;
};

const getWikipediaUrl = (pageName?: string): string | null => {
	if (!pageName) {
		return null;
	}

	const wikipediaUrlBase: string = "https://en.wikipedia.org/wiki/__PAGE__";
	const pageNameSubpath: string = pageName.replace(" ", "_");

	return wikipediaUrlBase.replace("__PAGE__", pageNameSubpath);
};

const EmployerListDetails: React.FC<Props> = (props: Props): React.ReactElement => {
	const strings: LocalizedStrings = useSelector((state: AppState) => getStrings(state));
	const { employer, isOpen, onClick } = props;

	let body: JSX.Element | null = null;

	if (isOpen) {
		let globalCitationSourceBase: number = 1;

		const citations: JSX.Element[] =
			employer.citations
				.sort(citationSort)
				.map((value: Citation, i: number) => {
					const citationSourceBase: number = globalCitationSourceBase;

					globalCitationSourceBase += value.sources.length;

					return (
						<li key={i}>
							<EmployerCitation citation={value} citationSourceBase={citationSourceBase} />
						</li>
					);
				});

		body = (
			<div className="employer-body">
				<ul className="employer-details">
					{getDetailComponents(employer, strings)}
				</ul>
				<div className="employer-summary">{employer.summary}</div>
				{citations.length > 0 && <ul className="employer-citations">{citations}</ul>}
			</div>
		);
	}

	return (
		<div className={`employer-container ${isOpen ? "employer-container-open" : "employer-container-closed"}`}>
			<button className="employer-header" onClick={onClick}>
				<div className="employer-title">{employer.name}</div>
				{isOpen ? <span>&#x25B2;</span> : <span>&#x25BC;</span>}
			</button>
			{body}
		</div>
	);
};

export default withRouter(EmployerListDetails) as any;
