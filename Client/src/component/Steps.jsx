import React from "react";

const Steps = () => {
  const steps = ["Apply Online", "Submit the hardcopy", "Payment", "Get your key!"];
  
  return (
    <section className="bg-gray-50 py-10 px-4">
      <h2 className="text-2xl font-bold text-center mb-8">How To Get A Seat In The Hostel?</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="bg-white p-6 rounded shadow-md text-center">
            <h3 className="text-3xl font-bold mb-2">{index + 1}</h3>
            <h4 className="text-xl font-semibold mb-2">{step}</h4>
            <p className="text-gray-600">Short description about {step.toLowerCase()}.</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Steps;
