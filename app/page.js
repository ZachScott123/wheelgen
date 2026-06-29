export default function Home() {
  
  return (
    <div className="relative w-screen">
      <div 
        className="relative w-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/cover/cover-art1.jpg')", backgroundSize: "cover" }}
      >
        <img src="/images/cover/cover-art1.jpg" alt="Cover" className="w-screen h-auto block" />
        <div className="absolute inset-0 flex items-center pl-12">
          <div>
            <h1 className="text-9xl font-bold text-white text-shadow-lg">WHEELGEN</h1>
            <p className="mt-4 text-3xl text-white text-shadow-lg">Your ultimate wheel browser and car imagery tool.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
