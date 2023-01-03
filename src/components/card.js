import "../styleSheets/card.scss";

function Card({ id, name, imgLink, handleClick }) {
  return (
    <div id={id} onClick={handleClick}>
      <p className="char-name">{name}</p>
      <img className="char-img" src={imgLink} alt={`${name}`} />
    </div>
  );
}

export default Card;
