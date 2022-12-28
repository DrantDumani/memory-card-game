function Card({ id, name, imgLink, handleClick }) {
  return (
    <div id={id} onClick={handleClick}>
      <p>{name}</p>
      <img src={imgLink} alt={`${name}`} />
    </div>
  );
}

export default Card;
