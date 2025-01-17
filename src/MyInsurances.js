import React, { useState } from "react";

const MyInsurances = ({ userInsurances }) => {
  const demoInsurances = [
    {
      name: "HealthCare Plus",
      type: "Health",
      premium: 800000,
      coverage: 1000000000,
      benefits: ["Hospitalization", "Surgery", "Outpatient", "Dental"],
      purchaseDate: "2024-01-15",
      expiryDate: "2025-01-14",
      status: "active",
    },
    {
      name: "Family Care",
      type: "Health",
      premium: 650000,
      coverage: 800000000,
      benefits: ["Hospitalization", "Critical Illness", "Accident"],
      purchaseDate: "2024-02-01",
      expiryDate: "2025-01-31",
      status: "active",
    },
  ];

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    category: "",
    contractCopy: null,
    evidenceFiles: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.fullName &&
      formData.phoneNumber &&
      formData.category &&
      formData.contractCopy &&
      formData.evidenceFiles
    ) {
      alert("Claim submitted successfully!");
      setShowForm(false);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "expired":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDaysRemaining = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
        My Insurances
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {(userInsurances.length > 0 ? userInsurances : demoInsurances).map(
          (insurance, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {insurance.name}
                    </h3>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      {insurance.type}
                    </span>
                  </div>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      insurance.status
                    )}`}
                  >
                    {insurance.status.charAt(0).toUpperCase() +
                      insurance.status.slice(1)}
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Premium</span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(insurance.premium)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Coverage</span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(insurance.coverage)}
                    </span>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-600">
                          Purchase Date
                        </span>
                        <p className="font-medium text-gray-900">
                          {formatDate(insurance.purchaseDate)}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">
                          Expiry Date
                        </span>
                        <p className="font-medium text-gray-900">
                          {formatDate(insurance.expiryDate)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm text-gray-600">
                        Days Remaining
                      </span>
                      <div className="mt-1 w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{
                            width: `${Math.min(
                              100,
                              Math.max(
                                0,
                                (getDaysRemaining(insurance.expiryDate) / 365) *
                                  100
                              )
                            )}%`,
                          }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {getDaysRemaining(insurance.expiryDate)} days remaining
                      </p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">
                      Benefits
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {insurance.benefits.map((benefit, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                  onClick={() => setShowForm(true)}
                >
                  File a Claim
                </button>
              </div>
            </div>
          )
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg relative">
            <div className="p-6">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                onClick={() => setShowForm(false)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                File a Claim
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Accident Insurance">
                      Accident Insurance
                    </option>
                    <option value="Home Insurance">Home Insurance</option>
                    <option value="Health Insurance">Health Insurance</option>
                    <option value="Life Insurance">Life Insurance</option>
                    <option value="Property Insurance">
                      Property Insurance
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Contract Copy
                  </label>
                  <input
                    type="file"
                    name="contractCopy"
                    onChange={handleFileChange}
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Evidence Files
                  </label>
                  <input
                    type="file"
                    name="evidenceFiles"
                    onChange={handleFileChange}
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                  >
                    Submit Claim
                  </button>
                  <button
                    type="button"
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyInsurances;
