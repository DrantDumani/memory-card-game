import { useEffect, useState } from "react";
import cardInfo from "../database.json";
import Card from "./card";
import uniqid from "uniqid";
import "../styleSheets/game.scss";

// the cards object just holds the link to the picture and the name of the character.
// when choosing cards, they're mapped the objects that contain a click property and an id
// a function would need to randomly select the cards.

function Game({ endGame, updateScore, resetScore }) {
  const [cards, setCards] = useState([]);
  const [level, setLevel] = useState(1);
  const database = cardInfo.cardData;

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

  const checkLevelComplete = () => {
    if (cards.every((card) => card.clicked)) {
      setLevel(level + 1);
    }
  };

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
      resetScore();
      endGame();
    } else {
      updateCardStatus(clickable);
      shuffleCards();
      updateScore();
      // updateHiScore();
      checkLevelComplete();
    }
  };

  return (
    <main className="main">
      <p className="level-text">Level: {level}</p>
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
