import { Card, Tabs } from "@shopify/polaris";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (value) => {
    setSelected(value);

    if (value === 0) {
      navigate("/");
    } else if (value === 1) {
      navigate("/auto-bump");
    } else if (value === 2) {
      navigate("/analytics");
    } else if (value === 3) {
      navigate("settings");
    } else if (value === 4) {
      navigate("support");
    } else {
      navigate("play");
    }
  };

  const tabs = [
    {
      id: "all-customers-4",
      content: "Manual Bump",
      accessibilityLabel: "All customers",
      panelID: "all-customers-content-4",
    },
    {
      id: "accepts-marketing-4",
      content: "Auto Bump",
      panelID: "accepts-marketing-content-4",
    },
    {
      id: "repeat-customers-4",
      content: "Analytics",
      panelID: "repeat-customers-content-4",
    },
    {
      id: "prospects-4",
      content: "Settings",
      panelID: "prospects-content-4",
    },
    {
      id: "prospects-5",
      content: "Support",
      panelID: "prospects-content-5",
    },
    {
      id: "prospects-6",
      content: "Play",
      panelID: "prospects-content-6",
    },
  ];

  return (
    <Card>
      <Tabs
        tabs={tabs}
        selected={selected}
        onSelect={handleTabChange}
        disclosureText="More views"
      ></Tabs>
    </Card>
  );
}

export default Navbar;
