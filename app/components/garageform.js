"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function GarageForm() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [vehicleImageInputKey, setVehicleImageInputKey] = useState(0);
  const [vehicleFormData, setVehicleFormData] = useState({
    image: null,
    year: "",
    make: "",
    model: "",
    extraInfo: "",
  });

  const [vehicleMakes, setVehicleMakes] = useState([]);
  const [vehicleModels, setVehicleModels] = useState([]);
  const [vehicleImagePreview, setVehicleImagePreview] = useState("");
  const [rimFormData, setRimFormData] = useState({
    image: null,
    name: "",
    brand: "",
    size: "",
    finish: "",
    price: "",
    extraInfo: "",
  });
  
  const [accessoryFormData, setAccessoryFormData] = useState({
    image: null,
    name: "",
    brand: "",
    category: "",
    price: "",
    extraInfo: "",
  });

  useEffect(() => {
    fetch("/api/vehicles/makes")
      .then((response) => response.json())
      .then((result) => {
        const makeNames = result.Results.map((make) => make.MakeName);
        setVehicleMakes(makeNames);
      })
  }, []);

  useEffect(() => {
    if (!vehicleFormData.make) {
      setVehicleModels([]);
      return;
    }

    fetch(`/api/vehicles/models?make=${encodeURIComponent(vehicleFormData.make)}`)
      .then((response) => response.json())
      .then((result) => {
        const modelNames = result.Results.map((item) => item.Model_Name);
        setVehicleModels(modelNames);
      })
  }, [vehicleFormData.make]);

  const handleVehicleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleFormData((prev) => {
      if (name == "make") {
        return { ...prev, make: value, model: "" };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleVehicleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setVehicleFormData((prev) => ({ ...prev, image: file }));

    const reader = new FileReader();
    reader.onload = (event) => {
      setVehicleImagePreview(event.target?.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("category", selectedCategory);

    if (selectedCategory == "vehicle") {
      formDataToSend.append("imageName", vehicleImagePreview || "");
      formDataToSend.append("year", vehicleFormData.year);
      formDataToSend.append("make", vehicleFormData.make);
      formDataToSend.append("model", vehicleFormData.model);
      formDataToSend.append("extraInfo", vehicleFormData.extraInfo || "");
    }

    if (selectedCategory == "rims") {
      formDataToSend.append("name", rimFormData.name);
      formDataToSend.append("brand", rimFormData.brand);
      formDataToSend.append("size", rimFormData.size);
      formDataToSend.append("finish", rimFormData.finish);
      formDataToSend.append("price", rimFormData.price);
      formDataToSend.append("extraInfo", rimFormData.extraInfo || "");
    }

    if (selectedCategory == "accessories") {
      formDataToSend.append("name", accessoryFormData.name);
      formDataToSend.append("brand", accessoryFormData.brand);
      formDataToSend.append("category", accessoryFormData.category);
      formDataToSend.append("price", accessoryFormData.price);
      formDataToSend.append("extraInfo", accessoryFormData.extraInfo || "");
    }

    const response = await fetch("/api/garage", {
        method: "POST",
        body: formDataToSend,
    });

    redirect("/garage");
  };

  const renderVehicleForm = () => (
    <div className="grid gap-6">
      <div className="card">
        <div className="p-4">
          <label className="block">
            <span className="text-sm font-medium">Image</span>
            <input
              key={vehicleImageInputKey}
              type="file"
              accept="image/*"
              onChange={handleVehicleImageChange}
              className="file:[display:none] text-gray-700 mt-2 block w-full bg-white border border-gray-200 rounded px-3 py-2"
            />
          </label>
        </div>
      </div>

      <div className="card">
        <div className="p-4 grid gap-4">
          <label className="block">
            <span className="text-sm font-medium">Year</span>
            <input
              type="number"
              name="year"
              value={vehicleFormData.year}
              onChange={handleVehicleInputChange}
              placeholder="Select Year"
              required
              className="text-gray-700 mt-2 block w-full bg-white border border-gray-200 rounded px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Manufacturer</span>
            <select
              name="make"
              value={vehicleFormData.make}
              onChange={handleVehicleInputChange}
              required
              className="text-gray-700 mt-2 block w-full bg-white border border-gray-200 rounded px-3 py-2"
            >
              <option value="">Select Manufacturer</option>
              {vehicleMakes.map((make) => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium">Model</span>
            <select
              name="model"
              value={vehicleFormData.model}
              onChange={handleVehicleInputChange}
              required
              className="text-gray-700 mt-2 block w-full bg-white border border-gray-200 rounded px-3 py-2"
            >
              <option value="">Select Model</option>
              {vehicleModels.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="card">
        <div className="p-4">
          <label className="block">
            <span className="text-sm font-medium">Additional Information</span>
            <textarea
              name="extraInfo"
              value={vehicleFormData.extraInfo}
              onChange={handleVehicleInputChange}
              placeholder="Tell us more about the vehicle (30 characters)"
              rows="4"
              maxLength={30}
              className="text-gray-700 text-sm mt-2 block w-full bg-white border border-gray-200 rounded px-4 py-4"
            />
          </label>
        </div>
      </div>

      {(() => {
        if (vehicleImagePreview) {
          return (
            <div className="card">
              <div className="p-4">
                <p className="muted text-sm mb-2">Preview:</p>
                <div className="p-4">
                  <p className="muted">{vehicleFormData.year} • {vehicleFormData.make}</p>
                  <h2 className="text-lg font-semibold">{vehicleFormData.model}</h2>
                </div>
                <img src={vehicleImagePreview} alt="preview" className="w-full max-w-md rounded" />
                <div className="p-4">
                  <p className="muted text-sm">{vehicleFormData.extraInfo}</p>
                </div>
              </div>
            </div>
          );
        }

        return null;
      })()}
    </div>
  );

  const renderRimForm = () => (
    <div className="grid gap-6">
      <div className="card">
        <div className="p-4 grid gap-4">
          <label className="block">
            <span className="text-sm font-medium">Rim Name</span>
            <input
              type="text"
              value={rimFormData.name}
              onChange={(e) => setRimFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Rim name"
              className="text-gray-700 mt-2 block w-full bg-white border border-gray-200 rounded px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Brand</span>
            <input
              type="text"
              value={rimFormData.brand}
              onChange={(e) => setRimFormData((prev) => ({ ...prev, brand: e.target.value }))}
              placeholder="Brand"
              className="text-gray-700 mt-2 block w-full bg-white border border-gray-200 rounded px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Size</span>
            <input
              type="text"
              value={rimFormData.size}
              onChange={(e) => setRimFormData((prev) => ({ ...prev, size: e.target.value }))}
              placeholder="e.g. 18x8.5"
              className="text-gray-700 mt-2 block w-full bg-white border border-gray-200 rounded px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Finish</span>
            <input
              type="text"
              value={rimFormData.finish}
              onChange={(e) => setRimFormData((prev) => ({ ...prev, finish: e.target.value }))}
              placeholder="Finish"
              className="text-gray-700 mt-2 block w-full bg-white border border-gray-200 rounded px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Price</span>
            <input
              type="number"
              value={rimFormData.price}
              onChange={(e) => setRimFormData((prev) => ({ ...prev, price: e.target.value }))}
              placeholder="Price"
              className="text-gray-700 mt-2 block w-full bg-white border border-gray-200 rounded px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Additional Information</span>
            <textarea
              value={rimFormData.extraInfo}
              onChange={(e) => setRimFormData((prev) => ({ ...prev, extraInfo: e.target.value }))}
              placeholder="Fitment notes or details"
              className="text-gray-700 text-sm mt-2 block w-full bg-white border border-gray-200 rounded px-4 py-4"
            />
          </label>
        </div>
      </div>
    </div>
  );

  const renderAccessoryForm = () => (
    <div className="grid gap-6">
      <div className="card">
        <div className="p-4 grid gap-4">
          <label className="block">
            <span className="text-sm font-medium">Accessory Name</span>
            <input
              type="text"
              value={accessoryFormData.name}
              onChange={(e) => setAccessoryFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Accessory name"
              className="text-gray-700 mt-2 block w-full bg-white border border-gray-200 rounded px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Brand</span>
            <input
              type="text"
              value={accessoryFormData.brand}
              onChange={(e) => setAccessoryFormData((prev) => ({ ...prev, brand: e.target.value }))}
              placeholder="Brand"
              className="text-gray-700 mt-2 block w-full bg-white border border-gray-200 rounded px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Category</span>
            <input
              type="text"
              value={accessoryFormData.category}
              onChange={(e) => setAccessoryFormData((prev) => ({ ...prev, category: e.target.value }))}
              placeholder="Category"
              className="text-gray-700 mt-2 block w-full bg-white border border-gray-200 rounded px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Price</span>
            <input
              type="number"
              value={accessoryFormData.price}
              onChange={(e) => setAccessoryFormData((prev) => ({ ...prev, price: e.target.value }))}
              placeholder="Price"
              className="text-gray-700 mt-2 block w-full bg-white border border-gray-200 rounded px-3 py-2"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Additional Information</span>
            <textarea
              value={accessoryFormData.extraInfo}
              onChange={(e) => setAccessoryFormData((prev) => ({ ...prev, extraInfo: e.target.value }))}
              placeholder="Details about the accessory"
              rows="4"
              className="text-gray-700 text-sm mt-2 block w-full bg-white border border-gray-200 rounded px-4 py-4"
            />
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="p-4 grid gap-4">
        <label className="block">
          <span className="text-sm font-medium">Category</span>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setVehicleImageInputKey((prev) => prev + 1);
            }}
            className="text-gray-700 mt-2 block w-full bg-white border border-gray-200 rounded px-3 py-2"
          >
            <option value="">Select an item type</option>
            <option value="vehicle">Vehicle</option>
            <option value="rims">Rims</option>
            <option value="accessories">Accessories</option>
          </select>
        </label>

        {(() => {
          if (selectedCategory == "vehicle") {
            return renderVehicleForm();
          } else if (selectedCategory == "rims") {
            return renderRimForm();
          } else if (selectedCategory == "accessories") {
            return renderAccessoryForm();
          }

          return null;
        })()}

        {(() => {
          if (selectedCategory) {
            return (
              <div className="max-w-3xl mx-auto">
                <button type="submit" className="btn-accent w-full">Submit</button>
              </div>
            );
          }

          return null;
        })()}
      </div>
    </form>
  );
}