'use client';

import { useState } from 'react';
import { FaShare } from 'react-icons/fa';

export default function ShareButton({ vehicleId, vehicleImage, vehicleName, vehicleDetails }) {
  const [showOptions, setShowOptions] = useState(false);

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
            const file = new File([blob], `${vehicleName.split(' ').join('-')}.jpg`, { type: blob.type || 'image/jpeg' });
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

  return (
    <div className="relative">
      <button onClick={handleShare} className="flex items-center gap-2 px-4 py-1 bg-neutral-500 text-white rounded-lg font-medium hover:bg-neutral-200 hover:text-neutral-800 transition-colors text-sm" aria-label="Share vehicle">
        <FaShare className="text-sm" />
      </button>
    </div>
  );
}