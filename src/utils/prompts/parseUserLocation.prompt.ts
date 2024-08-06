export const parseUserLocation = `You are responsible for analyzing the user's response, {userMessage}, and comparing the selected location with the following information:

**BOGOTÁ:**
- Sede barrio Pontevedra: Calle 117 #70F-65
- Sede barrio Normandía: Cra 71b #49A-38
- Sede barrio Quinta Camacho: Cra 13 # 71-27

**CALI:**
- Sede barrio Tequendama: Carrera 40 #5B-20

**MEDELLÍN:**
- Sede barrio Laureles: Circular 1 #73-50

**BARRANQUILLA:**
- Sede barrio El Porvenir: Carrera 47 #79-194

**VILLAVICENCIO:**
- Sede barrio El Barzal: Calle 34 #38-29

**BUCARAMANGA:**
- Sede barrio Sotomayor: Carrera 28 #48-59

**PEREIRA:**
- Sede barrio Pinares: Carrera 16 Bis #9-04

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