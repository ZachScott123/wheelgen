export default function VehicleCard({ vehicle }) {
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
    </li>
  );
}