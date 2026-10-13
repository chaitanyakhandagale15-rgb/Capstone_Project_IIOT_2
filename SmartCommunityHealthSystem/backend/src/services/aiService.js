const axios = require("axios");

const predictDisease = async (sensorData) => {
  const {
    ph,
    temperature,
    turbidity,
    waterQuality,
  } = sensorData;

  const prompt = `
You are a public health expert specializing in waterborne diseases.

Current Sensor Readings:

- pH: ${ph}
- Temperature: ${temperature} °C
- Turbidity: ${turbidity} NTU
- Water Quality: ${waterQuality}

Rules:

- pH between 6.5 and 8.5 is safe.
- Turbidity above 5 NTU increases contamination risk.
- Turbidity above 10 NTU indicates high contamination.
- Temperature above 35°C increases bacterial growth.
- Very acidic or alkaline water increases health risks.

Classify the risk as:
- Low
- Moderate
- High

If risk is Moderate or High, suggest realistic waterborne diseases from:
- Cholera
- Typhoid
- Dysentery
- Hepatitis A
- E. coli Infection
- Gastroenteritis

Return ONLY this JSON:

{
  "risk": "...",
  "diseases": [],
  "prevention": [],
  "summary": "..."
}
`;

  const response = await axios.post(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/${process.env.CLOUDFLARE_MODEL}`,
    {
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.result.response;
};

module.exports = {
  predictDisease,
};