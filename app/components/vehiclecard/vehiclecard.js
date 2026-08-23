'use client';

import { useRouter } from 'next/navigation';
import ShareButton from './ShareButton';

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

  const handleEdit = () => {
    router.push(`/gallery/edit/${vehicle._id}`);
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
            onClick={handleEdit}
            className="flex-1 px-4 py-1 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
            Edit
        </button>
        <button 
            onClick={handleDelete}
            className="flex-1 px-4 py-1 bg-white text-gray-700 border-2 border-gray-300 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors">
            Delete
        </button>
    </div>
    </li>
  );
}