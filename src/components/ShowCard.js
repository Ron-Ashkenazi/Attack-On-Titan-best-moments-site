import "./ShowCard.css";

const ShowCard = (props) => {
  return (
    <div className="show-card-root">
      <h1 className="show-card-title">{props.title}</h1>
      <img className="show-card-image-size" src={props.image} alt="" />
      <p className="show-card-paragraph">{props.paragraph}</p>
    </div>
  );
};

export default ShowCard;
