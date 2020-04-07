import { Development } from "../../../../common/constants/EnvironmentConstants";

export const getEnvironment = (): string => process.env.NODE_ENV || Development;
