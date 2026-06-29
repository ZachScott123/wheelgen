export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const make = searchParams.get("make");

  try {
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${encodeURIComponent(make)}?format=json`
    );
    const data = await response.json();
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to get models" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}