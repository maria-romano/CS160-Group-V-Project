// my-app/src/utils/fetchReagentData.js

export async function fetchAndParseReagentData(base64Image) {
  try {
    console.log("Calling Reagent API...");
    const reagentRes = await fetch(
      "https://noggin.rea.gent/yappiest-bovid-3112",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization:
            "Bearer rg_v1_jxld5vmflgi21o63am3bivr4e904rtjc2tjd_ngk",
        },
        body: JSON.stringify({ pdf: base64Image }),
      }
    );

    console.log("Reagent API response status:", reagentRes.status);
    console.log(
      "Reagent API response headers:",
      Object.fromEntries(reagentRes.headers.entries())
    );

    // If server sends proper JSON this succeeds immediately
    if (reagentRes.headers.get("content-type")?.includes("application/json")) {
      console.log("Parsing JSON response");
      const jsonData = await reagentRes.json();
      console.log("Parsed JSON data:", jsonData);
      return jsonData;
    }

    // Otherwise fall back to text and scrub fences
    console.log("Parsing text response and removing code fences");
    let jsonText = await reagentRes.text();
    console.log("Raw text response:", jsonText.substring(0, 200) + "..."); // Log first 200 chars
    jsonText = jsonText.replace(/^\s*```json\s*|```\s*$/g, ""); // remove code fences
    console.log(
      "Text after removing fences:",
      jsonText.substring(0, 200) + "..."
    ); // Log first 200 chars
    const json = JSON.parse(jsonText);
    console.log("Parsed JSON from text:", json);
    return json;
  } catch (error) {
    console.error("Error parsing Reagent data:", error);
    return null;
  }
}

// Fallback data in case the API fails
export function getFallbackData() {
  return {
    organization: {
      name: "Sample Foundation",
      ein: "12-3456789",
      taxYear: "2023",
      address: {
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zip: "10001",
      },
      telephone: "212-555-1234",
    },
    financials: {
      totalRevenue: 5000000,
      totalExpenses: 4200000,
      netAssets: 12500000,
      programServiceExpenses: 3500000,
      managementExpenses: 450000,
      fundraisingExpenses: 250000,
      investments: 8500000,
      grants: 2800000,
    },
  };
}
