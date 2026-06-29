"use client";

import { useEffect, useState } from "react";
import VehicleCard from "@/app/components/vehiclecard/vehiclecard";
import carInfo from "../../data/carinfo";

export default function Gallery() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const info = localStorage.getItem("submittedCars");
    setSubmissions(JSON.parse(info || "[]"));
  }, []);

  const both = [...carInfo, ...submissions];

  return (
    <div className="space-y-8 py-10">
      <ul className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
        {both.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </ul>
    </div>
  );
}