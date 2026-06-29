import { connectToDB } from '@/app/api/db';
import { revalidatePath } from 'next/cache';
import VehicleCard from '@/app/components/vehiclecard/vehiclecard';

export default async function Gallery() {
    const { db } = await connectToDB();
    
    const cars = await db.collection('cars').find({}).toArray();
    
    const carsWithStringId = cars.map(car => ({
        ...car,
        _id: car._id.toString(),
        imageUrl: car.imageData
    }));

  return (
        <div className="space-y-8 py-10">
            <ul className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
                {carsWithStringId.map((vehicle) => (
                    <VehicleCard key={vehicle._id} vehicle={vehicle} />
                ))}
            </ul>
        </div>
    );
}