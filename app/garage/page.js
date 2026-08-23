import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtVerify } from 'jose';
import { connectToDB } from '@/app/api/db';
import ShareButton from '@/app/ShareButton.js';
import RecommendButton from '@/app/components/recommendButton';

export const dynamic = 'force-dynamic';

export default async function Garage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session');

  if (!sessionCookie?.value) {
    redirect('/');
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(sessionCookie.value, secret);

  if (!payload?.userId) {
    redirect('/');
  }

  const { db } = await connectToDB();
  const items = await db
    .collection('garageItems')
    .find({ userId: payload.userId })
    .sort({ createdAt: -1 })
    .toArray();

  const getCategoryLabel = (item) => {
    if (item.category == 'vehicle') return 'Vehicle';
    if (item.category == 'rims') return 'Rims';
    if (item.category == 'accessories') return 'Accessories';
    return item.category || 'Item';
  };

  const getItemTitle = (item) => {
    if (item.type == 'vehicle') {
      return `${item.year} ${item.make} ${item.model}`.trim();
    } else if (item.type == 'rim') {
      return item.name || 'Rim';
    } else {
      return item.name || 'Accessory';
    }
  };

  const getImageSrc = (item) => {
    if (item.imageData) {
      return item.imageData;
    } else if (item.imageName) {
      return "/images/cars/" + item.imageName;
    }
    return null;
  };

  const renderItemDetails = (item) => {
    if (item.type == 'vehicle') {
      let extraInfoSection = null;

      if (item.extraInfo) {
        extraInfoSection = <p className="muted text-sm">{item.extraInfo}</p>;
      }

      return (
        <div className="space-y-1">
          {extraInfoSection}
        </div>
      );
    } else if (item.type == 'rim') {
      let extraInfoSection = null;

      if (item.extraInfo) {
        extraInfoSection = <p className="muted text-sm">{item.extraInfo}</p>;
      }

      return (
        <div className="space-y-1">
          <p className="muted text-sm">Brand: {item.brand}</p>
          <p className="muted text-sm">Size: {item.size}</p>
          <p className="muted text-sm">Finish: {item.finish}</p>
          <p className="muted text-sm">Price: {item.price}</p>
          {extraInfoSection}
        </div>
      );
    } else {
      let extraInfoSection = null;

      if (item.extraInfo) {
        extraInfoSection = <p className="muted text-sm">{item.extraInfo}</p>;
      }

      return (
        <div className="space-y-1">
          <p className="muted text-sm">Brand: {item.brand}</p>
          <p className="muted text-sm">Category: {item.category}</p>
          <p className="muted text-sm">Price: {item.price}</p>
          {extraInfoSection}
        </div>
      );
    }
  };

  return (
    <div className="space-y-8 py-10">
      <div className="max-w-3xl mx-auto flex px-4">
        <Link href="/garage/upload" className="btn-accent w-full text-center">
          Upload to Garage
        </Link>
      </div>

      <ul className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
        {items.map((item) => {
          let imageSection = null;

          if (item.imageName) {
            imageSection = (
              <div className="h-72 overflow-hidden rounded-t-xl bg-transparent">
                <img
                  src={item.imageName}
                  alt={getItemTitle(item)}
                  className="w-full h-full object-cover rounded-t-xl"
                />
              </div>
            );
          }

          return (
            <li key={item._id.toString()} className="card">
              <div className="relative p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="muted uppercase">{getCategoryLabel(item)}</p>
                    <h2 className="text-lg font-semibold">{getItemTitle(item)}</h2>
                  </div>
                  <div className="pt-1">
                    <ShareButton
                      vehicleId={item._id.toString()}
                      vehicleImage={getImageSrc(item)}
                      vehicleName={`${item.year} ${item.make} ${item.model}`}
                      vehicleDetails={{
                        year: item.year,
                        make: item.make,
                        model: item.model,
                        extraInfo: item.extraInfo,
                      }}
                    />
                  </div>
                </div>
              </div>

              {imageSection}

              <div className="p-4">
                {renderItemDetails(item)}
                <div className="mt-4">
                  <RecommendButton itemId={item._id.toString()} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
