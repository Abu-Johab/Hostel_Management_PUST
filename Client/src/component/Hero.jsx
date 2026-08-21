import React, { useState } from "react";
import buildingImage from "../assets/pust_photo.jpg";

// 21 Departments and Example Rooms
const departments = [
  { name: "CSE", rooms: ["101", "102", "103", "104", "105"] },
  { name: "EEE", rooms: ["201", "202", "203", "204", "205"] },
  { name: "ICE", rooms: ["301", "302", "303", "304", "305"] },
  { name: "EECE", rooms: ["401", "402", "403", "404", "405"] },
  { name: "Civil", rooms: ["501", "502", "503", "504", "505"] },
  { name: "Architecture", rooms: ["601", "602", "603", "604", "605"] },
  { name: "URP", rooms: ["701", "702", "703", "704", "705"] },
  { name: "BBA", rooms: ["801", "802", "803", "804", "805"] },
  { name: "Pharmacy", rooms: ["901", "902", "903", "904", "905"] },
  { name: "THM", rooms: ["1001", "1002", "1003", "1004", "1005"] },
  { name: "Statistics", rooms: ["1101", "1102", "1103", "1104", "1105"] },
  { name: "Economics", rooms: ["1201", "1202", "1203", "1204", "1205"] },
  { name: "Bangla", rooms: ["1301", "1302", "1303", "1304", "1305"] },
  { name: "History", rooms: ["1401", "1402", "1403", "1404", "1405"] },
  { name: "Public Admin", rooms: ["1501", "1502", "1503", "1504", "1505"] },
  { name: "Social Work", rooms: ["1601", "1602", "1603", "1604", "1605"] },
  { name: "English", rooms: ["1701", "1702", "1703", "1704", "1705"] },
  { name: "Physics", rooms: ["1801", "1802", "1803", "1804", "1805"] },
  { name: "Chemistry", rooms: ["1901", "1902", "1903", "1904", "1905"] },
  { name: "Mathematics", rooms: ["2001", "2002", "2003", "2004", "2005"] },
  { name: "Botany", rooms: ["2101", "2102", "2103", "2104", "2105"] }
];

const Hero = () => {
  const [selectedDept, setSelectedDept] = useState(""); // Department state
  const [filteredRooms, setFilteredRooms] = useState([]); // Rooms list state

  const handleDeptChange = (event) => {
    setSelectedDept(event.target.value); // Set selected department
  };

  const handleSearch = () => {
    const dept = departments.find(dept => dept.name === selectedDept);
    if (dept) {
      setFilteredRooms(dept.rooms); // Set the rooms of the selected department
    } else {
      setFilteredRooms([]); // No rooms found if department is not selected
    }
  };

  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 py-10 bg-white">
      <div className="md:w-1/2 space-y-6">
        <h1 className="text-4xl font-bold">Find And Apply For Your Accommodation</h1>
        <p className="text-lg">Want to find an accommodation? We are ready to help you find one.</p>
        <div className="flex gap-6 text-center text-sm md:text-base">
          <div><strong className="text-xl">100+</strong> <p>Rooms</p></div>
          <div><strong className="text-xl">20+</strong> <p>Reservations/Semester</p></div>
          <div><strong className="text-xl">400+</strong> <p>Students</p></div>
        </div>

        {/* Department Dropdown and Search Button */}
        <div className="flex items-center gap-2">
          <label htmlFor="department" className="mr-2">Department</label>
          <select
            id="department"
            value={selectedDept}
            onChange={handleDeptChange}
            className="border rounded px-4 py-2"
          >
            <option value="">Select Department</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {/* Display rooms for selected department */}
        <div className="mt-6">
          {filteredRooms.length > 0 ? (
            <div>
              <h3 className="text-xl font-semibold">Rooms for {selectedDept}</h3>
              <ul className="list-disc pl-6 mt-4">
                {filteredRooms.map((room, index) => (
                  <li key={index} className="py-1">Room {room}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No rooms found for the selected department.</p>
          )}
        </div>
      </div>

      {/* Image Section */}
      <div className="md:w-1/2 mt-6 md:mt-0">
        <img
          src={buildingImage}
          alt="Hostel"
          className="rounded-lg shadow-lg w-full"
        />
      </div>
    </section>
  );
};

export default Hero;
