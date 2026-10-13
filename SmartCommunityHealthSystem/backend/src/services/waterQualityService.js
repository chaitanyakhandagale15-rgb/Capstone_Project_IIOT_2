/**
 * Calculate Water Quality
 */
const calculateWaterQuality = ({ ph, turbidity, temperature }) => {
  // Unsafe
  if (
    ph < 6.5 ||
    ph > 8.5 ||
    turbidity > 10 ||
    temperature > 35
  ) {
    return "Unsafe";
  }

  // Moderate
  if (turbidity > 5) {
    return "Moderate";
  }

  // Safe
  return "Safe";
};

const isContaminated = ({ ph, turbidity, temperature }) => {
  return (
    ph < 6.5 ||
    ph > 8.5 ||
    turbidity > 10 ||
    temperature > 35
  );
};

module.exports = {
  calculateWaterQuality,
  isContaminated,
};