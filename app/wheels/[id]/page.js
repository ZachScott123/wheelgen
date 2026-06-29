import Link from "next/link";
import rims from "../../../data/rims";

export default async function RimPage({ params }) {
  const { id } = await params;
  const rim = rims.find((item) => item.id === id);

  if (!rim) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card p-8 text-center">
          <p className="text-lg font-semibold">Rim not found.</p>
          <Link href="/wheels" className="btn-accent inline-block mt-4">
            Return
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-10">
      <div className="card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold">{rim.name}</h1>
          <Link href="/wheels" className="btn-accent inline-flex">Return</Link>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          <div className="rounded-xl overflow-hidden">
            <img src={rim.imageUrl} alt={rim.name} className="w-full h-auto object-cover rounded-xl" />
          </div>

          <div>
            <p className="text-2xl font-semibold">Price: ${rim.price}</p>
            <p className="mt-2"><strong>Size:</strong> {rim.size}</p>
            <p className="mt-1"><strong>Offset:</strong> {rim.offset}</p>
            <p className="mt-1"><strong>Bolt Pattern:</strong> {rim.boltPattern}</p>
            <p className="mt-1"><strong>Finish:</strong> {rim.finish}</p>
            <p className="mt-1"><strong>Category:</strong> {rim.category}</p>
            <p className="mt-4 muted"><strong>Information:</strong> {rim.fitmentNotes}</p>
            <p className="mt-2">{rim.description}</p>
          </div>
        </div>

      </div>
    </div>

  );
}