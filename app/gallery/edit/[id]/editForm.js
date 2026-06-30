'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditForm({ vehicle }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        extraInfo: vehicle.extraInfo,
        imageName: vehicle.imageName
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/vehicles/${vehicle._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            router.push('/gallery');
            router.refresh();

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="space-y-8 py-10">
            <h1 className="text-4xl text-gray-700 font-bold text-center">Edit Vehicle</h1>

            <form onSubmit={handleSubmit} className="grid gap-6 max-w-3xl mx-auto">
                <div className="card">
                    <div className="p-4 grid gap-4">
                        <label className="block">
                            <span className="text-sm font-medium">Year</span>
                            <input 
                                type="number" 
                                name="year"
                                placeholder="Select Year"
                                value={formData.year}
                                onChange={(e) => setFormData({...formData, year: e.target.value})}
                                required 
                                className="text-gray-700 mt-2 block w-full bg-white border border-gray-200 rounded px-3 py-2"/>
                        </label>

                        <label className="block">
                            <span className="text-sm font-medium">Manufacturer</span>
                            <input 
                                type="text" 
                                name="make"
                                placeholder="Manufacturer"
                                value={formData.make}
                                onChange={(e) => setFormData({...formData, make: e.target.value})}
                                required 
                                className="text-gray-700 mt-2 block w-full bg-white border border-gray-200 rounded px-3 py-2"/>
                        </label>

                        <label className="block">
                            <span className="text-sm font-medium">Model</span>
                            <input 
                                type="text" 
                                name="model"
                                placeholder="Model"
                                value={formData.model}
                                onChange={(e) => setFormData({...formData, model: e.target.value})}
                                required 
                                className="text-gray-700 mt-2 block w-full bg-white border border-gray-200 rounded px-3 py-2"/>
                        </label>

                        <label className="block">
                            <span className="text-sm font-medium">Image Name</span>
                            <input 
                                type="text" 
                                name="imageName"
                                placeholder="Image Name"
                                value={formData.imageName}
                                onChange={(e) => setFormData({...formData, imageName: e.target.value})}
                                className="text-gray-700 mt-2 block w-full bg-white border border-gray-200 rounded px-3 py-2"/>
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
                                onChange={(e) => setFormData({...formData, extraInfo: e.target.value})}
                                placeholder="Modifications, history, or anything else you'd like to share about your vehicle"
                                rows="4"
                                className="text-gray-700 text-sm mt-2 block w-full bg-white border border-gray-200 rounded px-4 py-4"/>
                        </label>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto flex gap-4">
                    <button 
                        type="submit" 
                        className="btn-accent w-full py-2">
                        Save
                    </button>
                    <button 
                        type="button"
                        onClick={() => router.push('/gallery')}
                        className="w-full px-4 py-2 bg-white text-gray-700 border-2 border-gray-300 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}