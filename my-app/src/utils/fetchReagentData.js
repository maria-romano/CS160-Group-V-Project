// my-app/src/utils/fetchReagentData.js

export async function fetchAndParseReagentData() {
    try {
      const txtRes = await fetch('/exp_2020.txt');
      const text = await txtRes.text();
  
      const reagentRes = await fetch('https://noggin.rea.gent/yappiest-bovid-3112', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer rg_v1_uogozq489g22w8459hr38xvxvhwjgwx748ym_ngk',
        },
        body: JSON.stringify({ pdf: text }),
      });
  
      const jsonText = await reagentRes.text();
      const json = JSON.parse(jsonText);
      return json;
    } catch (error) {
      console.error('Error parsing Reagent data:', error);
      return null;
    }
  }
  