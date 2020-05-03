/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require("fs");
const yaml = require("yaml");

const pseudolocalizationMap = {
	a: "á",
	b: "β",
	c: "ç",
	d: "δ",
	e: "è",
	f: "ƒ",
	g: "ϱ",
	h: "λ",
	i: "ï",
	j: "J",
	k: "ƙ",
	l: "ℓ",
	m: "₥",
	n: "ñ",
	o: "ô",
	p: "ƥ",
	q: "9",
	r: "ř",
	s: "ƨ",
	t: "ƭ",
	u: "ú",
	v: "Ʋ",
	w: "ω",
	x: "ж",
	y: "¥",
	z: "ƺ",
	A: "Â",
	B: "ß",
	C: "Ç",
	D: "Ð",
	E: "É",
	F: "F",
	G: "G",
	H: "H",
	I: "Ì",
	J: "J",
	K: "K",
	L: "£",
	M: "M",
	N: "N",
	O: "Ó",
	P: "Þ",
	Q: "Q",
	R: "R",
	S: "§",
	T: "T",
	U: "Û",
	V: "V",
	W: "W",
	X: "X",
	Y: "Ý",
	Z: "Z",
};

const localizationsPath = "./public/strings";

const enUsContent = fs.readFileSync(`${localizationsPath}/en-us.yml`, "utf8");
const localizations = yaml.parse(enUsContent);

const pseudolocalizeString = string => {
	let newString = "";
	let blockPloc = false;

	for (const c of string) {
		if (c === "{") {
			blockPloc = true;
		}

		if (blockPloc && c === "}") {
			blockPloc = false;
		}

		if (!blockPloc && c in pseudolocalizationMap) {
			newString += pseudolocalizationMap[c];
		} else {
			newString += c;
		}
	}

	return newString;
};

const pseudolocalize = node => {
	for (const key in node) {
		if (typeof(node[key]) === "object") {
			pseudolocalize(node[key]);
		} else {
			const line = node[key];
			node[key] = pseudolocalizeString(line);
		}
	}
};

pseudolocalize(localizations);

fs.writeFileSync(`${localizationsPath}/ploc.yml`, yaml.stringify(localizations));
