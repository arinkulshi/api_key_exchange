import React, { useState, useEffect } from 'react';
import PurchaseModal from './PurchaseModal';
import './VideoPlayer.css';

const VideoPlayer = () => {
  const [videoInfo, setVideoInfo] = useState(null);
  const [purchaseStatus, setPurchaseStatus] = useState(null);
  const [isSubmitting,setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchVideoInfo = async () => {
      const response = await fetch('http://localhost:5001/video/info');
      const data = await response.json();
      setVideoInfo(data);
    };

    fetchVideoInfo();
  }, []);

  const handlePurchase = async (pin) => {
    setIsSubmitting(true);
    const response = await fetch('http://localhost:5001/video/purchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: videoInfo.id, pin: parseInt(pin, 10), token: videoInfo.token })
    });

    const data = await response.json();

    if (data.status === 'failed' && data.message === 'Incorrect pin') {
      setErrorMessage('Incorrect PIN. Please try again.');
      return;
    }

    setErrorMessage(null);
    setSuccessMessage('Purchase is successful. Loading video...');
    setPurchaseStatus(data.status);

    if (data.status === 'waiting') {
      setIsSubmitting(false);
      const retryAfter = response.headers.get('Retry-After');
      setTimeout(() => handlePurchase(pin), retryAfter * 1000);
    }

    if (data.status === 'success') {
      const videoInfoResponse = await fetch('http://localhost:5001/video/info');
      const videoInfoData = await videoInfoResponse.json();
      setVideoInfo(videoInfoData);
    }
    
  };

  if (!videoInfo) {
    return <div>Loading...</div>;
  }

  if (videoInfo.status === 'purchased') {
    return (
      <div className="video-content">
        <video src={videoInfo.videoUrl} controls autoPlay/>
       <div><h3>Video "{videoInfo.title}" has been purchased</h3></div>
      </div>
    );
  }

  return (
    <div className="video-player">
    <h1>React Video Player Purchase Screen</h1>
    {errorMessage && <div>{errorMessage}</div>}
    {successMessage && <div>{successMessage}</div>}
    {purchaseStatus === 'waiting' && <PurchaseModal onPurchase={handlePurchase} />}
    <button onClick={() => setPurchaseStatus('waiting')}>Purchase Video</button>
    {videoInfo.status === 'purchased' && (
      <div >
        <video src={videoInfo.videoUrl} controls autoPlay />
        <h1>Video "{videoInfo.title}" has been purchased </h1>
      </div>
    )}
  </div>
  );
};

export default VideoPlayer;