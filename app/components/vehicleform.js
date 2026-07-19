//changed
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VehicleForm() {

    const [formData, setFormData] = useState({
        image: null,
        year: "",
        make: "",
        model: "",
        extraInfo: ''
    });

    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);

    // ----------------------------

    useEffect(() => {
      fetch("/api/vehicles/makes")
        .then((response) => response.json())
        .then((result) => {
          if (result.Results) {
            const makeNames = result.Results.map((make) => make.MakeName);
            setMakes(makeNames);
          }
        })
        .catch((error) => console.error("Error:", error));
    }, []);

    useEffect(() => {
      if (!formData.make) {
        setModels([]);
        return;
      }

      fetch(`/api/vehicles/models?make=${encodeURIComponent(formData.make)}`)
        .then((response) => response.json())
        .then((result) => {
          if (result && result.Results) {
            const modelNames = result.Results.map((item) => item.Model_Name);
            setModels(modelNames);
          } else {
            setModels([]);
          }
        })
        .catch((error) => console.error("Error:", error));
    }, [formData.make]);

    //----------------------------

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData, image: file
            });
            const reader = new FileReader();
            reader.onload = (event) =>  { 
                setImagePreview(event.target.result);
            };
            reader.readAsDataURL(file);
        };
    };

    const handleInputChange = (e) => {
        const {name, value } = e.target;
        if (name == "make") {
            setFormData({ ...formData, make: value, model: "" });
        } else {
            setFormData({ ...formData, [name]: value });
        };
};

    const router = useRouter();

    const handleSubmit = async (e) => {
      e.preventDefault();

      const formDataToSend = new FormData();
      formDataToSend.append('imageName', imagePreview || '');
      formDataToSend.append('year', formData.year);
      formDataToSend.append('make', formData.make);
      formDataToSend.append('model', formData.model);
      formDataToSend.append('extraInfo', formData.extraInfo || '');

      try {
          const response = await fetch('/api/addVehicle', {
              method: 'POST',
              body: formDataToSend,
          });

          const data = await response.json();
          
          // Redirect to gallery
          if (data.redirect) {
              router.push(data.redirect);
          }
      } catch (error) {
          console.error('Error:', error);
      }
  };

    //----------------------------

    return (
      <div className="space-y-8 py-10">
        <h1 className="text-4xl text-gray-700 font-bold text-center">Upload Your Vehicle</h1>

        <form onSubmit={handleSubmit} method="POST" className="grid gap-6 max-w-3xl mx-auto">

          <div className="card">
            <div className="p-4">
              <label className="block">
                <span className="text-sm font-medium">Image</span>
                <input
                  type="file"
                  accept="image/*"
                  name="imageName"
                  onChange={handleChange}
                  required
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
                  value={formData.year}
                  onChange={handleInputChange}
                  placeholder="Select Year"
                  required
                  className="text-gray-700 mt-2 block w-full bg-white border border-gray-200 rounded px-3 py-2"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">Manufacturer</span>
                <select
                  name="make"
                  value={formData.make}
                  onChange={handleInputChange}
                  required
                  className="text-gray-700 mt-2 block w-full bg-white border border-gray-200 rounded px-3 py-2"
                >
                  <option value="">Select Manufacturer</option>
                  {makes.map((make) => (
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
                  value={formData.model}
                  onChange={handleInputChange}
                  required
                  className="text-gray-700 mt-2 block w-full bg-white border border-gray-200 rounded px-3 py-2"
                >
                  <option value="">Select Model</option>
                  {models.map((model) => (
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
                    value={formData.extraInfo}
                    onChange={handleInputChange}
                    placeholder="Modifications, history, or anything else you'd like to share about your vehicle"
                    rows="4"
                    className="text-gray-700 text-sm mt-2 block w-full bg-white border border-gray-200 rounded px-4 py-4"
                />
              </label>
            </div>
          </div>

          {imagePreview && (
            <div className="card">
              <div className="p-4">
                <p className="muted text-sm mb-2">Preview:</p>

                <div className="p-4">
                    <p className="muted">{formData.year} • {formData.make}</p>
                    <h2 className="text-lg font-semibold">{formData.model}</h2>
                </div>
                
                <img src={imagePreview} alt="preview" className="w-full max-w-md rounded" />

                <div className="p-4">
                    <p className="muted text-sm">{formData.extraInfo}</p>
                </div>
              </div>
            </div>
          )}

          <div className="max-w-3xl mx-auto">
            <button type="submit" className="btn-accent w-full">
              Submit
            </button>
          </div>

        </form>
      </div>
    )
};