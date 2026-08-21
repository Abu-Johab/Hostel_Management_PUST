import React, { useState } from "react";

const Rooms = () => {
  const [userRole] = useState("student"); // Set fixed to 'student'
  const [selectedDept, setSelectedDept] = useState("CSE");
  const [departmentsState] = useState(generateDepartments());

  function generateDepartments() {
    const departments = [];
    const deptNames = [
      "CSE", "EEE", "ICE", "EECE", "BBA", "Pharmacy", "Architecture", "URP", "Statistics", "Economics",
      "Bangla", "History", "Public Admin", "Social Work", "English", "Physics", "Chemistry", "Mathematics", "Botany"
    ];

    const roomNumbers = {
      CSE: [213, 215, 222],
      EEE: [301, 302],
      ICE: [401],
      EECE: [501],
    };

    const bedStatuses = ["vacant", "waiting", "booked"];

    deptNames.forEach((deptName) => {
      const rooms = [];
      const deptRoomNumbers = roomNumbers[deptName] || [];

      deptRoomNumbers.forEach((roomNumber) => {
        const room = {
          roomNumber,
          departments: [deptName],
          beds: [],
          status: "vacant",
        };

        for (let i = 1; i <= 4; i++) {
          const randomStatus = bedStatuses[Math.floor(Math.random() * bedStatuses.length)];
          room.beds.push({
            bedId: `${roomNumber}.${String.fromCharCode(96 + i)}`,
            status: randomStatus,
          });
        }

        // Determine overall room status
        const statuses = room.beds.map((b) => b.status);
        if (statuses.includes("booked")) {
          room.status = "booked";
        } else if (statuses.includes("waiting")) {
          room.status = "waiting";
        } else {
          room.status = "vacant";
        }

        rooms.push(room);
      });

      departments.push({ name: deptName, rooms });
    });

    return departments;
  }

  const handleDeptChange = (event) => {
    setSelectedDept(event.target.value);
  };

  const getRoomColor = (status) => {
    if (status === "vacant") return "bg-green-500";
    if (status === "waiting") return "bg-yellow-500";
    if (status === "booked") return "bg-red-500";
    return "";
  };

  const department = departmentsState.find((dept) => dept.name === selectedDept);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-800">Rooms Overview</h1>

      {/* Department Selector */}
      <select
        value={selectedDept}
        onChange={handleDeptChange}
        className="mt-4 p-2 border border-gray-300 rounded"
      >
        {departmentsState.map((dept, index) => (
          <option key={index} value={dept.name}>
            {dept.name}
          </option>
        ))}
      </select>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">{selectedDept} Department</h2>

        <div className="mt-4">
          {department &&
            department.rooms.map((room) => (
              <div key={room.roomNumber} className="border-t border-b mt-4 pt-4 pb-4">
                <h3 className="text-lg font-semibold flex items-center">
                  Room {room.roomNumber}
                  
                </h3>

                <table className="min-w-full mt-4">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Bed ID</th>
                      <th className="px-4 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {room.beds.map((bed) => (
                      <tr key={bed.bedId}>
                        <td className="px-4 py-2">{bed.bedId}</td>
                        <td className={`px-4 py-2 text-white ${getRoomColor(bed.status)}`}>
                          {bed.status}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
