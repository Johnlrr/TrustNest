import React, { useState, useEffect } from "react";

const InsurerDashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [insuranceFile, setInsuranceFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [insuranceInfo, setInsuranceInfo] = useState({
    name: "",
    type: "",
    premium: "",
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUserProfile(currentUser);
    }
  }, []);

  const handleFileChange = (e) => {
    setInsuranceFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInsuranceInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleUpload = async () => {
    if (
      !insuranceFile ||
      !insuranceInfo.name ||
      !insuranceInfo.type ||
      !insuranceInfo.premium
    ) {
      setUploadStatus("Please fill in all fields and select a file to upload.");
      return;
    }

    // Simulate file validation for transparency and fraud prevention
    const isValid = await validateInsuranceFile(insuranceFile);
    if (isValid) {
      setUploadStatus("File uploaded successfully.");
      // Add logic to upload the file and insurance info to the market
    } else {
      setUploadStatus("File validation failed. Please check the contract.");
    }
  };

  const validateInsuranceFile = async (file) => {
    // Simulate validation logic
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true); // Assume the file is valid for now
      }, 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Insurer Dashboard
          </h1>
          {userProfile && (
            <div className="flex">
              <div className="w-1/4 bg-gray-100 p-4 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Welcome, {userProfile.companyName}
                </h2>
                <ul>
                  <li className="mb-2">
                    <button className="text-blue-500">New Insurance</button>
                  </li>
                  {/* Add more tabs as needed */}
                </ul>
              </div>
              <div className="w-3/4 bg-white p-6 rounded-lg shadow-lg ml-4">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  New Insurance
                </h3>
                <div className="mb-4">
                  <label className="block text-gray-700">Insurance Name</label>
                  <input
                    type="text"
                    name="name"
                    value={insuranceInfo.name}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">
                    Type of Insurance
                  </label>
                  <input
                    type="text"
                    name="type"
                    value={insuranceInfo.type}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Premium Amount</label>
                  <input
                    type="text"
                    name="premium"
                    value={insuranceInfo.premium}
                    onChange={handleInputChange}
                    className="mt-1 p-2 border rounded w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Upload Contract</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="mt-1"
                  />
                </div>
                <button
                  onClick={handleUpload}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Upload
                </button>
                {uploadStatus && (
                  <p className="mt-2 text-gray-600">{uploadStatus}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsurerDashboard;
