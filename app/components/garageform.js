export default function GarageForm() {

    return (
        <div className="card">
            <div className="p-4 grid gap-4">

                <label className="block">
                <span className="text-sm font-medium">Manufacturer</span>
                <select
                    name="make"
                    required
                    className="text-gray-700 mt-2 block w-full bg-white border border-gray-200 rounded px-3 py-2">
                    <option value="">Select Option</option>
                        <option>
                            Vehicle
                        </option>
                        <option>
                            Rims
                        </option>
                        <option>
                            Other
                        </option>
                </select>
                </label>

                <div className="max-w-3xl mx-auto">
                    <button type="submit" className="btn-accent w-full">
                    Submit
                    </button>
                </div>

            </div>
        </div>
    )
};