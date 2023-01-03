import "../styleSheets/scoreBoard.scss";

function Scoreboard({ score, hiScore }) {
  return (
    <div className="scoreBoard-container">
      <p>Current Score: {score}</p>
      <p>High Score: {hiScore}</p>
    </div>
  );
}

export default Scoreboard;
