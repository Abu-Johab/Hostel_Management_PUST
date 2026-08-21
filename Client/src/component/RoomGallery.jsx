import React from "react";

// Import room images
import room1 from "../assets/rooms/room1.jpeg";
import room2 from "../assets/rooms/room2.jpeg";
import room3 from "../assets/rooms/room3.jpeg";
import room4 from "../assets/rooms/room4.jpeg";

const RoomGallery = () => {
  const images = [room1, room2, room3, room4];

  return (
    <section className="py-10 px-4 bg-gray-50">
      <h2 className="text-2xl font-bold text-center mb-6">Our Dormitory </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Room ${index + 1}`}
            className="rounded shadow hover:scale-105 transition-transform duration-300"
          />
        ))}
      </div>
    </section>
  );
};

export default RoomGallery;
