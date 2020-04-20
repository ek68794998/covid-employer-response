/* eslint-disable id-blacklist */

import { DesignHelpers } from "./DesignHelpers";

describe("DesignHelpers", () => {
	test.each([
		[ "add", undefined ],
		[ "add", "" ],
		[ "add", "ClassName" ],
		[ "add", "ClassName OtherClassName" ],
		[ "full_icon", undefined ],
		[ "full_icon", "" ],
		[ "full_icon", "ClassName" ],
		[ "full_icon", "ClassName OtherClassName" ],
	])("creates a material icon for %p with class %p (%#)", (icon: string, className?: string) => {
		expect(DesignHelpers.materialIcon(icon, className)).toMatchSnapshot();
	});
});
