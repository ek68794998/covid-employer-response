## Employer data files

Each `yml` ([YAML](https://yaml.org/)) file in this directory each represents an employer entry that appears on the site.

### Creating a data file

We recommend you make a copy of `sample.yml` and adjust it to fit your needs. The name of the file should be the employer's name in all lowercase with spaces replaced by `-`.

### Fields

- `name`: The official name of the company.
- `aliases`: An optional list of aliases for the company, if they have changed names or have a parent company.
- `shortName`: An optional shortened version of the company's name.
- `ticker`: The stock ticker symbol for the company, if they are publicly traded.
- `wiki`: The subpath for the company's English Wikipedia page, if any. Spaces will be converted to underscores.
- `image`: An optional name of a logo, in SVG format, in the 'public/images/employers' directory.
- `officialWebsite`: An official company webpage describing the company and its corporate mission, culture, and so on.
- `industries`: A list of industries of which the company is considered to be a part. Please see the `EmployerIndustry.ts` file for possible values here. (If you think one is missing, please request to add it.)
- `location`: Where the company is originally based.
	- The country code should correspond to a country name in `./public/strings/en-us.json`'s list.
	- Multinational companies should indicate `international: true`.
- `employeesBefore`: The number of company employees prior to 2020.
	- `lowerBound`: The lower bound of the employee count. Used only if specifying a range.
	- `type`: `range`, `approximately`, or `exactly`.
	- `upperBound`: The upper bound of the employee count, or the true number if not specifying a range.
	- `year`: The year in which the measure was reported.
	- `yearQuarter`: The optional quarter (Q1, Q2, ...) of the calendar year in which the measure was reported.
- `summary`: A general summary about the company. Should be 100-350 characters and avoid too many specific details. [Markdown](https://www.markdownguide.org/basic-syntax/) is supported here.
- `citations`: A list of claims about the employer. Each one should indicate a number of things:
	- `summary`: A textual summary of the claim. Should mention all specifics of the claim, and include dates when necessary. Generally, should be written in the past-passive tense, such as "Contoso has started ...", or "Contoso employees have been ...". Events that happened but are not ongoing can be written entirely in past tense, such as "Contoso issued a statement saying ...". [Markdown](https://www.markdownguide.org/basic-syntax/) is supported here.
	- `positivity`: A value from 2 to -2 that indicates how positive the news is.
		- 2: Highly positive. For example, going above and beyond mandated protocols to ensure employees are paid, executives paying out of pocket to ensure jobs or livelihoods, or redirecting capital or resources away from revenue efforts toward curbing COVID-19's spread and effect.
		- 1: Positive. For example, not cutting employee salaries, following government mandates, or stepping up cleaning protocols.
		- 0: Neutral. For example, cutting both executive and worker salaries, or taking actions against COVID-19 but which are not related to employee happiness or job security. Announcements which have also not yet come to fruition should also be marked as neutral.
		- -1: Negative. For example, cutting employee salaries or furloughing without benefits.
		- -2: Highly negative. For example, actively showing neglect for employee safety, or paying out executive bonuses while also laying off employees.
	- `type`: Indicates that the **original** fact source is a published statement from an employee, whether they are a current, former, or anonymous source.
	- `sources`: A list of sources for the claim.
		- `source`: The website name or description.
		- `title`: A special descriptor if there is more than one reference to the same site.
		- `link`: A link directly to the source (preferably to [the Wayback Machine](https://web.archive.org)).
		- `date`: The date of the article, if available. Should be in a format like `2020-01-02T12:34:56Z`, where `Z` indicates UTC but can be replaced with a time zone (like `-04:00` for EDT).
