import React from "react";
import { useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";

import { Citation } from "../../../common/Citation";
import { CitationType } from "../../../common/CitationType";
import { employerLocationToString } from "../../../common/EmployerLocation";
import { EmployerRecord } from "../../../common/EmployerRecord";
import { LocalizedStrings } from "../../../common/LocalizedStrings";

import { AppState } from "../../state/AppState";
import { getStrings } from "../../state/ducks/localization/selectors";

import EmployerCitationList from "../EmployerCitationList/EmployerCitationList";
import EmployerDetail from "../EmployerDetail/EmployerDetail";

import "./EmployerListDetails.scss";

interface Props extends RouteProps {
	employer: EmployerRecord;

	isOpen: boolean;

	onClick: () => void;
}

const citationSort = (a: Citation, b: Citation): number => {
	if (a.positivity !== b.positivity) {
		return b.positivity - a.positivity;
	}

	return (b.sources ? b.sources.length : 0) - (a.sources ? a.sources.length : 0);
};

const getDetailComponents = (employer: EmployerRecord, strings: LocalizedStrings): JSX.Element[] => {
	const iconSize: number = 24;
	const detailComponents: JSX.Element[] = [];

	detailComponents.push(
		<span key={detailComponents.length} title={strings.detailDescriptions.rating}>
			<EmployerDetail
				icon={"thumbs_up_down"}
				iconSize={iconSize}
				text={strings.ratingLabels[employer.rating]}
			/>
		</span>
	);

	let employeeCountString: string | null = null;

	if (employer.employeesBeforeMin > 0 || employer.employeesBeforeMax > 0) {
		if (employer.employeesBeforeMin === employer.employeesBeforeMax) {
			employeeCountString = employer.employeesBeforeMin.toLocaleString();
		} else if (employer.employeesBeforeMin > 0 && employer.employeesBeforeMax > 0) {
			employeeCountString = `${employer.employeesBeforeMin.toLocaleString()} ${String.fromCharCode(0x2013)} ${employer.employeesBeforeMax.toLocaleString()}`;
		} else if (employer.employeesBeforeMin > 0) {
			employeeCountString = `More than ${employer.employeesBeforeMin.toLocaleString()}`;
		} else if (employer.employeesBeforeMax > 0) {
			employeeCountString = `Less than ${employer.employeesBeforeMax.toLocaleString()}`;
		}
	}

	if (employeeCountString) {
		detailComponents.push(
			<span key={detailComponents.length} title={strings.detailDescriptions.employees}>
				<EmployerDetail
					icon={"people"}
					iconSize={iconSize}
					text={employeeCountString}
				/>
			</span>
		);
	}

	detailComponents.push(
		<span key={detailComponents.length} className="break" />
	);

	const locationWikipediaUrl: string | null = getWikipediaUrl(employer.location.wiki);

	detailComponents.push(
		<span key={detailComponents.length} title={strings.detailDescriptions.location}>
			<EmployerDetail
				icon={"place"}
				iconSize={iconSize}
				link={locationWikipediaUrl}
				text={employerLocationToString(employer.location)}
			/>
		</span>
	);

	const employerWikipediaUrl: string | null = getWikipediaUrl(employer.wiki);

	if (employerWikipediaUrl) {
		detailComponents.push(
			<span key={detailComponents.length} className="label-hides" title={strings.detailDescriptions.wikipedia}>
				<EmployerDetail
					icon={"language"}
					iconSize={iconSize}
					link={employerWikipediaUrl}
					text={strings.wikipedia}
				/>
			</span>
		);
	}

	if (employer.officialWebsite) {
		detailComponents.push(
			<span key={detailComponents.length} className="label-hides" title={strings.detailDescriptions.officialWebsite}>
				<EmployerDetail
					icon={"home"}
					iconSize={iconSize}
					link={employer.officialWebsite}
					text={strings.officialWebsite}
				/>
			</span>
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

		const components: Partial<{ [key in CitationType]: JSX.Element | null }> = {};

		for (const type of [ "publication", "statement", "hearsay" ]) {
			const citations: Citation[] =
				employer.citations
					.filter((citation: Citation) => citation.type === type)
					.sort(citationSort);

			if (citations.length === 0) {
				continue;
			}

			components[type] = (
				<EmployerCitationList
					citations={citations}
					citationSourceBase={globalCitationSourceBase}
					citationType={type}
				/>
			);

			citations.forEach((citation: Citation) => globalCitationSourceBase += citation.sources?.length || 0);
		}

		body = (
			<div className="employer-body">
				<div className="employer-details">
					{getDetailComponents(employer, strings)}
				</div>
				<div className="employer-summary">{employer.summary}</div>
				{components.publication}
				{components.statement}
				{components.hearsay}
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

export default EmployerListDetails as any;
