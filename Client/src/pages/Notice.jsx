// src/pages/Notice.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const querySnapshot = await getDocs(collection(db, "notices"));
        const noticeList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotices(noticeList.sort((a, b) => b.timestamp - a.timestamp));
      }
      setLoading(false);
    });

    return () => unsubscribe(); // cleanup on unmount
  }, []);

  if (loading) {
    return <p className="text-gray-500 p-6">Loading notices...</p>;
  }

  if (!user) {
    return <p className="text-red-500 p-6">You must be logged in to view notices.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-800">Notice Board</h1>
      <div className="mt-4">
        {notices.length > 0 ? (
          notices.map((notice) => (
            <div key={notice.id} className="border p-4 mb-4 shadow-md">
              <h3 className="text-xl font-semibold">{notice.title}</h3>
              <p className="text-gray-600 mt-2">{notice.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No notices available.</p>
        )}
      </div>
    </div>
  );
};

export default Notice;
