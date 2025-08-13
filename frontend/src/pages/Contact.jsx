import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
  FiMessageSquare,
  FiHeadphones,
} from "react-icons/fi";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
      setLoading(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: FiMail,
      title: "Email Us",
      details: "support@wassalsystems.com",
      description: "Send us an email anytime",
      action: "mailto:support@wassalsystems.com",
    },
    {
      icon: FiPhone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 6pm",
      action: "tel:+15551234567",
    },
    {
      icon: FiMapPin,
      title: "Visit Us",
      details: "San Francisco, CA",
      description: "123 Business District",
      action: "#",
    },
    {
      icon: FiClock,
      title: "Business Hours",
      details: "24/7 Support",
      description: "Always here to help",
      action: "#",
    },
  ];

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-display-1 text-slate-800 mb-4">Get in Touch</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Have questions about our platform? Need technical support? We're here
          to help you succeed.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="card p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FiMessageSquare className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-heading-2 text-slate-800">
                  Send us a message
                </h2>
                <p className="text-slate-600">We'll respond within 24 hours</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  rows="6"
                  className="input-field resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <>
                    <FiSend className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <FiHeadphones className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-heading-3 text-slate-800">
                  Contact Information
                </h3>
                <p className="text-slate-600 text-sm">
                  Reach out through any channel
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <a
                    key={index}
                    href={info.action}
                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-slate-50 transition-colors duration-200 group"
                  >
                    <div className="w-10 h-10 bg-slate-100 group-hover:bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                      <IconComponent className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors duration-200" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-slate-800 mb-1">
                        {info.title}
                      </h4>
                      <p className="text-slate-900 font-medium mb-1">
                        {info.details}
                      </p>
                      <p className="text-sm text-slate-600">
                        {info.description}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Support */}
          <div className="card p-6 bg-gradient-to-br from-blue-50 to-slate-50">
            <h3 className="text-heading-3 text-slate-800 mb-3">
              Need Immediate Help?
            </h3>
            <p className="text-slate-600 text-sm mb-4 leading-relaxed">
              For urgent technical issues or billing questions, our support team
              is available 24/7 through our priority channels.
            </p>
            <div className="space-y-2">
              <a
                href="#"
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Live Chat Support
              </a>
              <a
                href="#"
                className="block w-full text-center border border-slate-300 hover:border-slate-400 text-slate-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Knowledge Base
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
