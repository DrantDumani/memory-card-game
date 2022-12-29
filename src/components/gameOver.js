function GameOver({ beginGame }) {
  return (
    <div>
      <p>Game over! Click button to restart</p>
      <p>Your score was: </p>
      <button onClick={beginGame}>Restart</button>
    </div>
  );
}

export default GameOver;
