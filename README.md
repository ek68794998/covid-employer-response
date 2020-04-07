![React CI (Yarn)](https://github.com/ekumlin/covid-employer-response/workflows/React%20CI%20(Yarn)/badge.svg)

# Cempres (**C**oronavirus **Emp**loyer **Res**ponse Tracker)
This website tracks and cites sources for information about how employers have acted during the Coronavirus (COVID-19) pandemic. Cempres aims to have an open, Wikipedia-style organization of data where users can freely submit, edit, or change information regarding employers' response on the pandemic. 

The main website can be found here: https://cempres.org/

## Contributing information
There are multiple ways to contribute employer information to this project.

### Submit changes
You may create a fork of this repository and modify the YAML (`yml`) files in `./public/employers` or create new ones. You can then pull-request those updated YAML files back into this repository's *master* branch.

For instructions on how to use YAML, please see [this documentation on YAML syntax](https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html). If you'd like to see a sample employer data file, please look at `./public/employers/sample.yml`.

### Submit an issue
You may open an Employer Information Claim issue in this repository providing the information you'd like to submit, and another contributor can create or update the YAML files for you. In order to ensure quality, please submit a source to the claim you are making. The more reliable the source is, the better. 

### Submit an anonymous tip
This is not yet supported. In the future, we plan to support an anonymous form of submission such as Google Forms or email. Keep an eye out here for updates on that.

## Developing
If you'd like to run the service locally to make changes, follow the steps below.

### Requirements
1. [Git](https://git-scm.com)
1. [Node.JS](https://nodejs.org)
1. [Yarn](https://classic.yarnpkg.com/en/docs/install)

### Building and running
1. Clone the repository: `git clone https://github.com/ekumlin/covid-employer-response.git`
1. Navigate into the repository: `cd covid-employer-response`
1. Install packages: `yarn install`
1. Start the service: `yarn start`

The service will be available at [localhost:4419](http://localhost:4419/).

### Contributing changes
Please fork this repository and submit your changes through a pull request.

## License
See `LICENSE` file for licensing information.
