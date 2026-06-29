export async function GET() {
  try {
    const response = await fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
    );
    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to get makes" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}