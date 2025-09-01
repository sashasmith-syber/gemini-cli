import React, { useRef, useState } from 'react';
import AudioModule from './modules/AudioModule';
import VideoModule from './modules/VideoModule';

function App() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isVideoActive, setIsVideoActive] = useState(false);

  const handleStartAudio = async () => {
    try {
      const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStream(audioStream);
      setIsAudioActive(true);
    } catch (err) {
      console.error("Error accessing audio: ", err);
    }
  };

  const handleStopAudio = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsAudioActive(false);
    }
  };

  const handleStartVideo = async () => {
    try {
      const videoStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: isAudioActive });
      if (videoRef.current) {
        videoRef.current.srcObject = videoStream;
      }
      setStream(videoStream);
      setIsVideoActive(true);
    } catch (err) {
      console.error("Error accessing video: ", err);
    }
  };

  const handleStopVideo = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsVideoActive(false);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="card bg-light">
        <div className="card-header">
          <h1 className="text-center">ATLAS MPC</h1>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <VideoModule 
                videoRef={videoRef} 
                isVideoActive={isVideoActive} 
                onStartVideo={handleStartVideo} 
                onStopVideo={handleStopVideo} 
              />
            </div>
            <div className="col-md-4 d-flex align-items-center">
              <AudioModule 
                isAudioActive={isAudioActive} 
                onStartAudio={handleStartAudio} 
                onStopAudio={handleStopAudio} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
