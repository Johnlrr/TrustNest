// recommendationService.js
import { insurancePlans } from "./insuranceData";

export class RecommendationEngine {
  calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  calculateRiskScore(userProfile) {
    let riskScore = 0;

    // Age factor
    const age = this.calculateAge(userProfile.dateOfBirth);
    if (age < 30) riskScore += 1;
    else if (age < 50) riskScore += 2;
    else riskScore += 3;

    // Health history factor
    if (userProfile.healthHistory.toLowerCase().includes("chronic"))
      riskScore += 3;
    if (userProfile.healthHistory.toLowerCase().includes("surgery"))
      riskScore += 2;

    // Lifestyle factor
    if (userProfile.lifestyle === "active") riskScore -= 1;
    if (userProfile.lifestyle === "sedentary") riskScore += 1;

    // Occupation risk factor
    const highRiskOccupations = ["construction", "mining", "firefighter"];
    if (
      highRiskOccupations.some((occ) =>
        userProfile.occupation.toLowerCase().includes(occ)
      )
    ) {
      riskScore += 2;
    }

    return riskScore;
  }

  calculateMatchScore(plan, userProfile) {
    let matchScore = 0;
    const age = this.calculateAge(userProfile.dateOfBirth);
    const monthlySalary = parseFloat(userProfile.salary);

    // Basic eligibility checks
    if (age < plan.minAge || age > plan.maxAge) return 0;
    if (monthlySalary < plan.minSalary) return 0;
    if (plan.monthlyPremium > monthlySalary * 0.3) return 0; // Affordability check

    // Calculate match score based on various factors
    matchScore += this.calculateAffordabilityScore(
      plan.monthlyPremium,
      monthlySalary
    );
    matchScore += this.calculateCoverageScore(plan.coverage, monthlySalary);
    matchScore += this.calculateLifestyleMatch(plan, userProfile);
    matchScore += this.calculateRiskMatch(plan, userProfile);

    return Math.min(100, Math.max(0, matchScore));
  }

  calculateAffordabilityScore(premium, salary) {
    const ratio = premium / salary;
    if (ratio <= 0.1) return 30;
    if (ratio <= 0.2) return 20;
    if (ratio <= 0.3) return 10;
    return 0;
  }

  calculateCoverageScore(coverage, salary) {
    const annualSalary = salary * 12;
    const coverageRatio = coverage / annualSalary;
    if (coverageRatio >= 5) return 30;
    if (coverageRatio >= 3) return 20;
    if (coverageRatio >= 1) return 10;
    return 0;
  }

  calculateLifestyleMatch(plan, userProfile) {
    return plan.lifestylePreferences.includes(userProfile.lifestyle) ? 20 : 0;
  }

  calculateRiskMatch(plan, userProfile) {
    const userRiskScore = this.calculateRiskScore(userProfile);
    const planRiskFactors = plan.riskFactors.length;
    return Math.max(0, 20 - Math.abs(userRiskScore - planRiskFactors) * 5);
  }

  getRecommendations(userProfile) {
    const recommendations = insurancePlans
      .map((plan) => ({
        ...plan,
        matchScore: this.calculateMatchScore(plan, userProfile),
      }))
      .filter((plan) => plan.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .map((plan) => ({
        provider: plan.provider,
        planName: plan.planName,
        coverage: plan.coverage.toLocaleString("vi-VN") + " VND",
        monthlyPremium: plan.monthlyPremium.toLocaleString("vi-VN") + " VND",
        benefits: plan.benefits,
        match: Math.round(plan.matchScore) + "%",
      }));

    return recommendations;
  }
}
