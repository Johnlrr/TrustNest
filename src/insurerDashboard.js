import React, { useState, useEffect } from "react";
import { FileText, Users, FileCheck2, Plus } from "lucide-react";

const InsurerDashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [insuranceFile, setInsuranceFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [insuranceInfo, setInsuranceInfo] = useState({
    name: "",
    type: "",
    premium: "",
  });
  const [activeTab, setActiveTab] = useState("newInsurance");
  const [validatedInsurances, setValidatedInsurances] = useState([
    {
      name: "Standard Health Insurance",
      type: "Health",
      premium: "$299/month",
      coverage: "$1,000,000",
      description:
        "Comprehensive health coverage including preventive care, hospitalization, and prescription drugs",
    },
    {
      name: "Premium Auto Insurance",
      type: "Auto",
      premium: "$150/month",
      coverage: "$500,000",
      description:
        "Full coverage auto insurance with collision, comprehensive, and liability protection",
    },
    {
      name: "Home Protection Plus",
      type: "Property",
      premium: "$175/month",
      coverage: "$750,000",
      description:
        "Complete home insurance covering natural disasters, theft, and property damage",
    },
    {
      name: "Term Life Insurance",
      type: "Life",
      premium: "$89/month",
      coverage: "$2,000,000",
      description: "20-year term life insurance with guaranteed death benefit",
    },
    {
      name: "Business Liability Protection",
      type: "Commercial",
      premium: "$399/month",
      coverage: "$5,000,000",
      description:
        "Comprehensive business liability coverage for small to medium enterprises",
    },
  ]);
  const [receivedClaims, setReceivedClaims] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUserProfile(currentUser);
    }

    const claims = [
      {
        name: "John Doe",
        ssn: "123-45-6789",
        phone: "123-456-7890",
        email: "john.doe@example.com",
        contractFile: "contract.pdf",
        eventReport: "Accident on 01/01/2023",
        evidenceFile: "evidence.jpg",
      },
      {
        name: "Jane Smith",
        ssn: "987-65-4321",
        phone: "098-765-4321",
        email: "jane.smith@example.com",
        contractFile: "contract.pdf",
        eventReport: "Illness on 02/02/2023",
        evidenceFile: "evidence.jpg",
      },
    ];
    setReceivedClaims(claims);
  }, []);

  const handleFileChange = (e) => {
    setInsuranceFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInsuranceInfo((prev) => ({
      ...prev,
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

    const isValid = await validateInsuranceFile(insuranceFile);
    if (isValid) {
      setUploadStatus("File uploaded successfully.");
      setValidatedInsurances((prev) => [...prev, { ...insuranceInfo }]);
    } else {
      setUploadStatus("File validation failed. Please check the contract.");
    }
  };

  const validateInsuranceFile = async (file) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 2000);
    });
  };

  const TabButton = ({ icon: Icon, label, tabName }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex items-center space-x-2 w-full p-3 rounded-lg transition-colors ${
        activeTab === tabName
          ? "bg-blue-100 text-blue-600"
          : "hover:bg-gray-100 text-gray-600"
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-semibold text-gray-900">
              Insurer Dashboard
            </h1>
          </div>

          {userProfile && (
            <div className="flex flex-col md:flex-row min-h-screen">
              <div className="w-full md:w-64 p-6 border-r">
                <div className="space-y-2">
                  <TabButton
                    icon={Plus}
                    label="New Insurance"
                    tabName="newInsurance"
                  />
                  <TabButton
                    icon={FileCheck2}
                    label="Manage Insurances"
                    tabName="manageInsurances"
                  />
                  <TabButton
                    icon={FileText}
                    label="Receive Claims"
                    tabName="receiveClaims"
                  />
                </div>
              </div>

              <div className="flex-1 p-6">
                {activeTab === "newInsurance" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-medium text-gray-900">
                      Create New Insurance
                    </h2>
                    <div className="grid gap-6 max-w-xl">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Insurance Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={insuranceInfo.name}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Type of Insurance
                        </label>
                        <input
                          type="text"
                          name="type"
                          value={insuranceInfo.type}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Premium Amount
                        </label>
                        <input
                          type="text"
                          name="premium"
                          value={insuranceInfo.premium}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Upload Contract
                        </label>
                        <input
                          type="file"
                          onChange={handleFileChange}
                          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                      </div>
                      <button
                        onClick={handleUpload}
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Upload Insurance
                      </button>
                      {uploadStatus && (
                        <p className="text-sm text-gray-600">{uploadStatus}</p>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === "manageInsurances" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-medium text-gray-900">
                      Manage Insurances
                    </h2>
                    <div className="grid gap-4">
                      {validatedInsurances.map((insurance, index) => (
                        <div
                          key={index}
                          className="bg-white p-6 rounded-lg border hover:shadow-md transition-shadow"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">
                                {insurance.name}
                              </h3>
                              <p className="mt-1 text-sm text-gray-500">
                                {insurance.description}
                              </p>
                            </div>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                              {insurance.type}
                            </span>
                          </div>
                          <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-gray-500">
                                Premium
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900">
                                {insurance.premium}
                              </dd>
                            </div>
                            <div className="sm:col-span-1">
                              <dt className="text-sm font-medium text-gray-500">
                                Coverage
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900">
                                {insurance.coverage}
                              </dd>
                            </div>
                            <div className="sm:col-span-1">
                              <button className="mt-1 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                View Details
                              </button>
                            </div>
                          </dl>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "receiveClaims" && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-medium text-gray-900">
                      Received Claims
                    </h2>
                    <div className="grid gap-4">
                      {receivedClaims.map((claim, index) => (
                        <div
                          key={index}
                          className="bg-white p-6 rounded-lg border hover:shadow-md transition-shadow"
                        >
                          <h3 className="text-lg font-medium text-gray-900">
                            {claim.name}
                          </h3>
                          <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
                            <div>
                              <dt className="text-sm font-medium text-gray-500">
                                SSN
                              </dt>
                              <dd className="text-sm text-gray-900">
                                {claim.ssn}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">
                                Phone
                              </dt>
                              <dd className="text-sm text-gray-900">
                                {claim.phone}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">
                                Email
                              </dt>
                              <dd className="text-sm text-gray-900">
                                {claim.email}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">
                                Event Report
                              </dt>
                              <dd className="text-sm text-gray-900">
                                {claim.eventReport}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      ))}
                    </div>
                  </div>
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
