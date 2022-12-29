import { useState } from "react";
import Header from "./components/header";
import Game from "./components/game";
import GameOver from "./components/gameOver";
import Footer from "./components/footer";
import "./App.css";

function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [score, setScore] = useState(0);
  const [hiScore, setHiScore] = useState(0);

  const endGame = () => {
    setIsPlaying(false);
  };

  const beginGame = () => {
    setIsPlaying(true);
  };

  const updateHiScore = () => {
    if (score > hiScore) {
      setHiScore(score);
    }
  };

  const updateScore = () => {
    setScore((score) => score + 1);
  };

  const resetScore = () => {
    setScore(0);
  };

  return (
    <div id="content">
      <Header />
      {isPlaying ? (
        <Game
          endGame={endGame}
          score={score}
          hiScore={hiScore}
          updateHiScore={updateHiScore}
          updateScore={updateScore}
          resetScore={resetScore}
        />
      ) : (
        <GameOver beginGame={beginGame} />
      )}
      <Footer />
    </div>
  );
}

export default App;
