import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Shield, AlertCircle } from "lucide-react";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isInsurer, setIsInsurer] = useState(false);
  const [error, setError] = useState("");
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
    clientType: "normal", // Added client type
    companyName: "",
    registrationNumber: "",
    taxId: "",
    businessAddress: "",
    websiteUrl: "",
    representativeName: "",
    jobTitle: "",
    representativePhone: "",
    licenseDetails: "",
    insuranceTypes: "",
    termsAccepted: false,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setError("");
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields");
      return false;
    }
    if (!isLogin) {
      if (formData.clientType === "normal") {
        if (
          !formData.fullName ||
          !formData.ssn ||
          !formData.dateOfBirth ||
          !formData.phone ||
          !formData.address
        ) {
          setError("Please fill in all required fields");
          return false;
        }
      } else if (formData.clientType === "insurer") {
        if (
          !formData.companyName ||
          !formData.registrationNumber ||
          !formData.taxId ||
          !formData.businessAddress ||
          !formData.websiteUrl ||
          !formData.representativeName ||
          !formData.jobTitle ||
          !formData.representativePhone ||
          !formData.licenseDetails ||
          !formData.insuranceTypes ||
          !formData.termsAccepted
        ) {
          setError("Please fill in all required fields");
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isLogin) {
      // Handle Login
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u) => u.email === formData.email);

      if (!user) {
        setError("User not found. Please register first.");
        return;
      }

      if (user.password !== formData.password) {
        setError("Incorrect password");
        return;
      }

      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate(
        user.clientType === "insurer" ? "/insurer-dashboard" : "/dashboard"
      );
    } else {
      // Handle Registration
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const existingUser = users.find((u) => u.email === formData.email);

      if (existingUser) {
        setError("Email already registered");
        return;
      }

      const newUser = { ...formData };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(newUser));

      alert("Registration successful! Redirecting to dashboard...");
      navigate(
        newUser.clientType === "insurer" ? "/insurer-dashboard" : "/dashboard"
      );
    }
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
              onClick={() => {
                setIsLogin(true);
                setError("");
              }}
            >
              Login
            </button>
            <button
              className={`px-4 py-2 ${
                !isLogin
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
              onClick={() => {
                setIsLogin(false);
                setError("");
              }}
            >
              Register
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}

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
                    Client Type
                  </h3>
                  <div className="space-y-3">
                    <select
                      name="clientType"
                      className="w-full p-2 border rounded-lg"
                      value={formData.clientType}
                      onChange={(e) => {
                        handleInputChange(e);
                        setIsInsurer(e.target.value === "insurer");
                      }}
                    >
                      <option value="normal">Normal Client</option>
                      <option value="insurer">Insurer</option>
                    </select>
                  </div>
                </div>

                {formData.clientType === "normal" && (
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
                        required
                      />
                      <input
                        type="text"
                        name="ssn"
                        placeholder="Social Security Number"
                        className="w-full p-2 border rounded-lg"
                        value={formData.ssn}
                        onChange={handleInputChange}
                        required
                      />
                      <input
                        type="date"
                        name="dateOfBirth"
                        className="w-full p-2 border rounded-lg"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        required
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        className="w-full p-2 border rounded-lg"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                      <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        className="w-full p-2 border rounded-lg"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                )}

                {formData.clientType === "insurer" && (
                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-semibold text-gray-700 mb-4">
                      Business Information
                    </h3>
                    <div className="space-y-3">
                      <input
                        type="text"
                        name="companyName"
                        placeholder="Company Name"
                        className="w-full p-2 border rounded-lg"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required
                      />
                      <input
                        type="text"
                        name="registrationNumber"
                        placeholder="Registration Number"
                        className="w-full p-2 border rounded-lg"
                        value={formData.registrationNumber}
                        onChange={handleInputChange}
                        required
                      />
                      <input
                        type="text"
                        name="taxId"
                        placeholder="Tax Identification Number"
                        className="w-full p-2 border rounded-lg"
                        value={formData.taxId}
                        onChange={handleInputChange}
                        required
                      />
                      <input
                        type="text"
                        name="businessAddress"
                        placeholder="Business Address"
                        className="w-full p-2 border rounded-lg"
                        value={formData.businessAddress}
                        onChange={handleInputChange}
                        required
                      />
                      <input
                        type="url"
                        name="websiteUrl"
                        placeholder="Website URL"
                        className="w-full p-2 border rounded-lg"
                        value={formData.websiteUrl}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="border-t pt-4 mt-4">
                      <h3 className="font-semibold text-gray-700 mb-4">
                        Representative Information
                      </h3>
                      <div className="space-y-3">
                        <input
                          type="text"
                          name="representativeName"
                          placeholder="Full Name"
                          className="w-full p-2 border rounded-lg"
                          value={formData.representativeName}
                          onChange={handleInputChange}
                          required
                        />
                        <input
                          type="text"
                          name="jobTitle"
                          placeholder="Job Title"
                          className="w-full p-2 border rounded-lg"
                          value={formData.jobTitle}
                          onChange={handleInputChange}
                          required
                        />
                        <input
                          type="tel"
                          name="representativePhone"
                          placeholder="Phone Number"
                          className="w-full p-2 border rounded-lg"
                          value={formData.representativePhone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="border-t pt-4 mt-4">
                      <h3 className="font-semibold text-gray-700 mb-4">
                        Insurance Services
                      </h3>
                      <div className="space-y-3">
                        <textarea
                          name="licenseDetails"
                          placeholder="License or Accreditation Details"
                          className="w-full p-2 border rounded-lg"
                          value={formData.licenseDetails}
                          onChange={handleInputChange}
                          rows="3"
                          required
                        />
                        <textarea
                          name="insuranceTypes"
                          placeholder="Types of Insurance Offered"
                          className="w-full p-2 border rounded-lg"
                          value={formData.insuranceTypes}
                          onChange={handleInputChange}
                          rows="3"
                          required
                        />
                      </div>
                    </div>

                    <div className="border-t pt-4 mt-4">
                      <h3 className="font-semibold text-gray-700 mb-4">
                        Terms and Conditions
                      </h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            name="termsAccepted"
                            className="mr-2"
                            checked={formData.termsAccepted}
                            onChange={handleInputChange}
                            required
                          />
                          <span>I accept the terms and conditions</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
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
