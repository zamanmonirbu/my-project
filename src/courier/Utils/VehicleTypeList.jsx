import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createVehicleType,
  getAllVehicleTypes,
  updateVehicleType,
  deleteVehicleType,
} from "../../actions/vehicleTypeActions";

const VehicleTypeList = () => {
  const dispatch = useDispatch();
  const { vehicleTypes, loading, error } = useSelector(
    (state) => state.vehicleType
  );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null); // Store the ID of the vehicle type being edited

  useEffect(() => {
    dispatch(getAllVehicleTypes());
  }, [dispatch]);

  // Handle form submission (Create or Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    const newVehicleType = { name, description };

    if (editId) {
      // If there's an editId, we are updating an existing vehicle type
      dispatch(updateVehicleType(editId, newVehicleType));
    } else {
      // Otherwise, we are creating a new vehicle type
      dispatch(createVehicleType(newVehicleType));
    }

    // Clear the input fields
    setName("");
    setDescription("");
    setEditId(null); // Reset the editId
  };

  // Handle editing a vehicle type
  const handleEdit = (vehicle) => {
    setName(vehicle.name);
    setDescription(vehicle.description);
    setEditId(vehicle._id); // Set the ID of the vehicle being edited
  };

  // Handle deleting a vehicle type
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle type?")) {
      dispatch(deleteVehicleType(id));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Vehicle Types
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium"
            >
              Description:
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 rounded-md text-white font-medium ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : editId
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading
              ? "Processing..."
              : editId
              ? "Update Vehicle Type"
              : "Create Vehicle Type"}
          </button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {/* <ul className="mt-6 space-y-4">
          {vehicleTypes?.map((vehicle) => (
            <li
              key={vehicle._id}
              className="flex items-center justify-between p-4 border rounded-md shadow-sm bg-gray-50"
            >
              <div>
                <p className="font-semibold text-gray-800">{vehicle.name}</p>
                <p className="text-gray-600 text-sm">{vehicle.description}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(vehicle)}
                  className="px-3 py-1 text-sm font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(vehicle._id)}
                  className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default VehicleTypeList;