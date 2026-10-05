import { useEffect, useState } from "react";

import { checkHealth } from "./api/healthApi";

function App() {
  const [message, setMessage] = useState("Checking API...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testApi = async () => {
      try {
        const data = await checkHealth();

        setMessage(data.message);
      } catch (error) {
        console.error(error);

        setMessage("API connection failed");
      } finally {
        setLoading(false);
      }
    };

    testApi();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg rounded-2xl bg-white p-10 shadow-xl border border-slate-200 text-center">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-slate-900">
            ShopPulse
          </h1>

          <p className="mt-2 text-slate-500">
            Event-aware e-commerce platform
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-5">
          <p className="text-sm text-slate-500">
            Backend Status
          </p>

          <p className="mt-2 text-lg font-semibold text-green-600">
            {loading ? "Connecting..." : message}
          </p>
        </div>
      </div>
    </main>
  );
}

export default App;