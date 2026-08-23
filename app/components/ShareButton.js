'use client';

import { useState } from 'react';

export default function ShareButton({ vehicleId, vehicleImage, vehicleName, vehicleDetails }) {
  const [showOptions, setShowOptions] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL || window.location.origin}/vehicle/${vehicleId}`;
  let shareText = "";

  if (vehicleDetails) {
    shareText = `Check out this ${vehicleDetails.year || ""} ${vehicleDetails.make || ""} ${vehicleDetails.model || ""} uploaded with WHEELGEN!`;
  } else {
    shareText = `Check out this vehicle design: ${vehicleName || "WHEELGEN Vehicle Design"}`;
 }

  const shareData = {
    title: vehicleName || "Vehicle Design",
    text: shareText,
    url: shareUrl,
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        if (vehicleImage) {
          try {
            const response = await fetch(vehicleImage);
            const blob = await response.blob(); //blob converts response to a binary object, which can be used to create the file.
            const file = new File([blob], 'vehicle.jpg', { type: blob.type || 'image/jpeg' });
            await navigator.share({
              title: shareData.title,
              text: shareData.text,
              files: [file]
            });
          } catch {
            await navigator.share(shareData);
          }
        } else {
          await navigator.share(shareData);
        }
        trackShare(vehicleId);
      } catch (error) {
        console.error(error);
      }
    } else {
      setShowOptions(!showOptions);
    }
  };

  const copyLinkShare = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      trackShare(vehicleId);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const facebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank');
    trackShare(vehicleId);
  };

  const trackShare = async (id) => {
    try {
      await fetch('/api/vehicles/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vehicleId: id }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return ( <div> </div> );
}