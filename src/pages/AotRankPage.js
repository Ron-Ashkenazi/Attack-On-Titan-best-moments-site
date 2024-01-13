import "./AotRankPage.css";

import MomemntCard from "../components/MomentCard";
import Card from "../components/UI/Card";
import BarChart from "../components/BarChart";
import AotHeader from "../components/AotHeader";
import Modal from "../components/Modal";

import { useState, useEffect } from "react";

import swordGif from "../Images/swordGif.gif";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AotRankPage = () => {
  const URL1 = process.env.REACT_APP_API_URL1;
  const URL2 = process.env.REACT_APP_API_URL2;

  // useStates
  const [loading, setLoading] = useState(false);
  const [currentMomentIndex, setCurrentMomentIndex] = useState(0);

  const [momentsData, setMomentsData] = useState([]);
  const [momentsDataStats, setMomentsDataStats] = useState([]);

  const [selectedNumber, setSelectedNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedMomentIndex, setSelectedMomentIndex] =
    useState(currentMomentIndex);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetching data from the DB with useEffect
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(URL1);
      const response2 = await fetch(URL2);

      const data = await response.json();
      const data2 = await response2.json();

      const momentsWithUrls = data.map((moment) => {
        const slides = JSON.parse(moment.slides); // Parse the 'slides' string into an object
        const urls = generateSlideURLs(slides.url, slides.size);
        return { ...moment, urls }; // Spread the moment object and add 'urls' property
      });
      setMomentsDataStats(data2);
      setMomentsData(momentsWithUrls);
      setLoading(false);
    };

    fetchData();
  }, [URL1, URL2]);

  // Helping functions
  function generateSlideURLs(baseURL, size) {
    const urls = [];

    for (let i = 0; i < size; i++) {
      const slideLetter = String.fromCharCode(65 + i); // A, B, C, ...
      const slideURL = `${baseURL}${slideLetter}`;
      urls.push({ url: slideURL }); // Create an object with the 'url' property
    }

    return urls;
  }

  function isRoundNumber(number) {
    return number % 1 === 0;
  }

  // Navigations functions
  const handleNextMoment = () => {
    setErrorMessage("");
    setSelectedNumber("");
    setCurrentMomentIndex((prevIndex) => (prevIndex + 1) % momentsData.length);
  };

  const handlePrevMoment = () => {
    setErrorMessage("");
    setSelectedNumber("");
    setCurrentMomentIndex((prevIndex) =>
      prevIndex === 0 ? momentsData.length - 1 : prevIndex - 1
    );
  };

  const handleMomentSelection = (event) => {
    setErrorMessage("");
    setSelectedNumber("");
    const selectedIndex = parseInt(event.target.value);
    setSelectedMomentIndex(selectedIndex);
  };

  // Sending new rating to the DB
  const handleSubmit = (event) => {
    event.preventDefault();

    setErrorMessage("");
    const newData = {
      id: momentsData[currentMomentIndex].id,
      label: selectedNumber,
    };

    setSelectedNumber("");

    fetch(URL2, {
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
  const openModal = () => {
    if (
      isNaN(selectedNumber) ||
      selectedNumber < 1 ||
      selectedNumber > 10 ||
      !isRoundNumber(selectedNumber)
    ) {
      setErrorMessage("Please enter a valid number between 1 and 10.");
    } else {
      setIsModalOpen(true);
    }
  };

  const cancelModal = () => {
    setIsModalOpen(false);
  };

  const confirmModal = (event) => {
    setIsModalOpen(false);
    handleSubmit(event);
  };

  return (
    <div className="aot-rank-page-root">
      <AotHeader />
      {loading ? (
        <div className="loading-img-div">
          <img className="sword" src={swordGif} alt=""></img>
        </div>
      ) : (
        <div className="aot-rank-page-center-div">
          <Card className="card aot-rank-card">
            <MomemntCard
              slides={momentsData[currentMomentIndex]?.urls}
              title={momentsData[currentMomentIndex]?.title}
              season={momentsData[currentMomentIndex]?.season}
              episode={momentsData[currentMomentIndex]?.episode}
              paragraph={momentsData[currentMomentIndex]?.paragraph}
            />
            <div className="form-container">
              <h3>How would you rate this moment? (1-10)</h3>

              <div className="all-buttons">
                <button className="perv-button" onClick={handlePrevMoment}>
                  Prev
                </button>
                <div className="submit-rank-div">
                  <input
                    value={selectedNumber}
                    type="number"
                    max="10"
                    min="1"
                    onChange={(e) => setSelectedNumber(e.target.value)}
                    required
                  />
                  <button onClick={openModal}>Submit</button>
                  <Modal
                    isOpen={isModalOpen}
                    confirmModal={confirmModal}
                    cancelModal={cancelModal}
                  >
                    <h3>
                      Are you sure you want to give this moment a rating of{" "}
                      {selectedNumber}?
                    </h3>
                  </Modal>
                </div>
                <button className="next-button" onClick={handleNextMoment}>
                  Next
                </button>
              </div>
              {errorMessage && (
                <p className="error-message-aot-rank">{errorMessage}</p>
              )}
              <div className="moment-selector-div">
                <select
                  className="moment-selector"
                  value={selectedMomentIndex}
                  onChange={handleMomentSelection}
                >
                  {momentsData.map((moment, index) => (
                    <option
                      key={index}
                      value={index}
                      className={`${
                        index === currentMomentIndex
                          ? "moment-selector-bold"
                          : ""
                      }`}
                    >
                      {moment.title} - S{moment.season}, E{moment.episode}
                    </option>
                  ))}
                </select>
                <button
                  className="go-to-moment-button"
                  onClick={() => setCurrentMomentIndex(selectedMomentIndex)}
                >
                  Go to Moment
                </button>
              </div>
            </div>
            <ToastContainer />
          </Card>
          <Card className="card aot-rank-card-bar-chart">
            {momentsDataStats[currentMomentIndex]?.voteData ? (
              <BarChart
                voteData={momentsDataStats[currentMomentIndex]?.voteData}
              />
            ) : (
              <></>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default AotRankPage;
