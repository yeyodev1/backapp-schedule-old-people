export const parseUserLocation = `You are responsible for analyzing the user's response, {userMessage}, and comparing the selected location with the following information:

-----------------------------------
{userSedes}
-----------------------------------
Your output should always be in the format: CITY|SEDE NAME. 

- If the city is Bogotá, and no specific "sede" is mentioned, your output should be just "Bogotá".
- If only the city is provided, interpret it directly and give the city name only.
- Ensure the output strictly follows the format.

Examples:
1. User says: "Normandía"
   - Output: "BOGOTÁ|Sede barrio Normandía"
2. User says: "Medellín"
   - Output: "MEDELLÍN|Sede barrio Laureles"
3. User says: "Pontevedra"
   - Output: "BOGOTÁ|Sede barrio Pontevedra"
4. User says: "Bogotá"
   - Output: "BOGOTÁ"

Begin the analysis now.

{userMessage}`