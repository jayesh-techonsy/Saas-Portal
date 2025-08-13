import React from "react";
import { Link } from "react-router-dom";
import {
  FiTarget,
  FiUsers,
  FiAward,
  FiTrendingUp,
  FiShield,
  FiZap,
  FiGlobe,
  FiArrowRight,
} from "react-icons/fi";

const About = () => {
  const teamMembers = [
    {
      name: "Ammar Alakeel",
      role: "Founder & CEO",
      description: "Visionary leader driving innovation in SaaS solutions",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Jayesh Patil",
      role: "SaaS Architect",
      description: "Expert in scalable architecture and system design",
      img: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Lokesh Patil",
      role: "Flutter Developer",
      description: "Mobile application specialist and UI/UX expert",
      img: "https://randomuser.me/api/portraits/men/44.jpg",
    },
  ];

  const values = [
    {
      icon: FiShield,
      title: "Security First",
      description:
        "Enterprise-grade security with end-to-end encryption and compliance standards.",
    },
    {
      icon: FiZap,
      title: "Performance",
      description:
        "Lightning-fast response times and 99.9% uptime guarantee for your business.",
    },
    {
      icon: FiGlobe,
      title: "Global Scale",
      description:
        "Multi-region deployment with worldwide CDN for optimal performance.",
    },
    {
      icon: FiUsers,
      title: "Customer Focus",
      description:
        "24/7 support and dedicated success managers for enterprise clients.",
    },
  ];

  const stats = [
    { number: "500+", label: "Active Tenants" },
    { number: "99.9%", label: "Uptime" },
    { number: "24/7", label: "Support" },
    { number: "50+", label: "Countries" },
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-display-1 text-slate-800 mb-6">
          About Wassal Systems
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          We're building the future of enterprise SaaS solutions, empowering
          businesses with scalable, secure, and intelligent multi-tenant
          platforms.
        </p>
      </div>

      {/* Stats Section */}
      <div className="card p-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-slate-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
            <FiTarget className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-heading-1 text-slate-800 mb-6">Our Mission</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            To democratize enterprise-grade technology by providing scalable,
            secure, and intelligent SaaS solutions that empower businesses of
            all sizes to achieve their full potential.
          </p>
          <p className="text-slate-600 leading-relaxed">
            We believe that every organization deserves access to world-class
            infrastructure and tools, regardless of their size or technical
            expertise. Our platform bridges the gap between complex enterprise
            systems and user-friendly interfaces.
          </p>
        </div>
        <div className="relative">
          <div className="aspect-square bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <FiTrendingUp className="w-8 h-8 text-green-500 mb-2" />
                <div className="text-sm font-medium text-slate-700">Growth</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <FiShield className="w-8 h-8 text-blue-500 mb-2" />
                <div className="text-sm font-medium text-slate-700">
                  Security
                </div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <FiZap className="w-8 h-8 text-yellow-500 mb-2" />
                <div className="text-sm font-medium text-slate-700">Speed</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <FiGlobe className="w-8 h-8 text-purple-500 mb-2" />
                <div className="text-sm font-medium text-slate-700">Global</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div>
        <div className="text-center mb-12">
          <h2 className="text-heading-1 text-slate-800 mb-4">Our Values</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            The principles that guide everything we do and every decision we
            make.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <div key={index} className="card p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-heading-3 text-slate-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Team Section */}
      <div>
        <div className="text-center mb-12">
          <h2 className="text-heading-1 text-slate-800 mb-4">Meet Our Team</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            The talented individuals behind Wassal Systems, dedicated to
            delivering exceptional SaaS solutions.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="card p-6 text-center">
              <div className="w-24 h-24 mx-auto mb-4 relative">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full rounded-full object-cover"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <h3 className="text-heading-3 text-slate-800 mb-1">
                {member.name}
              </h3>
              <p className="text-blue-600 font-medium mb-3">{member.role}</p>
              <p className="text-slate-600 text-sm leading-relaxed">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="card bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 lg:p-12 text-center">
        <h2 className="text-heading-1 mb-4">
          Ready to Transform Your Business?
        </h2>
        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
          Join hundreds of companies already using Wassal Systems to scale their
          operations with confidence and efficiency.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2"
          >
            Get Started Today
            <FiArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/contact"
            className="border border-blue-300 text-white hover:bg-blue-600 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
