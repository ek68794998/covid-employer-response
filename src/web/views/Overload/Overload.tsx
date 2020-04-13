import React from "react";

import "./Overload.scss";

const Overload: React.FC = (): React.ReactElement => {
	const style: React.CSSProperties = {
		background: "#fff",
		bottom: 0,
		left: 0,
		position: "fixed",
		right: 0,
		top: 0,
		transition: "0.3s opacity ease-in-out",
		zIndex: 999,
	};

	return (
		<div className="Overload__Container" style={style} />
	);
};

export default Overload;
