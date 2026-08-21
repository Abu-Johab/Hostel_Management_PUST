import React from "react";

const Contact = () => {
  return (
    <section className="bg-gray-100 py-10 px-4 text-center">
      <h2 className="text-2xl font-bold mb-2">Have questions or doubts?</h2>
      <p className="mb-6">Don't hesitate to contact us</p>
      <div className="max-w-md mx-auto space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Enter your Question..."
          className="w-full px-4 py-2 border rounded-md"
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Send
        </button>
      </div>
    </section>
  );
};

export default Contact;
