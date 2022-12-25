import { useState } from "react";
import Footer from "./components/footer/Footer";
import Game from "./components/main/Game";
import Navbar from "./components/navbar/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Game />
      <Footer />
    </>
  );
}

export default App;
