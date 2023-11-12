import "./AotHardcoreRank.css";

import MomemntCard from "../components/MomentCard";
import Card from "../components/UI/Card";
import BarChart from "../components/BarChart";
import AotHeader from "../components/AotHeader";
import Modal from "../components/Modal";
import MomentTracker from "../components/MomentTracker";
import DraggableTable from "../components/DraggableTable";
import FinalTable from "../components/FinalTable";

import { useState, useEffect } from "react";

import swordGif from "../Images/swordGif.gif";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AotHardcoreRank = () => {
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
  const [allMomentsVoted, setAllMomentsVoted] = useState(false);

  const [nextPart, setNextPart] = useState(false);
  const [finished, setFinished] = useState(false);
  const [votesArray, setVotesArray] = useState([]);
  const [arrays, setArrays] = useState([]);
  const [finalTableArray, setFinalTableArray] = useState({});

  const [arraysIndex, setArraysIndex] = useState();

  const [finishOrReset, setFinishOrReset] = useState("");

  // Fetching data from the DB with useEffect
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 3500);
      const response = await fetch(
        "https://aot-site-server.onrender.com/api/aot/moments/"
      );
      const response2 = await fetch(
        "https://aot-site-server.onrender.com/api/aot/moments-relax-stats"
      );

      const data = await response.json();
      const data2 = await response2.json();

      const momentsWithUrls = data.map((moment) => {
        const slides = JSON.parse(moment.slides); // Parse the 'slides' string into an object
        const urls = generateSlideURLs(slides.url, slides.size);
        return { ...moment, urls }; // Spread the moment object and add 'urls' property
      });
      setMomentsDataStats(data2);
      setMomentsData(momentsWithUrls);
    };

    fetchData();
  }, []);

  // useEffects functions
  useEffect(() => {
    const storedVotes = JSON.parse(localStorage.getItem("votes")) || [];
    const storedNextPart =
      JSON.parse(localStorage.getItem("nextPart")) || Boolean;
    const storedArrays = JSON.parse(localStorage.getItem("arrays")) || {};
    const storedFinished =
      JSON.parse(localStorage.getItem("finished")) || Boolean;
    const storedFinishedTable =
      JSON.parse(localStorage.getItem("finishedTable")) || {};
    const storedLowestIndex = JSON.parse(localStorage.getItem("lowestIndex"));

    setVotesArray(storedVotes);
    setArrays(storedArrays);
    setArraysIndex(storedLowestIndex);
    setNextPart(storedNextPart);
    setFinished(storedFinished);

    if (storedFinished === true) {
      setFinalTableArray(storedFinishedTable);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("votes", JSON.stringify(votesArray));
  }, [votesArray]);

  useEffect(() => {
    localStorage.setItem("nextPart", JSON.stringify(nextPart));
  }, [nextPart]);

  useEffect(() => {
    localStorage.setItem("arrays", JSON.stringify(arrays));
  }, [arrays]);

  useEffect(() => {
    localStorage.setItem("finishedTable", JSON.stringify(finalTableArray));
  }, [finalTableArray]);

  useEffect(() => {
    localStorage.setItem("finished", JSON.stringify(finished));
  }, [finished]);

  useEffect(
    () => {
      if (votesArray.length === 48) {
        let allVotesValid = true;

        for (let i = 0; i < votesArray.length; i++) {
          const vote = votesArray[i];

          if (vote === null || vote <= 0 || vote >= 11 || vote === undefined) {
            allVotesValid = false;
            break;
          }
        }

        setAllMomentsVoted(allVotesValid);
      } else {
        setAllMomentsVoted(false);
      }
    },
    [votesArray],
    []
  );

  const createFinalTable = () => {
    const finalArray = [];
    let rank = momentsData.length;
    for (let i = 0; i < arrays.length; i++) {
      let vote = i + 1;
      for (let j = arrays[i].length - 1; j > -1; j--) {
        const moment = {
          id: arrays[i][j].id,
          column1: arrays[i][j].column1,
          column2: arrays[i][j].column2,
          column3: arrays[i][j].column3,
          column4: vote,
          column5: rank,
        };
        rank -= 1;
        finalArray.push(moment);
      }
    }
    setFinished(true);
    setFinalTableArray(finalArray);
  };

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

  const handleChangeIndex = (index, newNum) => {
    const newNumAsNumber = parseFloat(newNum);
    const newVotesArray = [...votesArray];
    newVotesArray[index] = newNumAsNumber;
    setVotesArray(newVotesArray);
  };

  const updateArraysOrder = (newOrder) => {
    setArrays((prevArrays) => {
      const updatedArrays = [...prevArrays];
      updatedArrays[arraysIndex] = newOrder;
      return updatedArrays;
    });
  };

  const resetVotes = () => {
    setVotesArray([]);
    setAllMomentsVoted(false);
    setNextPart(false);
    setFinalTableArray({});
    setFinished(false);
    setArraysIndex({});
    setArrays([]);
    localStorage.removeItem("lowestIndex");
  };

  const createArrays = () => {
    const arrays = [[], [], [], [], [], [], [], [], [], []];
    let lowestVote = 11;

    for (let i = 0; i < votesArray.length; i++) {
      const vote = votesArray[i];
      if (vote - 1 < lowestVote) {
        lowestVote = vote - 1;
      }
      const moment = {
        id: momentsData[i]?.id,
        column1: momentsData[i]?.title,
        column2: momentsData[i]?.season,
        column3: momentsData[i]?.episode,
      };

      arrays[vote - 1]?.push(moment);
    }
    localStorage.setItem("lowestIndex", JSON.stringify(lowestVote));
    setArraysIndex(lowestVote);
    setArrays(arrays);
  };

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

  const findNextNonEmptyIndex = (currentIndex, step) => {
    let nextIndex = currentIndex;
    do {
      nextIndex = (nextIndex + step + arrays.length) % arrays.length;
    } while (arrays[nextIndex].length === 0 && nextIndex !== currentIndex);
    return nextIndex;
  };

  const handleNextArray = () => {
    const nextIndex = findNextNonEmptyIndex(arraysIndex, 1);
    setArraysIndex(nextIndex);
  };

  const handlePrevArray = () => {
    const prevIndex = findNextNonEmptyIndex(arraysIndex, -1);
    setArraysIndex(prevIndex);
  };

  // Sending new rating to the DB
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      isNaN(selectedNumber) ||
      selectedNumber < 1 ||
      selectedNumber > 10 ||
      !isRoundNumber(selectedNumber)
    ) {
      setErrorMessage("Please enter a valid number between 1 and 10.");
    } else {
      setErrorMessage("");
      setSelectedNumber("");
      handleChangeIndex(currentMomentIndex, selectedNumber);
    }
  };

  const handleSubmitAllVotes = (event) => {
    event.preventDefault();

    createArrays();

    fetch(
      "https://aot-site-server.onrender.com/api/aot/moments-relax-stats/updateAllVotes",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(votesArray),
      }
    )
      .then((response) => response.json())
      .then(() => {
        // Show success toast
        toast.success("All your votes were sent successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        // Set loading, wait, and move to the next part
        setTimeout(() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            setNextPart(true);
          }, 3500);
        }, 5000);
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
  const cancelModal = () => {
    setIsModalOpen(false);
  };

  const confirmModal2 = (option) => {
    if (option === "reset votes") {
      resetVotes();
    } else {
      createFinalTable();
    }
    setIsModalOpen(false);
  };

  // Print function
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      <link rel="stylesheet" type="text/css" href="FinalTable.css" />
    );
    printWindow.document.write(
      document.getElementById("final-table-element").innerHTML
    );
    printWindow.print();
  };

  return (
    <div className="aot-hardcore-rank-page-root">
      <AotHeader />

      {loading ? (
        <div className="loading-img-div">
          <img className="sword" src={swordGif} alt=""></img>
        </div>
      ) : (
        <div>
          {nextPart ? (
            <div>
              <div className="tabels-controllers-div">
                <Card className="card tables-card">
                  {finished ? (
                    <h1>
                      Congratulations you have finished the Hardcore Ranking!
                    </h1>
                  ) : (
                    <div>
                      <h1>Moments with the score {arraysIndex + 1}</h1>
                      <div className="buttons-container-final-ranking">
                        <button className="button" onClick={handlePrevArray}>
                          Prev score
                        </button>
                        <button className="button" onClick={handleNextArray}>
                          Next score
                        </button>
                        <button
                          className="button"
                          onClick={() => {
                            setFinishOrReset("finish");
                            setIsModalOpen(true);
                          }}
                        >
                          Finish
                        </button>
                      </div>
                      <p>
                        You can drag the rows in the table and change the
                        moments position by your personal preference. Once you
                        have finished click the "Finish" button and you will see
                        all your moments ranked from last to first (or the other
                        way by clicking the Rank column).
                      </p>
                    </div>
                  )}
                  <p>
                    If you want to reset ALL your votes and ranking all the
                    moments again, click here:
                  </p>
                  <button
                    className="reset-votes-button"
                    onClick={() => {
                      setFinishOrReset("reset votes");
                      setIsModalOpen(true);
                    }}
                  >
                    Reset votes
                  </button>
                  {finished ? (
                    <button onClick={handlePrint}>
                      Save table to share with friends
                    </button>
                  ) : (
                    <></>
                  )}

                  <Modal
                    isOpen={isModalOpen}
                    confirmModal={() => {
                      confirmModal2(finishOrReset);
                    }}
                    cancelModal={cancelModal}
                  >
                    <h3>
                      {finishOrReset === "finish"
                        ? "Are you sure you have finished? Once it is confirmed there is no way back."
                        : "Are you sure you want to reset all your votes? Once it is confirmed there is no way back."}
                    </h3>
                  </Modal>
                </Card>
              </div>
              <div className="tables-container">
                {finished ? (
                  <div id="final-table-element">
                    <FinalTable table={finalTableArray} />
                  </div>
                ) : (
                  <div>
                    <DraggableTable
                      className="draggable-table-aot-hardcore"
                      data={arrays[arraysIndex]}
                      onUpdateOrder={updateArraysOrder}
                    ></DraggableTable>
                  </div>
                )}
              </div>
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
                      <button onClick={handleSubmit}>Submit</button>
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
                    <Modal
                      isOpen={isModalOpen}
                      confirmModal={() => {
                        confirmModal2("reset votes");
                      }}
                      cancelModal={cancelModal}
                    >
                      <h3>
                        Are you sure you want to reset all your votes? Once it
                        is confirmed there is no way back.
                      </h3>
                    </Modal>
                  </div>
                </div>
                <ToastContainer />
              </Card>
              <div className="stats-tracker-container">
                <Card className="card aot-rank-moments-tracker">
                  <MomentTracker
                    votesArray={votesArray}
                    currentMomentIndex={currentMomentIndex}
                  />
                  <button
                    className="reset-votes-button"
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                  >
                    Reset votes
                  </button>
                  {allMomentsVoted ? (
                    <div className="continue-div">
                      <h3 className="next-step-h">
                        Well done! You have voted to all moments! (Please wait a
                        few seconds after pressing the button)
                      </h3>
                      <button
                        className="general-button"
                        onClick={handleSubmitAllVotes}
                      >
                        To the next part
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
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
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AotHardcoreRank;
