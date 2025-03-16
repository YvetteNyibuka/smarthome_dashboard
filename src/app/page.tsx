import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">Smart Home Dashboard</h1>
        <p className="text-gray-600 mt-2">Control your home with ease</p>
      </header>

      <main className="mt-8 flex flex-wrap justify-center gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-64">
          <Image src="/images.jpg" alt="Lights" width={200} height={200} />
          <h2 className="text-lg font-semibold mt-4">Lights</h2>
          <p className="text-gray-500 text-sm">Turn on/off and adjust brightness</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-64">
          <Image src="/cooling.png" alt="Temperature" width={200} height={200} />
          <h2 className="text-lg font-semibold mt-4">Temperature</h2>
          <p className="text-gray-500 text-sm">Control heating & cooling</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-64">
          <Image src="/cameras.jpg" alt="Security" width={200} height={200} />
          <h2 className="text-lg font-semibold mt-4">Security</h2>
          <p className="text-gray-500 text-sm">Monitor cameras & locks</p>
        </div>
      </main>

      <footer className="mt-10 text-gray-500 text-sm">
        © 2025 SmartHome Inc. All rights reserved.
      </footer>
    </div>
  );
}
