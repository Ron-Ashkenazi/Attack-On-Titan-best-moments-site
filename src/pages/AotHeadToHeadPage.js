import "./AotHeadToHeadPage.css";
import MomemntCard from "../components/MomentCard";
import Card from "../components/UI/Card";
import WinTieLoseRate from "../components/WinTieLoseRate";
import AotHeader from "../components/AotHeader";
import { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa";
import swordGif from "../Images/swordGif.gif";
import Modal from "../components/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { URL1, URL3 } from "./urls";

const AotHeadToHeadPage = () => {
  // useStates
  const [loading, setLoading] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const num1temp = Math.floor(Math.random() * 48);
  let num2temp = Math.floor(Math.random() * 48);

  while (num2temp === num1temp) {
    num2temp = Math.floor(Math.random() * 48);
  }

  const [firstMoment, setFirstMoment] = useState(num1temp);
  const [secondMoment, setSecondMoment] = useState(num2temp);

  const [arraySize, setArraySize] = useState(0);
  const [momentsData, setMomentsData] = useState([]);
  const [momentsDataStats, setMomentsDataStats] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedchoice, setSelectedchoice] = useState("");
  const [modalString, setModalString] = useState("");

  // Changing moments function
  const refreshMoments = () => {
    const num1 = Math.floor(Math.random() * arraySize);
    let num2 = Math.floor(Math.random() * arraySize);

    while (num2 === num1) {
      num2 = Math.floor(Math.random() * arraySize);
    }
    setFirstMoment(num1);
    setSecondMoment(num2);
  };

  // Different choices variable and function
  const choiceHandler = (choice) => {
    let leftUp = "left";
    let rightBottom = "right";

    if (isSmallScreen) {
      rightBottom = "bottom";
      leftUp = "upper";
    }

    const choices = [
      "Are you sure you want to give a win to the " + leftUp + " moment?",
      "Are you sure you want to give a win to the " + rightBottom + " moment?",
      "Are you sure you want to give a tie between these moments?",
    ];

    if (choice === "first") {
      setModalString(choices[0]);
    } else if (choice === "second") {
      setModalString(choices[1]);
    } else {
      setModalString(choices[2]);
    }
  };

  // Fetching data from the DB with useEffect
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(URL1);
      const response2 = await fetch(URL3);

      const data = await response.json();
      const data2 = await response2.json();

      setArraySize(data.length);

      const momentsWithUrls = data.map((moment) => {
        const slides = JSON.parse(moment.slides); // Parse the 'slides' string into an object
        const urls = generateSlideURLs(slides.url, slides.size);
        return { ...moment, urls }; // Spread the moment object and add 'urls' property
      });

      setMomentsData(momentsWithUrls);
      setMomentsDataStats(data2);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Helping functions
  const updateScreenSize = () => {
    setIsSmallScreen(window.innerWidth <= 1270);
  };

  function generateSlideURLs(baseURL, size) {
    const urls = [];

    for (let i = 0; i < size; i++) {
      const slideLetter = String.fromCharCode(65 + i); // A, B, C, ...
      const slideURL = `${baseURL}${slideLetter}`;
      urls.push({ url: slideURL }); // Create an object with the 'url' property
    }

    return urls;
  }

  // Get screen size with useEffect
  useEffect(() => {
    // Update the screen size initially and whenever the window is resized
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateScreenSize);
    };
  }, []);

  // Sending result to the DB
  const handleSubmit = (option) => {
    const newData = {
      id1: momentsData[firstMoment].id,
      id2: momentsData[secondMoment].id,
      label: option,
    };

    fetch(URL3, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((updatedMoment) => {
        toast.success("Your vote was sent successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.error("Error updating votes:", error);
        toast.error("Something went wrong, please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  // Modal functions
  const openModal = (choice) => {
    setIsModalOpen(true);
    choiceHandler(choice);
    setSelectedchoice(choice);
  };

  const cancelModal = () => {
    setIsModalOpen(false);
  };

  const confirmModal = (event) => {
    setIsModalOpen(false);
    handleSubmit(event);
  };

  return (
    <div className="aot-head-to-head-page-root">
      <AotHeader />
      {loading ? (
        <div className="loading-img-div">
          <img className="sword" src={swordGif} alt=""></img>
        </div>
      ) : (
        <div className="aot-head-to-head-page">
          <Card className="card aot-head-to-head-card">
            <MomemntCard
              slides={momentsData[firstMoment]?.urls}
              title={momentsData[firstMoment]?.title}
              season={momentsData[firstMoment]?.season}
              episode={momentsData[firstMoment]?.episode}
              paragraph={momentsData[firstMoment]?.paragraph}
            />
            <WinTieLoseRate
              win={momentsDataStats[firstMoment]?.win}
              tie={momentsDataStats[firstMoment]?.tie}
              lose={momentsDataStats[firstMoment]?.lose}
              totalVotes={momentsDataStats[firstMoment]?.totalVotes}
            />
          </Card>

          <div className="middle-card-div">
            <Card className="card middle-card">
              <h3>Which moment do you prefer?</h3>
              <button
                className="left-button"
                onClick={() => openModal("first")}
              >
                {isSmallScreen ? <FaArrowUp /> : <FaArrowLeft />}
              </button>
              <button
                className="right-button"
                onClick={() => openModal("second")}
              >
                {isSmallScreen ? <FaArrowDown /> : <FaArrowRight />}
              </button>
              <div>
                <button className="tie-button" onClick={() => openModal("tie")}>
                  Tie
                </button>
                <Modal
                  isOpen={isModalOpen}
                  confirmModal={() => confirmModal(selectedchoice)}
                  cancelModal={cancelModal}
                >
                  <h3>{modalString}</h3>
                </Modal>
              </div>
              <div>
                <button className="refresh-button" onClick={refreshMoments}>
                  Refresh Moments
                </button>
              </div>
            </Card>
          </div>
          <ToastContainer />

          <Card className="card aot-head-to-head-card">
            <MomemntCard
              slides={momentsData[secondMoment]?.urls}
              title={momentsData[secondMoment]?.title}
              season={momentsData[secondMoment]?.season}
              episode={momentsData[secondMoment]?.episode}
              paragraph={momentsData[secondMoment]?.paragraph}
            />
            <WinTieLoseRate
              win={momentsDataStats[secondMoment]?.win}
              tie={momentsDataStats[secondMoment]?.tie}
              lose={momentsDataStats[secondMoment]?.lose}
              totalVotes={momentsDataStats[secondMoment]?.totalVotes}
            />
          </Card>
        </div>
      )}
    </div>
  );
};

export default AotHeadToHeadPage;
