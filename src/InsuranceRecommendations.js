import React from "react";

const InsuranceRecommendations = ({
  getRecommendations,
  loading,
  recommendations,
}) => {
  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Find Your Perfect Insurance Plan
        </h2>
        <p className="text-gray-600 mt-2">
          Based on your profile, we'll recommend the best insurance plans for
          you
        </p>
      </div>

      <button
        onClick={getRecommendations}
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors mb-6"
        disabled={loading}
      >
        {loading ? "Analyzing your profile..." : "Get Recommendations"}
      </button>

      {recommendations && (
        <div className="space-y-4">
          {recommendations.map((plan, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {plan.provider}
                  </h3>
                  <p className="text-blue-600 font-medium">{plan.planName}</p>
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  {plan.match} Match
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Coverage</p>
                  <p className="font-semibold">{plan.coverage}</p>
                </div>
                <div>
                  <p className="text-gray-600">Monthly Premium</p>
                  <p className="font-semibold">{plan.monthlyPremium}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-600">Benefits:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {plan.benefits.map((benefit, i) => (
                    <span
                      key={i}
                      className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
              <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
                Contact Provider
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InsuranceRecommendations;
