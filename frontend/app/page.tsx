
"use client"
import { useState } from "react";

export default function Home() {
  const [offer, setOffer] = useState("");
  const [answer, setAnswer] = useState("");
  const [localDescriptionSet, setLocalDescriptionSet] = useState(false);
  const localpeerConnection = new RTCPeerConnection();

  localpeerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      // Send the candidate to the remote peerv
      console.log(event.candidate);
    }
  };

  localpeerConnection.oniceconnectionstatechange = () => {
    console.log('ICE connection state:', localpeerConnection.iceConnectionState);
  };

  return (
    <div>
      <div className="generate">
        <div id="offer"></div>
        <button onClick={() => {
          localpeerConnection.createOffer().then((offer) => {
            localpeerConnection.setLocalDescription(offer).then(() => {
              setLocalDescriptionSet(true);
              console.log(JSON.stringify(offer));
              const offerElement = document.getElementById("offer");
              if (offerElement) {
                offerElement.innerText = JSON.stringify(offer);
              }
            }).catch((error) => {
              console.error("Error setting local description:", error);
            });
          }).catch((error) => {
            console.error("Error creating offer:", error);
          });
        }}>Generate Offer</button>
      </div>
      <div className="addRemote">
        <input type="text" name="" id="remoteOffer" onChange={(event) => {
          setOffer(event.target.value);
        }} />
        <button onClick={() => {
          try {
            const parsedOffer = JSON.parse(offer);
            if (!localDescriptionSet) {
              localpeerConnection.setRemoteDescription(parsedOffer).then(() => {
                console.log(parsedOffer);
                localpeerConnection.createAnswer().then((answer) => {
                  localpeerConnection.setLocalDescription(answer).then(() => {
                    console.log(answer);
                    const answerElement = document.getElementById("generatedAnswer");
                    if (answerElement) {
                      answerElement.innerText = JSON.stringify(answer);
                    }
                  }).catch((error) => {
                    console.error("Error setting local description:", error);
                  });
                }).catch((error) => {
                  console.error("Error creating answer:", error);
                });
              }).catch((error) => {
                console.error("Error setting remote description:", error);
              });
            } else {
              console.error("Local description not set yet.");
            }
          } catch (error) {
            console.error("Invalid JSON", error);
          }
        }}>Add Remote Offer</button>
        <div className="answer"></div>
        <div className="add-answer">
          <button onClick={() => {
            try {
              const parsedAnswer = JSON.parse(answer);
              console.log(parsedAnswer);
              if (localDescriptionSet) {
                localpeerConnection.setRemoteDescription(parsedAnswer).then(() => {
                  console.log(parsedAnswer);
                }).catch((error) => {
                  console.error("Error setting remote description:", error);
                });
              } else {
                console.error("Local description not set yet.");
              }
            } catch (error) {
              console.error("Invalid JSON", error);
            }
          }}>Add Remote Answer</button>
          <input type="text" name="" id="" onChange={(event) => {
            setAnswer(event.target.value);
          }} />
          <div id="generatedAnswer"></div>
        </div>
      </div>
    </div>
  );
}