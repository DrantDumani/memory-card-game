import "../styleSheets/gameOver.scss";

function GameOver({ beginGame, score }) {
  return (
    <div className="game-over">
      <p>Game over! Click button to restart</p>
      <p>Your score was: {score}</p>
      <button class="restart-btn" onClick={beginGame}>
        Restart
      </button>
    </div>
  );
}

export default GameOver;
