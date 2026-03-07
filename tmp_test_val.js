// Script to test valuation algorithm math in isolation
const dampeningFactor = 0.55;

function testValuation(params) {
    let baseSqmPrice = 25000;
    const dynamicBaseSqmPrice = baseSqmPrice;
    let estimatedValue = dynamicBaseSqmPrice * params.grossSqm;

    let bAgeDepreciation = 0.013;
    let totalAgePenalty = 0;
    const age = params.buildingAge;

    const earlyAge = Math.min(age, 10);
    totalAgePenalty += (earlyAge * bAgeDepreciation);

    if (age > 10) {
        const midAge = Math.min(age - 10, 10);
        totalAgePenalty += (midAge * (bAgeDepreciation * 0.75));
    }
    if (age > 20) {
        const lateAge = age - 20;
        totalAgePenalty += (lateAge * (bAgeDepreciation * 0.40));
    }
    totalAgePenalty = Math.min(totalAgePenalty, 0.45);
    estimatedValue = estimatedValue * (1 - totalAgePenalty);

    console.log("Age " + age + " penalty: " + (totalAgePenalty * 100).toFixed(2) + "%");

    // bonuses
    const bonusMultipliers = params.bonuses;
    let totalBonusDelta = 0;
    let totalPenaltyDelta = 0;
    bonusMultipliers.forEach(m => {
        if (m >= 1) totalBonusDelta += (m - 1);
        else totalPenaltyDelta += (1 - m);
    });

    const dampenedBonus = totalBonusDelta * dampeningFactor;
    const dampenedPenalty = totalPenaltyDelta * 0.85;
    const finalBonusMultiplier = 1 + dampenedBonus - dampenedPenalty;

    estimatedValue *= finalBonusMultiplier;

    console.log("Dampened bonus mult: " + finalBonusMultiplier.toFixed(3));
    console.log("Final Estimated Value for " + params.grossSqm + "m2: " + new Intl.NumberFormat('tr-TR').format(estimatedValue) + " TL");
    console.log("------------------------");
}

testValuation({ buildingAge: 5, grossSqm: 100, bonuses: [1.05, 1.08, 1.15] }); // Modern lux
testValuation({ buildingAge: 35, grossSqm: 100, bonuses: [0.95, 0.80, 0.90] }); // Old, bad condition
