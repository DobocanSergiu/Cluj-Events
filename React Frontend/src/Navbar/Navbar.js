import "./Navbar.css";
import { ActionIcon, Button, Input } from "@mantine/core";
import { useNavigate } from "react-router";
import { IconAdjustments, IconMenu2 } from "@tabler/icons-react";
import { Fragment, useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const navbarLinks = [
    { title: "Events", link: "/events" },
    { title: "Movies", link: "/movies" },
    { title: "Interest Points", link: "/interest-points" },
  ];

  return (
    <Fragment>
      <div className={`NavbarDimensions ${isOpen ? "open" : ""}`}>
        <ActionIcon variant="filled" size="xl" aria-label="Navbar">
          <IconMenu2
            style={{ width: "80%", height: "80%" }}
            stroke={1.5}
            onClick={toggleNavbar}
          />
        </ActionIcon>
        <Input placeholder="Search"></Input>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {navbarLinks.map((element) => (
            <li key={element.title}>
              <Button
                style={{ width: "100%" }}
                onClick={() => navigate(element.link)}
              >
                {element.title}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <ActionIcon variant="filled" size="xl" aria-label="Navbar">
        <IconMenu2
          style={{ width: "80%", height: "80%" }}
          stroke={1.5}
          onClick={toggleNavbar}
        />
      </ActionIcon>
    </Fragment>
  );
}

export default Navbar;
