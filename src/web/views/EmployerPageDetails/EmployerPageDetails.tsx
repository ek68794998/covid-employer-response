import React from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import { RouteProps } from "react-router-dom";

import { Citation } from "../../../common/Citation";
import { DesignHelpers } from "../../../common/DesignHelpers";
import { EmployerEmployeeProfile } from "../../../common/EmployerEmployeeProfile";
import { EmployerLocation } from "../../../common/EmployerLocation";
import { EmployerRecord } from "../../../common/EmployerRecord";
import { EmployerRecordBase } from "../../../common/EmployerRecordBase";
import { EmployerRecordMetadata } from "../../../common/EmployerRecordMetadata";
import { LocalizedStrings } from "../../../common/LocalizedStrings";
import { WikipediaHelpers } from "../../../common/WikipediaHelpers";

import { AppState } from "../../state/AppState";
import { getEmployerMetadata, getEmployersList } from "../../state/ducks/employers/selectors";
import { getStrings } from "../../state/ducks/localization/selectors";

import EmployerCitationList from "../EmployerCitationList/EmployerCitationList";
import EmployerListItem from "../EmployerListItem/EmployerListItem";
import EmployerLogo from "../EmployerLogo/EmployerLogo";

import "./EmployerPageDetails.scss";

interface Props extends RouteProps {
	employer: EmployerRecord;
}

const citationSort = (a: Citation, b: Citation): number => {
	if (a.positivity !== b.positivity) {
		return b.positivity - a.positivity;
	}

	return (b.sources ? b.sources.length : 0) - (a.sources ? a.sources.length : 0);
};

const EmployerPageDetails: React.FC<Props> = (props: Props): React.ReactElement | null => {
	const strings: LocalizedStrings = useSelector(getStrings);

	const { employer } = props;

	const employersList: EmployerRecordMetadata[] | undefined =
		useSelector((state: AppState) => getEmployersList(state));

	const employerMetadata: EmployerRecordMetadata | undefined =
		useSelector((state: AppState) => getEmployerMetadata(state, employer?.id));

	if (!employer || !employerMetadata || !employersList) {
		return null;
	}

	const getProfileRow =
		(labelText: string, icon: string, data: JSX.Element, linkUrl?: string): JSX.Element => (
			<tr>
				<td
					className="EmployerPageDetails__ProfileLabel"
					title={labelText}
				>
					{DesignHelpers.materialIcon(icon)}
				</td>
				<td className="EmployerPageDetails__ProfileValue">
					{linkUrl
						? <a href={linkUrl} rel="noopener noreferrer" target="_blank">{data}&nbsp;{DesignHelpers.materialIcon("launch")}</a>
						: data}
				</td>
			</tr>
		);

	const maxRelatedEmployers: number = 5;

	const relatedEmployers: [string, number][] =
		employersList
			.map((e: EmployerRecordMetadata): [string, number] => [
				e.id,
				EmployerRecordBase.calculateRelationshipStrength(employerMetadata, e),
			])
			.filter((value: [string, number]) => {
				if (employer.parentId === value[0] || employer.childIds.indexOf(value[0]) >= 0) {
					return false;
				}

				return value[1] > 0;
			})
			.sort((a: [string, number], b: [string, number]) => {
				if (a[1] === b[1]) {
					return Math.random() - 0.5;
				}

				return b[1] - a[1];
			})
			.slice(0, maxRelatedEmployers);

	return (
		<div className="EmployerPageDetails__Container">
			<div className="EmployerPageDetails__Header">
				<EmployerLogo employer={employer} />
				<h1 className="EmployerPageDetails__Title">
					{employer.shortName || employer.name}
				</h1>
				<div className={`EmployerPageDetails__Rating EmployerPageDetails__Rating--${employerMetadata.rating}`}>
					{strings.ratingLabels[employerMetadata.rating]}
					{DesignHelpers.materialIcon(EmployerRecordMetadata.getTrendIcon(employerMetadata))}
				</div>
			</div>
			<div className="EmployerPageDetails__Summary">
				<ReactMarkdown source={employer.summary} />
			</div>

			<EmployerCitationList citations={employer.citations.sort(citationSort)} />

			<div className="EmployerPageDetails__MetaFooter">
				<div className="EmployerPageDetails__Profile">
					<h2>{strings.profile}</h2>
					<table className="EmployerPageDetails__ProfileDetails">
						<tbody>
							{getProfileRow(
								strings.detailDescriptions.name,
								"work",
								<>
									{employer.name}
									{employer.aliases && employer.aliases.length > 0 && (
										<div className="EmployerPageDetails__ProfileSublist">
											<h3>AKA</h3>
											<ul>
												{employer.aliases.map((a: string, i: number) => <li key={i}>{a}</li>)}
											</ul>
										</div>
									)}
								</>,
							)}
							{employer.industries && employer.industries.length > 0 && getProfileRow(
								strings.detailDescriptions.industry,
								"category",
								<ul>
									{employer.industries.map(
										(a: string, i: number) => <li key={i}>{strings.industries[a]}</li>)}
								</ul>,
							)}
							{employer.location && getProfileRow(
								strings.detailDescriptions.location,
								"place",
								<>
									{EmployerLocation.toString(employer.location, strings.countryNames)}
									<img
										className="EmployerPageDetails__ProfileFlag"
										src={`/images/flags/${employer.location.country}.svg`}
									/>
								</>,
								WikipediaHelpers.getWikipediaUrl(employer.location.wiki) || "",
							)}
							{employer.employeesBefore && getProfileRow(
								strings.detailDescriptions.employees,
								"people",
								<>{EmployerEmployeeProfile.toString(employer.employeesBefore, true, false)}</>,
							)}
							{employer.ticker && getProfileRow(
								strings.detailDescriptions.ticker,
								"attach_money",
								<>${employer.ticker}</>,
								`https://finance.yahoo.com/quote/${employer.ticker}`,
							)}
							{employer.wiki && getProfileRow(
								strings.detailDescriptions.wikipedia,
								"language",
								<>Wikipedia</>,
								WikipediaHelpers.getWikipediaUrl(employer.wiki) || "",
							)}
							{employer.officialWebsite && getProfileRow(
								strings.detailDescriptions.officialWebsite,
								"home",
								<>Homepage</>,
								employer.officialWebsite,
							)}
						</tbody>
					</table>
				</div>
				<div className="EmployerPageDetails__LinkedCompanies">
					{employer.parentId && (
						<>
							<h2>{strings.linkTypes.parent}</h2>
							<EmployerListItem employerId={employer.parentId} showDetails={false} />
						</>
					)}
					{employer.childIds.length > 0 && (
						<>
							<h2>{strings.linkTypes.children}</h2>
							{employer.childIds.map((id: string) => (
								<EmployerListItem key={id} employerId={id} showDetails={false} />
							))}
						</>
					)}
					{relatedEmployers.length > 0 && (
						<>
							<h2>{strings.linkTypes.related}</h2>
							{relatedEmployers.map((value: [string, number]) => (
								<EmployerListItem key={value[0]} employerId={value[0]} showDetails={false} />
							))}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default EmployerPageDetails;
