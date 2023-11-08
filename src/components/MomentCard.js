import "./MomemntCard.css";
import Slider from "./Slider";

const MomemntCard = (props) => {
  return (
    <div className="moment-card-root">
      <h1 className="moment-card-title1">{props.title}</h1>
      <h2 className="moment-card-title2">
        Season {props.season} Episode {props.episode}
      </h2>
      <Slider slides={props.slides} />
      <p className="moment-card-paragraph">{props.paragraph}</p>
    </div>
  );
};

export default MomemntCard;
