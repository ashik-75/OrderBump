import React, { useState } from "react";
import { Link } from "react-router-dom";

const Play = () => {
  const [info, setInfo] = useState({
    radio: [{ label: "1", value: 1 }],
    checkbox: false,
  });

  const handleChanges = () => {
    console.log("change identify");
  };

  return (
    <div>
      <Link to={"/"}>Home </Link>
      <Link to={"/play"}>Play</Link>
      <Link to={"/auto-bump"}>Auto Bump</Link>
    </div>
  );
};

export default Play;
