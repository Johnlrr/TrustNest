import React from "react";

const MyInsurances = ({ userInsurances }) => {
  // Demo insurances
  const demoInsurances = [
    {
      name: "HealthCare Plus",
      type: "Health",
      premium: 800000,
      coverage: 1000000000,
      benefits: ["Hospitalization", "Surgery", "Outpatient", "Dental"],
    },
    {
      name: "Family Care",
      type: "Health",
      premium: 650000,
      coverage: 800000000,
      benefits: ["Hospitalization", "Critical Illness", "Accident"],
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">My Insurances</h2>
      {userInsurances.length > 0 ? (
        <div className="space-y-4">
          {userInsurances.map((insurance, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {insurance.name}
              </h3>
              <p className="text-gray-600">Type: {insurance.type}</p>
              <p className="text-gray-600">Premium: {insurance.premium}</p>
              <p className="text-gray-600">Coverage: {insurance.coverage}</p>
              <p className="text-gray-600">
                Benefits: {insurance.benefits.join(", ")}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {demoInsurances.map((insurance, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {insurance.name}
              </h3>
              <p className="text-gray-600">Type: {insurance.type}</p>
              <p className="text-gray-600">Premium: {insurance.premium}</p>
              <p className="text-gray-600">Coverage: {insurance.coverage}</p>
              <p className="text-gray-600">
                Benefits: {insurance.benefits.join(", ")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyInsurances;
