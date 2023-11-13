import React from "react";
import "./AotHomePage.css";
import Card from "../components/UI/Card";
import ShowCard from "../components/ShowCard";
import AotHeader from "../components/AotHeader";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import hthImg from "../Images/erenVSreiner.png";
import chillImg from "../Images/chill.jpg";
import hardcoreImg from "../Images/hardcore.jpg";

const AotHomePage = () => {
  const navigate = useNavigate();
  const relaxPara =
    "In this section you can go through the moments and rate each of them with a score between 1 and 10 and see statistics on each moment such as the average score, how many people voted for that moment, how many votes each score has and the percentage distribution among the voters.";
  const hthPara =
    "In this section 2 random moments come up and you choose your favorite and if you are unable to decide there is the option of a tie. In addition, there are statistics for every moment: the number of votes, the percentage of victories, draws and losses.";
  const hardcorePara =
    "This part is for the hardcore fans of the series. Like in the 'Relax Ranking' section, you can rate all the moments in the series with a score from 1 to 10 while viewing the statistics of each moment. The next step in this part is that after rating all the moments you have to do an internal rating for each score. For example: there are three moments with a score of 7, so at this stage you have to rank between all three, i.e. what is in the third, second and first place until finally you get a long table of all the existing moments ranked from last to first place.";

  return (
    <div className="aot-home-page-root">
      <AotHeader />
      <div className="welcome-div">
        <div className="text-div">
          <p className="title-p">
            Welcome to Attack On Titan best moments site!
          </p>
          <p className="explain-p">
            In this site you will be able to relive the series best moments and
            rank them by your personal preferences. There are three different
            platforms of ranking.
          </p>
        </div>
        <div className="background-image-div"></div>
      </div>
      <div className="info-div">
        <Card className="card info-card">
          <h1>Important Info</h1>
          <p>
            If there was any doubt, this is a SPOILER ALERT for the whole show,
            include the series finale. The moments refer to events in the
            series, so if you haven't finished it yet, you may be exposed to
            spoilers.
          </p>
          <p>There are a total of 48 moments from the show.</p>
          <p>
            In the "Relax Ranking" every time you rank a moment it will be saved
            to the site stats. In the "Hardcore Experience" your ranks for the
            moments will be sent to the site stats only after you have ranked
            ALL moments, only then you will be able to send your votes.
          </p>
          <p>
            The site is on free server so sometimes it won't work the fastest
            and even won't work at all. Try not to refresh it alot and please be
            patient.
          </p>
        </Card>
      </div>
      <div className="aot-home-page-horizontal-div">
        <Card
          onClick={() => navigate("aot-head-to-head")}
          className="card aot-home-card"
        >
          <Link to="/aot-head-to-head" className="card-link">
            <ShowCard
              title="Head to Head"
              image={hthImg}
              paragraph={hthPara}
            ></ShowCard>
          </Link>
        </Card>

        <Card
          onClick={() => navigate("aot-rank")}
          className="card aot-home-card"
        >
          <Link to="/aot-rank" className="card-link">
            <ShowCard
              title="Relax Ranking"
              image={chillImg}
              paragraph={relaxPara}
            ></ShowCard>
          </Link>
        </Card>

        <Card className="card aot-home-card">
          <Link to="/aot-hardcore-rank" className="card-link">
            <ShowCard
              title="The Hardcore Experience"
              image={hardcoreImg}
              paragraph={hardcorePara}
            ></ShowCard>
          </Link>
        </Card>
      </div>
      <div className="home-gap-div"></div>
    </div>
  );
};

export default AotHomePage;
