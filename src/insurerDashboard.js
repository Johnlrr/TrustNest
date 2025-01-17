import React, { useState, useEffect } from "react";

const InsurerDashboard = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUserProfile(currentUser);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Insurer Dashboard
          </h1>
          {userProfile && (
            <div>
              <h2 className="text-xl font-semibold text-gray-700">
                Welcome, {userProfile.companyName}
              </h2>
              <p className="text-gray-600 mt-2">
                Manage your insurance services and client interactions here.
              </p>
              {/* Add more functionality for insurers as needed */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsurerDashboard;
