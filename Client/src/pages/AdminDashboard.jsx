import React, { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import emailjs from "emailjs-com";

const AdminDashboard = () => {
  const [userRole, setUserRole] = useState("admin");
  const [departmentsState, setDepartmentsState] = useState([]);
  const [selectedDept, setSelectedDept] = useState("CSE");
  const [successMessage, setSuccessMessage] = useState("");
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeDesc, setNoticeDesc] = useState("");
  const [applications, setApplications] = useState([]);

  const auth = getAuth();
  const user = auth?.currentUser;

  useEffect(() => {
    const stored = localStorage.getItem("departmentsState");
    if (stored) {
      setDepartmentsState(JSON.parse(stored));
    } else {
      const defaultDepartments = generateDepartments();
      setDepartmentsState(defaultDepartments);
      localStorage.setItem("departmentsState", JSON.stringify(defaultDepartments));
    }
  }, []);

  useEffect(() => {
    const savedApplications = localStorage.getItem("submittedApplications");
    if (savedApplications) {
      setApplications(JSON.parse(savedApplications));
    }
  }, []);

  useEffect(() => {
    if (departmentsState.length > 0) {
      localStorage.setItem("departmentsState", JSON.stringify(departmentsState));
    }
  }, [departmentsState]);

  const generateDepartments = () => {
    const departments = [];
    const deptNames = [
      "CSE", "EEE", "ICE", "EECE", "BBA", "Pharmacy", "Architecture", "URP", "Statistics", "Economics",
      "Bangla", "History", "Public Admin", "Social Work", "English", "Physics", "Chemistry", "Mathematics", "Botany"
    ];

    const roomNumbers = {
      CSE: [213, 215, 222, 223, 234],
      EEE: [301, 302, 303, 304, 305],
      ICE: [401, 402, 403, 404, 405],
      EECE: [501, 502, 503, 504, 505],
    };

    deptNames.forEach((deptName) => {
      const rooms = [];
      const deptRoomNumbers = roomNumbers[deptName] || [];

      deptRoomNumbers.forEach((roomNumber) => {
        const room = {
          roomNumber,
          status: "vacant",
          departments: [deptName],
          beds: [],
        };

        for (let i = 1; i <= 4; i++) {
          const randomStatus = ["vacant", "booked", "waiting"][Math.floor(Math.random() * 3)];
          room.beds.push({
            bedId: `${roomNumber}.${String.fromCharCode(96 + i)}`,
            status: randomStatus,
          });
        }

        rooms.push(room);
      });

      departments.push({ name: deptName, rooms });
    });

    return departments;
  };

  const handleDeptChange = (e) => setSelectedDept(e.target.value);

  const handleBedStatusChange = async (roomIndex, bedIndex, newStatus) => {
    const updatedDepartments = [...departmentsState];
    const dept = updatedDepartments.find((d) => d.name === selectedDept);
    if (dept && dept.rooms[roomIndex]) {
      dept.rooms[roomIndex].beds[bedIndex].status = newStatus;
    }
    setDepartmentsState(updatedDepartments);

    const roomRef = doc(db, "departments", selectedDept);
    const bedRef = roomRef.collection("rooms").doc(dept.rooms[roomIndex].roomNumber);
    const bedDocRef = bedRef.collection("beds").doc(dept.rooms[roomIndex].beds[bedIndex].bedId);

    await updateDoc(bedDocRef, { status: newStatus });
  };

  const getRoomColor = (status) => {
    if (status === "vacant") return "bg-green-500";
    if (status === "waiting") return "bg-yellow-500";
    if (status === "booked") return "bg-red-500";
    return "";
  };

  const handleAddNotice = async () => {
    if (!noticeTitle || !noticeDesc) return alert("Please fill both fields.");

    try {
      await addDoc(collection(db, "notices"), {
        title: noticeTitle,
        description: noticeDesc,
        timestamp: new Date(),
      });
      setSuccessMessage("✅ Notice added successfully!");
      setNoticeTitle("");
      setNoticeDesc("");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error("Error adding notice:", err);
      alert("❌ Failed to add notice");
    }
  };

  const handleApproveApplication = (applicationId) => {
    const updatedApplications = applications.filter((app) => app.id !== applicationId);
    const approvedApp = applications.find((app) => app.id === applicationId);

    if (approvedApp) {
      const templateParams = {
        to_name: approvedApp.fullName,
        student_id: approvedApp.studentId,
        department: approvedApp.department,
        to_email: approvedApp.email, // Send email to the email address from the application
        message: `Application of ${approvedApp.fullName} (ID: ${approvedApp.studentId}) has been approved for ${approvedApp.department}.`,
      };

      emailjs
        .send(
          "service_7b76nxs",        // EmailJS Service ID
          "template_w8bqfdu",       // Template ID
          templateParams,
          "MtcgxA9xq1KiCqtqI"       // Public/User Key
        )
        .then(
          (response) => {
            console.log("Email sent successfully", response.status, response.text);
          },
          (error) => {
            console.error("Failed to send email", error);
          }
        );
    }

    setApplications(updatedApplications);
    localStorage.setItem("submittedApplications", JSON.stringify(updatedApplications));
    setSuccessMessage("Application approved and email sent!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const department = departmentsState.find((dept) => dept.name === selectedDept);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-800">Admin Dashboard</h1>

      {/* Department Dropdown */}
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

      {/* Room Management */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">{selectedDept} Department</h2>
        {department &&
          department.rooms.map((room, roomIndex) => (
            <div key={room.roomNumber} className="border-t border-b mt-4 pt-4 pb-4">
              <h3 className="text-lg font-semibold">Room {room.roomNumber}</h3>
              <table className="min-w-full mt-4">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Bed ID</th>
                    <th className="px-4 py-2">Status</th>
                    {userRole === "admin" && <th className="px-4 py-2">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {room.beds.map((bed, bedIndex) => (
                    <tr key={bed.bedId}>
                      <td className="px-4 py-2">{bed.bedId}</td>
                      <td className={`px-4 py-2 ${getRoomColor(bed.status)} text-white`}>
                        {bed.status}
                      </td>
                      {userRole === "admin" && (
                        <td className="px-4 py-2">
                          <button
                            onClick={() => handleBedStatusChange(roomIndex, bedIndex, "vacant")}
                            className="bg-green-500 text-white py-1 px-2 rounded mr-2"
                          >
                            Vacant
                          </button>
                          <button
                            onClick={() => handleBedStatusChange(roomIndex, bedIndex, "waiting")}
                            className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                          >
                            Waiting
                          </button>
                          <button
                            onClick={() => handleBedStatusChange(roomIndex, bedIndex, "booked")}
                            className="bg-red-500 text-white py-1 px-2 rounded"
                          >
                            Booked
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
      </div>

      {/* Notice Management */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Notice Management</h2>
        <input
          type="text"
          value={noticeTitle}
          onChange={(e) => setNoticeTitle(e.target.value)}
          placeholder="Notice Title"
          className="block w-full border p-2 my-2"
        />
        <textarea
          value={noticeDesc}
          onChange={(e) => setNoticeDesc(e.target.value)}
          placeholder="Notice Description"
          className="block w-full border p-2 my-2"
        />
        <button onClick={handleAddNotice} className="bg-green-500 text-white py-1 px-3 rounded">
          Add New Notice
        </button>
        {successMessage && (
          <div className="bg-green-100 text-green-800 px-4 py-2 my-2 rounded">{successMessage}</div>
        )}
      </div>

      {/* Application Management */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Application Management</h2>
        <table className="min-w-full mt-4 border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Student Name</th>
              <th className="px-4 py-2 border">Student ID</th>
              <th className="px-4 py-2 border">Department</th>
              <th className="px-4 py-2 border">Session</th>
              <th className="px-4 py-2 border">CGPA</th>
              <th className="px-4 py-2 border">Semester</th>
              <th className="px-4 py-2 border">Hall</th>
              <th className="px-4 py-2 border">Reason</th>
              <th className="px-4 py-2 border">Email</th> {/* New column added */}
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.length > 0 ? (
              applications.map((app) => (
                <tr key={app.id}>
                  <td className="px-4 py-2 border">{app.fullName}</td>
                  <td className="px-4 py-2 border">{app.studentId}</td>
                  <td className="px-4 py-2 border">{app.department}</td>
                  <td className="px-4 py-2 border">{app.session}</td>
                  <td className="px-4 py-2 border">{app.cgpa}</td>
                  <td className="px-4 py-2 border">{app.semester}</td>
                  <td className="px-4 py-2 border">{app.hall}</td>
                  <td className="px-4 py-2 border">{app.reason || "—"}</td>
                  <td className="px-4 py-2 border">{app.email || "—"}</td> {/* Displaying email */}
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => handleApproveApplication(app.id)}
                      className="bg-blue-500 text-white py-1 px-3 rounded"
                    >
                      Approve
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="px-4 py-2 text-center">
                  No applications available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
