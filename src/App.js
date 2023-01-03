import { useState } from "react";
import Header from "./components/header";
import ScoreBoard from "./components/scoreBoard";
import Game from "./components/game";
import GameOver from "./components/gameOver";
import Footer from "./components/footer";
import "./App.scss";
import { useEffect } from "react";

function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [score, setScore] = useState(0);
  const [hiScore, setHiScore] = useState(0);

  const endGame = () => {
    setIsPlaying(false);
  };

  const beginGame = () => {
    setIsPlaying(true);
    resetScore();
  };

  useEffect(() => {
    const updateHiScore = () => {
      if (score > hiScore) {
        setHiScore((hiScore) => hiScore + 1);
      }
    };

    updateHiScore();
  }, [score]);

  const updateScore = () => {
    setScore((score) => score + 1);
  };

  const resetScore = () => {
    setScore(0);
  };

  return (
    <div id="content">
      <Header />
      <div className="rules-container">
        <p className="rules-text">
          Rules: Click on a card, but don't click the same card twice.
        </p>
      </div>
      <ScoreBoard score={score} hiScore={hiScore} />
      {isPlaying ? (
        <Game
          endGame={endGame}
          score={score}
          hiScore={hiScore}
          updateScore={updateScore}
        />
      ) : (
        <GameOver beginGame={beginGame} score={score} />
      )}
      <Footer />
    </div>
  );
}

export default App;
