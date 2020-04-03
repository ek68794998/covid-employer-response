import { Development } from "../../../../common/constants/EnvironmentConstants";

export const getEnvironment = (): string => {
	return process.env.NODE_ENV || Development;
};
