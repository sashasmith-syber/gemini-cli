import React from 'react';

interface VideoModuleProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isVideoActive: boolean;
  onStartVideo: () => void;
  onStopVideo: () => void;
}

const VideoModule: React.FC<VideoModuleProps> = ({ videoRef, isVideoActive, onStartVideo, onStopVideo }) => {
  return (
    <div className="col-12 text-center">
      <div className="col-12 text-center mb-4">
        <video ref={videoRef} autoPlay playsInline className="w-100 border rounded" style={{ maxHeight: '480px'}} />
      </div>
      <div className="col-12 d-grid gap-2">
        <button className={`btn ${isVideoActive ? 'btn-danger' : 'btn-primary'}`} onClick={isVideoActive ? onStopVideo : onStartVideo}>
          {isVideoActive ? 'Stop Video Capture' : 'Start Video Capture'}
        </button>
      </div>
    </div>
  );
};

export default VideoModule;
