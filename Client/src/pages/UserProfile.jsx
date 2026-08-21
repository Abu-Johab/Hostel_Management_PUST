import React, { useState, useEffect } from "react";

const UserProfile = () => {
  const [userData, setUserData] = useState(null); // State to store the user data
  const [isEditing, setIsEditing] = useState(false); // State to track if the profile is in editing mode
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    studentId: "",
    dob: "",
    address: "",
    phone: "",
    status: "",
    profilePicture: "",
  });

  useEffect(() => {
    // Fetch user data from local storage when component mounts
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUserData(parsedData);
      setFormData(parsedData); // Initialize form data with stored user data
    } else {
      console.log("No user data found in localStorage, using default data.");
      
      // Default user data
      const defaultUserData = {
        name: "Default User",
        email: "default@example.com",
        department: "N/A",
        studentId: "0000",
        dob: "N/A",
        address: "N/A",
        phone: "N/A",
        status: "Inactive",
        profilePicture: "https://via.placeholder.com/150",
      };

      setUserData(defaultUserData);
      setFormData(defaultUserData);  // Set form data to default as well
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Save the updated user data to local storage
    localStorage.setItem("userData", JSON.stringify(formData));
    setUserData(formData); // Update state with the new user data
    setIsEditing(false); // Exit editing mode
  };

  // Show a loading message until data is fetched
  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            {/* Profile Picture */}
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500">
              <img
                src={userData.profilePicture || "https://via.placeholder.com/150"} // Show user picture or placeholder
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-4">
              <h2 className="text-3xl font-semibold text-gray-800">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="text-3xl font-semibold text-gray-800 border-b-2"
                  />
                ) : (
                  userData.name
                )}
              </h2>
              <p className="text-gray-500">User ID: {userData.userId}</p>
            </div>
          </div>

          {/* Buttons for Actions */}
          <div className="flex flex-wrap md:ml-4 gap-3">
            {isEditing ? (
              <button
                className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition"
                onClick={handleSave}
              >
                Save Profile
              </button>
            ) : (
              <button
                className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            )}
            <button className="bg-gray-300 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-400 transition">
              Log Out
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700">User Information</h3>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Email</span>
              {isEditing ? (
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="text-gray-800 border-b-2"
                />
              ) : (
                <span className="text-gray-800">{userData.email}</span>
              )}
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Department</span>
              {isEditing ? (
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="text-gray-800 border-b-2"
                />
              ) : (
                <span className="text-gray-800">{userData.department}</span>
              )}
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Student ID</span>
              {isEditing ? (
                <input
                  type="text"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  className="text-gray-800 border-b-2"
                />
              ) : (
                <span className="text-gray-800">{userData.studentId}</span>
              )}
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Date of Birth</span>
              {isEditing ? (
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="text-gray-800 border-b-2"
                />
              ) : (
                <span className="text-gray-800">{userData.dob}</span>
              )}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-700">Additional Information</h3>
          <div className="mt-4 space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Address</span>
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="text-gray-800 border-b-2"
                />
              ) : (
                <span className="text-gray-800">{userData.address}</span>
              )}
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Phone Number</span>
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="text-gray-800 border-b-2"
                />
              ) : (
                <span className="text-gray-800">{userData.phone}</span>
              )}
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status</span>
              {isEditing ? (
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="text-green-500 border-b-2"
                />
              ) : (
                <span className="text-green-500">{userData.status}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
