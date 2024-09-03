import { Card, Image, Group, Text, Badge, Button } from "@mantine/core";
import { useState } from "react";
import Navbar from "./Navbar/Navbar";
import StartPage from "./StartPage/StartPage";
function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <StartPage></StartPage>
    </div>
  );
}

export default App;
