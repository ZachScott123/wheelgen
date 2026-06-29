import WheelCard from "@/app/components/wheelcard/wheelcard";
import rims from "../../data/rims";

export default function Wheels() {
  return (
    <div className="space-y-8 py-10 px-4 max-w-7xl mx-auto">
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {rims.map((rim) => (
          <WheelCard key={rim.id} rim={rim} />
        ))}
      </div>
    </div>
  );
}