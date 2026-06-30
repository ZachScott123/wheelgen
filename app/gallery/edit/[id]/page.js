import { connectToDB } from '@/app/api/db';
import { ObjectId } from 'mongodb';
import EditForm from './editForm';

export default async function editPage({ params }) {
    const { db } = await connectToDB();
    const { id } = await params;
    
    let vehicle = null;

    const objectId = new ObjectId(id);
    vehicle = await db.collection('cars').findOne({ 
        _id: objectId 
    });

    const vehicleStringId = {
        ...vehicle,
        _id: vehicle._id.toString()
    };

    return <EditForm vehicle={vehicleStringId} />;
}