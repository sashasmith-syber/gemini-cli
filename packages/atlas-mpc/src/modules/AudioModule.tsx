import React, { useState } from 'react';

interface AudioModuleProps {
  isAudioActive: boolean;
  onStartAudio: () => void;
  onStopAudio: () => void;
}

const AudioModule: React.FC<AudioModuleProps> = ({ isAudioActive, onStartAudio, onStopAudio }) => {
  return (
    <div className="col-6 d-grid gap-2">
      <button className={`btn ${isAudioActive ? 'btn-danger' : 'btn-primary'}`} onClick={isAudioActive ? onStopAudio : onStartAudio}>
        {isAudioActive ? 'Stop Audio Capture' : 'Start Audio Capture'}
      </button>
      {isAudioActive && <div className="alert alert-info mt-3 text-center">Audio capture is active.</div>}
    </div>
  );
};

export default AudioModule;
