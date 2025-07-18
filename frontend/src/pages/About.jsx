import React from "react";

const About = () => {
  return (
    <div className="bg-white text-black min-h-screen px-6 py-12">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          We are building the future of SaaS — one tenant at a time.
        </p>
      </div>

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 mb-24">
        <img
          src="https://media.istockphoto.com/id/1331350008/photo/business-team-working-on-a-laptop-computer.webp?a=1&b=1&s=612x612&w=0&k=20&c=V37YdFdPnmp0FXV26bqlXzcSMruQPH_xl5P7WDVl-A0="
          alt="Our Mission"
          className="w-full md:w-1/2 rounded-xl shadow-lg"
        />
        <div className="md:w-1/2">
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg">
            Our goal is to make managing and scaling ERP solutions effortless.
            Whether you're an enterprise or a startup, our SaaS portal provides
            powerful tools to manage multi-tenant ERP systems with ease, speed,
            and security.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto text-center mb-20">
        <h2 className="text-3xl font-semibold mb-6">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-8">
          {[
            {
              name: "Ammar Alakeel",
              role: "Founder",
              img: "https://randomuser.me/api/portraits/men/32.jpg",
            },
            {
              name: "Jayesh Patil",
              role: "SaaS Architect",
              img: "https://randomuser.me/api/portraits/men/45.jpg",
            },
            {
              name: "Lokesh Patil",
              role: "Flutter Developer",
              img: "https://randomuser.me/api/portraits/men/44.jpg",
            },
          ].map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-gray-100 p-6 rounded-xl shadow-md"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-medium">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 py-12 px-6 rounded-2xl max-w-6xl mx-auto text-center shadow-md">
        <h2 className="text-3xl font-semibold mb-4">
          Ready to scale your business?
        </h2>
        <p className="text-gray-700 mb-6 text-lg max-w-2xl mx-auto">
          Join hundreds of companies using our SaaS portal to manage their
          ERPNext instances smartly.
        </p>
        <a
          href="/"
          className="inline-block bg-black text-white px-6 py-3 rounded-full text-lg hover:bg-gray-900 transition"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default About;
