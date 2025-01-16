import React, { useState, useEffect } from "react";
import { RecommendationEngine } from "./recommendationService";
import {
  FileText,
  Upload,
  Clock,
  Check,
  AlertCircle,
  Download,
  Cat as CompareIcon,
  DollarSign,
  ShieldCheck,
  AlertTriangle,
  Plus,
  Minus,
} from "lucide-react";

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

  useEffect(() => {
    // Fetch user profile from localStorage or your authentication system
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUserProfile(currentUser);
    }
  }, []);

  // Modified getRecommendations function
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

  // Contract Analysis Functions
  const performContractAnalysis = (contract) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          fraudRisk: {
            level: "Medium",
            score: 65,
            reasons: [
              "Vague terminology in coverage conditions",
              "Unclear premium adjustment clauses",
              "Hidden fees in fine print",
            ],
          },
          ambiguityAnalysis: {
            score: 72,
            ambiguousSection: [
              {
                section: "3.2 Coverage Terms",
                issue: "Uses undefined medical terminology",
                severity: "High",
              },
              {
                section: "4.1 Premium Calculations",
                issue: "Complex calculation method",
                severity: "Medium",
              },
            ],
          },
          keyTerms: {
            coverage: "500,000,000 VND",
            monthlyPremium: "750,000 VND",
            waitingPeriod: "90 days",
            exclusions: ["Pre-existing conditions", "Cosmetic procedures"],
            benefits: ["Hospital care", "Surgery", "Emergency treatment"],
          },
          legalCompliance: {
            status: "Compliant",
            warnings: ["Update needed for new 2024 regulations"],
          },
        });
      }, 2000);
    });
  };

  const analyzeContracts = async () => {
    setLoading(true);
    try {
      const mainAnalysis = await performContractAnalysis(uploadedFiles.main);

      // If there's a second file, perform comparison analysis
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
        // If only one file, just set the main analysis
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
    setUploadedFiles((prev) => ({
      ...prev,
      [type]: file,
    }));
  };

  const renderSingleAnalysis = (analysis, title = "Contract Analysis") => {
    if (!analysis) return null;

    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        {renderAnalysisResults(analysis)}
      </div>
    );
  };

  const renderAnalysisSection = () => {
    if (!analysisResults.main) return null;

    return (
      <div className="space-y-8">
        {analysisResults.compare ? (
          <>
            <div className="grid grid-cols-2 gap-8">
              {renderSingleAnalysis(
                analysisResults.main,
                "Contract A Analysis"
              )}
              {renderSingleAnalysis(
                analysisResults.compare,
                "Contract B Analysis"
              )}
            </div>
            {renderComparison()}
          </>
        ) : (
          renderSingleAnalysis(analysisResults.main)
        )}
      </div>
    );
  };

  // Render Functions
  const renderAnalysisResults = (analysis) => {
    if (!analysis) return null;

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-bold mb-4">Fraud Risk Analysis</h3>
          <div
            className={`p-4 rounded-lg ${
              analysis.fraudRisk.level === "Low"
                ? "bg-green-50"
                : analysis.fraudRisk.level === "Medium"
                ? "bg-yellow-50"
                : "bg-red-50"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold">
                Risk Level: {analysis.fraudRisk.level}
              </span>
              <span className="font-semibold">
                Score: {analysis.fraudRisk.score}/100
              </span>
            </div>
            <ul className="space-y-2">
              {analysis.fraudRisk.reasons.map((reason, index) => (
                <li key={index} className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-xl font-bold mb-4">Key Terms</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Coverage</p>
              <p className="font-semibold">{analysis.keyTerms.coverage}</p>
            </div>
            <div>
              <p className="text-gray-600">Monthly Premium</p>
              <p className="font-semibold">
                {analysis.keyTerms.monthlyPremium}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Waiting Period</p>
              <p className="font-semibold">{analysis.keyTerms.waitingPeriod}</p>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Benefits</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.keyTerms.benefits.map((benefit, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                >
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderComparison = () => {
    if (!comparison) return null;

    return (
      <div className="bg-white rounded-lg p-6 shadow-md mt-6">
        <h3 className="text-xl font-bold mb-4">Contract Comparison Analysis</h3>
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-blue-800 font-semibold">{comparison.summary}</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold">Contract A</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p>Fraud Risk: {comparison.riskAssessment.fraudRisk.contractA}</p>
              <p>
                Clarity Score:{" "}
                {comparison.riskAssessment.ambiguityScore.contractA}/100
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Contract B</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p>Fraud Risk: {comparison.riskAssessment.fraudRisk.contractB}</p>
              <p>
                Clarity Score:{" "}
                {comparison.riskAssessment.ambiguityScore.contractB}/100
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold mb-3">Key Differences</h4>
          <ul className="space-y-2">
            {comparison.coverageComparison.keyDifferences.map((diff, index) => (
              <li key={index} className="flex items-start">
                <CompareIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>{diff}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
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
              <div>
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Find Your Perfect Insurance Plan
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Based on your profile, we'll recommend the best insurance
                    plans for you
                  </p>
                </div>

                <button
                  onClick={getRecommendations}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors mb-6"
                  disabled={loading}
                >
                  {loading
                    ? "Analyzing your profile..."
                    : "Get Recommendations"}
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
                            <p className="text-blue-600 font-medium">
                              {plan.planName}
                            </p>
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
                            <p className="font-semibold">
                              {plan.monthlyPremium}
                            </p>
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
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Upload Primary Contract
                    </h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        id="mainContract"
                        className="hidden"
                        onChange={handleFileUpload("main")}
                        accept=".pdf,.doc,.docx"
                      />
                      <label htmlFor="mainContract" className="cursor-pointer">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Upload primary contract</p>
                      </label>
                    </div>
                    {uploadedFiles.main && (
                      <p className="text-green-600 flex items-center mt-2">
                        <Check className="h-5 w-5 mr-2" />
                        {uploadedFiles.main.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Upload Contract for Comparison (Optional)
                    </h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        id="compareContract"
                        className="hidden"
                        onChange={handleFileUpload("compare")}
                        accept=".pdf,.doc,.docx"
                      />
                      <label
                        htmlFor="compareContract"
                        className="cursor-pointer"
                      >
                        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">
                          Upload contract for comparison
                        </p>
                      </label>
                    </div>
                    {uploadedFiles.compare && (
                      <p className="text-green-600 flex items-center mt-2">
                        <Check className="h-5 w-5 mr-2" />
                        {uploadedFiles.compare.name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={analyzeContracts}
                    className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                    disabled={loading || !uploadedFiles.main}
                  >
                    {loading
                      ? "Analyzing..."
                      : uploadedFiles.compare
                      ? "Compare Contracts"
                      : "Analyze Contract"}
                  </button>
                </div>

                {renderAnalysisSection()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
