import React, { useState, useEffect } from "react";
import Navbar from "../component/Navbar";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const StudentApplyForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    department: "",
    session: "",
    cgpa: "",
    semester: "",
    hall: "",
    reason: "",
    email: "", // added email field
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load draft from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("studentApplication");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    const updatedData = { ...formData, [e.target.name]: e.target.value };
    setFormData(updatedData);
    localStorage.setItem("studentApplication", JSON.stringify(updatedData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save to Firestore
      await addDoc(collection(db, "applications"), {
        ...formData,
        timestamp: new Date(),
      });

      // Save to localStorage list for admin preview
      const existingApplications =
        JSON.parse(localStorage.getItem("submittedApplications")) || [];

      const newApplication = {
        ...formData,
        id: Date.now(), // Unique ID
      };

      localStorage.setItem(
        "submittedApplications",
        JSON.stringify([...existingApplications, newApplication])
      );

      // Reset form
      setIsSubmitted(true);
      setFormData({
        fullName: "",
        studentId: "",
        department: "",
        session: "",
        cgpa: "",
        semester: "",
        hall: "",
         email: "",
        reason: ""
        // reset email field
      });

      localStorage.removeItem("studentApplication"); // remove only the draft

      setLoading(false);
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("🔥 Submission error:", error);
      alert("❌ Submission failed: " + (error.message || "Unknown error"));
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
          Apply for Hostel Seat
        </h2>

        {isSubmitted ? (
          <div className="bg-green-100 text-green-700 p-4 rounded text-center">
            Application submitted successfully! 🎉
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
            />
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              placeholder="Student ID"
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
            />
            <input
              type="text"
              name="department"
              value={formData.department}
              placeholder="Department"
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
            />
            <input
              type="text"
              name="session"
              value={formData.session}
              placeholder="Session"
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
            />
            <input
              type="number"
              step="0.01"
              name="cgpa"
              value={formData.cgpa}
              placeholder="CGPA"
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
            />

            <select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
            >
              <option value="">Select Semester</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
            </select>

            <select
              name="hall"
              value={formData.hall}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
            >
              <option value="">Preferred Hall</option>
              <option value="Shaheed Hall">Shaheed Hall</option>
              <option value="Bangabandhu Hall">Bangabandhu Hall</option>
            </select>

            <textarea
              name="reason"
              placeholder="Reason for Application (optional)"
              value={formData.reason}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            ></textarea>

            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Email Address"
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded"
            />

            <button
              type="submit"
              className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default StudentApplyForm;
