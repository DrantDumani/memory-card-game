import { useState } from "react";
import Header from "./components/header";
import Game from "./components/game";
import GameOver from "./components/gameOver";
import Footer from "./components/footer";
import "./App.css";

function App() {
  const [isPlaying, setIsPlaying] = useState(true);

  const endGame = () => {
    setIsPlaying(false);
  };

  const beginGame = () => {
    setIsPlaying(true);
  };

  return (
    <div id="content">
      <Header />
      {isPlaying ? (
        <Game endGame={endGame} />
      ) : (
        <GameOver beginGame={beginGame} />
      )}
      <Footer />
    </div>
  );
}

export default App;
