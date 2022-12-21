import { useEffect, useState } from "react";
import Scoreboard from "./scoreBoard";
import cardInfo from "../database.json";
import uniqid from "uniqid";

// the cards object just holds the link to the picture and the name of the character.
// when choosing cards, they're mapped the objects that contain a click property and an id
// a function would need to randomly select the cards.

function Game() {
  const [score, setScore] = useState(0);
  const [hiScore, setHiScore] = useState(0);
  const [cards, setCards] = useState([]);
  const [level, setLevel] = useState(1);
  const database = cardInfo.cardData;

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

  const randomSubArray = (arr, length) => {
    const indices = arr.map((_, i) => i);
    const subArr = [];
    for (let i = 0; i < length; i++) {
      const ind = Math.floor(Math.random() * indices.length);
      subArr.push(arr[indices[ind]]);
      indices.splice(indices.indexOf(ind), 1);
    }
    return subArr;
  };

  useEffect(() => {
    const createGameCards = (db) => {
      const length = 2 + level * 2;
      const chosenCards = randomSubArray(db, length);
      const gameCards = chosenCards.map((card) => ({
        ...card,
        id: uniqid(),
        clicked: false,
      }));
      setCards(gameCards);
    };

    createGameCards(database);
  }, [level]);

  const shuffleCards = () => {
    const shuffled = randomSubArray(cards, cards.length);
    setCards(shuffled);
  };

  //fix this later
  const handleCardClick = (e) => {
    // const { id } = e.target; //gets id of card element which is used to look up card object
    //if you don't want to loop, store index on card obj and use that to look up array element
    const { index } = undefined; //figure this out later
    const card = cards[index];
    if (card.clicked) {
      //if the card has been clicked already, then end the game
      //   gameOver();
    } else {
      card.clicked = true;
      shuffleCards();
      updateScore();
    }
  };

  return (
    <main>
      <Scoreboard score={score} hiScore={hiScore} />
      <div className="rules-container">The rules to the game go here!</div>
      <ul id="card-list">
        {cards.map((card) => (
          <li key={card.id}>
            <div>
              <p>{card.name}</p>
              <img src={card.imgLink} alt="character" />
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Game;
