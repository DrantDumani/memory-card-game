import { useEffect, useState } from "react";
import Scoreboard from "./scoreBoard";
import cardInfo from "../database.json";
import Card from "./card";
import uniqid from "uniqid";
import "../styleSheets/game.scss";

// the cards object just holds the link to the picture and the name of the character.
// when choosing cards, they're mapped the objects that contain a click property and an id
// a function would need to randomly select the cards.

function Game({ endGame }) {
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
      const ind = indices[Math.floor(Math.random() * indices.length)];
      subArr.push(arr[ind]);
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

  const updateCardStatus = (card) => {
    const updatedCards = [...cards];
    for (let el of updatedCards) {
      if (el === card) {
        el.clicked = true;
      }
    }
    setCards(updatedCards);
  };

  //fix this later
  const handleCardClick = (e) => {
    const { id } = e.currentTarget;
    let clickable = null;
    for (let card of cards) {
      if (card.id === id) {
        clickable = card;
        break;
      }
    }

    if (clickable.clicked) {
      endGame();
    } else {
      updateCardStatus(clickable);
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
            <Card
              id={card.id}
              imgLink={card.imgLink}
              name={card.name}
              handleClick={handleCardClick}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Game;
