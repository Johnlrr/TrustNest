import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Updated import
import { User, Lock, Shield, Upload, AlertCircle } from "lucide-react";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    ssn: "",
    dateOfBirth: "",
    phone: "",
    address: "",
    salary: "",
    occupation: "",
    healthHistory: "",
    currentMedications: "",
    familyHistory: "",
    lifestyle: "sedentary",
  });
  const navigate = useNavigate(); // Updated line

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate blockchain encryption and API call
    console.log("Form submitted:", formData);
    alert("Success! Redirecting to dashboard...");
    navigate("/dashboard"); // Updated line
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">TrustNest</h1>
          <p className="text-gray-600 mt-2">Your Trusted Insurance Navigator</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-center mb-6">
            <button
              className={`px-4 py-2 ${
                isLogin
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`px-4 py-2 ${
                !isLogin
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 border rounded-lg"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full p-2 border rounded-lg"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            {!isLogin && (
              <>
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-semibold text-gray-700 mb-4">
                    Personal Information
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      className="w-full p-2 border rounded-lg"
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="ssn"
                      placeholder="Social Security Number"
                      className="w-full p-2 border rounded-lg"
                      value={formData.ssn}
                      onChange={handleInputChange}
                    />
                    <input
                      type="date"
                      name="dateOfBirth"
                      className="w-full p-2 border rounded-lg"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      className="w-full p-2 border rounded-lg"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      className="w-full p-2 border rounded-lg"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold text-gray-700 mb-4">
                    Financial & Health Information
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="number"
                      name="salary"
                      placeholder="Monthly Salary (VND)"
                      className="w-full p-2 border rounded-lg"
                      value={formData.salary}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="occupation"
                      placeholder="Occupation"
                      className="w-full p-2 border rounded-lg"
                      value={formData.occupation}
                      onChange={handleInputChange}
                    />
                    <textarea
                      name="healthHistory"
                      placeholder="Health History"
                      className="w-full p-2 border rounded-lg"
                      value={formData.healthHistory}
                      onChange={handleInputChange}
                      rows="3"
                    />
                    <textarea
                      name="currentMedications"
                      placeholder="Current Medications"
                      className="w-full p-2 border rounded-lg"
                      value={formData.currentMedications}
                      onChange={handleInputChange}
                      rows="2"
                    />
                    <textarea
                      name="familyHistory"
                      placeholder="Family Medical History"
                      className="w-full p-2 border rounded-lg"
                      value={formData.familyHistory}
                      onChange={handleInputChange}
                      rows="2"
                    />
                    <select
                      name="lifestyle"
                      className="w-full p-2 border rounded-lg"
                      value={formData.lifestyle}
                      onChange={handleInputChange}
                    >
                      <option value="sedentary">Sedentary</option>
                      <option value="moderate">Moderately Active</option>
                      <option value="active">Very Active</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              {isLogin ? "Login" : "Create Account"}
            </button>
          </form>

          <div className="mt-4 flex items-start space-x-2 bg-blue-50 p-3 rounded-lg">
            <Shield className="h-5 w-5 text-blue-500 flex-shrink-0" />
            <p className="text-sm text-blue-800">
              Your information is secured using blockchain technology. We never
              share your personal data without your consent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
