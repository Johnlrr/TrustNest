import React, { useState, useEffect } from "react";
import { RecommendationEngine } from "./recommendationService";
import {
  FileText,
  Upload,
  Clock,
  Check,
  AlertCircle,
  Download,
  CircleArrowRightIcon as CompareIcon,
  DollarSign,
  ShieldCheck,
  AlertTriangle,
  Plus,
  Minus,
} from "lucide-react";
import ChatBot from "./ChatBot";
import ContractAnalysis from "./ContractAnalysis";
import InsuranceRecommendations from "./InsuranceRecommendations";
import MyInsurances from "./MyInsurances";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("recommend");
  const [uploadedFiles, setUploadedFiles] = useState({
    main: null,
    compare: null,
  });
  const [analysisResults, setAnalysisResults] = useState({
    main: null,
    compare: null,
  });
  const [comparison, setComparison] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [userInsurances, setUserInsurances] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUserProfile(currentUser);
      const insurances =
        JSON.parse(localStorage.getItem("userInsurances")) || [];
      setUserInsurances(insurances);
    }
  }, []);

  const getRecommendations = () => {
    if (!userProfile) {
      setError("User profile not found");
      return;
    }

    setLoading(true);
    try {
      const recommendationEngine = new RecommendationEngine();
      const recommendations =
        recommendationEngine.getRecommendations(userProfile);

      if (recommendations.length === 0) {
        setError("No matching insurance plans found for your profile");
        setRecommendations([]);
      } else {
        setRecommendations(recommendations);
      }
    } catch (error) {
      setError("Error generating recommendations: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const analyzeContracts = async () => {
    setLoading(true);
    try {
      const mainAnalysis = await performContractAnalysis(uploadedFiles.main);

      if (uploadedFiles.compare) {
        const compareAnalysis = await performContractAnalysis(
          uploadedFiles.compare
        );

        const comparisonResult = {
          summary: "Contract B offers better value with lower fraud risk",
          pricingComparison: {
            difference: "150,000 VND monthly",
            betterValue: "Contract B",
          },
          coverageComparison: {
            broader: "Contract A",
            keyDifferences: [
              "Contract A includes dental coverage",
              "Contract B has better critical illness coverage",
              "Contract A has longer waiting period",
            ],
          },
          riskAssessment: {
            fraudRisk: {
              contractA: mainAnalysis.fraudRisk.level,
              contractB: compareAnalysis.fraudRisk.level,
            },
            ambiguityScore: {
              contractA: mainAnalysis.ambiguityAnalysis.score,
              contractB: compareAnalysis.ambiguityAnalysis.score,
            },
          },
          recommendation:
            "Contract B is recommended due to clearer terms and better pricing",
        };

        setComparison(comparisonResult);
        setAnalysisResults({
          main: mainAnalysis,
          compare: compareAnalysis,
        });
      } else {
        setAnalysisResults({
          main: mainAnalysis,
          compare: null,
        });
        setComparison(null);
      }
    } catch (error) {
      console.error("Analysis failed:", error);
    }
    setLoading(false);
  };

  const handleFileUpload = (type) => (e) => {
    const file = e.target.files[0];
    setUploadedFiles((prev) => ({ ...prev, [type]: file }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="border-b">
            <div className="flex">
              <button
                className={`px-6 py-3 ${
                  activeTab === "recommend"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("recommend")}
              >
                Insurance Recommendations
              </button>
              <button
                className={`px-6 py-3 ${
                  activeTab === "myInsurances"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("myInsurances")}
              >
                My Insurances
              </button>
              <button
                className={`px-6 py-3 ${
                  activeTab === "analyze"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("analyze")}
              >
                Contract Analysis & Comparison
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === "recommend" ? (
              <InsuranceRecommendations
                getRecommendations={getRecommendations}
                loading={loading}
                recommendations={recommendations}
              />
            ) : activeTab === "myInsurances" ? (
              <MyInsurances userInsurances={userInsurances} />
            ) : (
              <ContractAnalysis
                handleFileUpload={handleFileUpload}
                analyzeContracts={analyzeContracts}
                uploadedFiles={uploadedFiles}
                loading={loading}
                analysisResults={analysisResults}
                comparison={comparison}
              />
            )}
          </div>
        </div>
      </div>
      <ChatBot />
    </div>
  );
};

export default Dashboard;
