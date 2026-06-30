'use client';

import { useRouter } from 'next/navigation';

export default function VehicleCard({ vehicle }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      try {
        const response = await fetch(`/api/vehicles/${vehicle._id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          router.refresh();
        } else {
          console.error('Failed to delete');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  let imageLink = null;
  
  if (vehicle.imageData) {
    imageLink = (
      <div className="h-72 overflow-hidden rounded-t-xl bg-transparent">
        <img 
          src={vehicle.imageData} 
          alt={vehicle.make + " " + vehicle.model} 
          className="w-full h-full object-cover rounded-t-xl" 
        />
      </div>
    );
  } else if (vehicle.imageName) {
    imageLink = (
      <div className="h-72 overflow-hidden rounded-t-xl bg-transparent">
        <img 
          src={"/images/cars/" + vehicle.imageName} 
          alt={vehicle.make + " " + vehicle.model} 
          className="w-full h-full object-cover rounded-t-xl" 
        />
      </div>
    );
  }

  return (
    <li className="card">
      <div className="p-4">
        <p className="muted uppercase">{vehicle.year} - {vehicle.make}</p>
        <h2 className="text-lg font-semibold">{vehicle.model}</h2>
      </div>

      {imageLink}

      <div className="p-4">
        <p className="muted text-sm">{vehicle.extraInfo}</p>
      </div>

      <div className="p-4 pt-0 flex gap-2">
        <button 
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
        >
          Delete
        </button>
      </div>
    </li>
  );
}