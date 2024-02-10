"use client"
import { useState, useRef, useEffect, use } from "react";
export default function Video() {
    const localStream = useRef();
    var offer = useRef();
    const [pc , setPc] = useState({} as RTCPeerConnection);
    const constraints = { video: true, audio: true };
    useEffect(() => {
        setPc(new RTCPeerConnection());
        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                if (localStream.current) {
                    (localStream.current as HTMLVideoElement).srcObject = stream;
                }
                // stream.getTracks().forEach((track) => {
                //     pc.addTrack(track, stream);
                // });
            })
            .catch((error) => {
                console.error("Error accessing media devices.", error);
            });
    }
        , []);

    function createOffer() {
        pc.createOffer().then((offer) => {
            pc.setLocalDescription(offer).then(() => {
                console.log(offer);
            }).catch((error) => {
                console.error("Error setting local description:", error);
            });
        }).catch((error) => {
            console.error("Error creating offer:", error);
        });
    }
    pc.onicecandidate = (event) => {
        if (event.candidate) {
            console.log(event.candidate);
            // Send the candidate to the remote peer
        }
    }
    function addRemoteOffer(offer:string) {
        pc.setRemoteDescription(JSON.parse(offer)).then(() => {
            console.log(offer);
            pc.createAnswer().then((answer) => {
                pc.setLocalDescription(answer).then(() => {
                    console.log(answer);
                }).catch((error) => {
                    console.error("Error setting local description:", error);
                }
                );
            }).catch((error) => {
                console.error("Error creating answer:", error);
            });
        })
    }
    function addRemoteAnswer(answer: string) {
        pc.setRemoteDescription(JSON.parse(answer)).then(() => {
            console.log(answer);
        }
        );
    }
    return (
        <div>
        <video ref={localStream} autoPlay></video>
        <button onClick={createOffer}></button>
        <button onClick={addRemoteOffer(offer.current)}></button>
        <textarea ref={offer}></textarea>
        <button onClick={addRemoteAnswer}></button>
        </div>

    )
}
;