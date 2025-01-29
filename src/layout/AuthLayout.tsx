import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function AuthLaout() {
  return (
    <main className="min-h-screen bg-slate-800 py-10">
      <div className="max-w-lg p-2 pt-5 mx-auto">
        <img src="/logo.svg" alt="Logo Dev Tree" />
      </div>

      <div className="max-w-3xl mx-auto">
        <Outlet />
      </div>
      <Toaster  position="top-right" richColors/>
    </main>
  );
};