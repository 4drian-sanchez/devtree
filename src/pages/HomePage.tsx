import HandleForm from "../components/HandleForm";
import Header from "../components/Header";

export default function HomePage() {
  return (
    <div className="bg-home min-h-screen bg-no-repeat bg-slate-50">
        <Header/>
        
        <main className="max-w-4xl mx-auto py-10 mt-10 px-5">
          <div className="md:w-1/2 space-y-5">
            <h1 className="text-gray-800 text-6xl font-black">
              Todas tus <span className="text-cyan-500">redes sociales </span> en un enlace
            </h1>
            <p className="text-gray-700">Unete a más de 200 mil developers compartiendo sus redes sociales, comparte tu perfil de Tik Tok, Facebook, Instagram, Youtube, Github y más</p>

          <HandleForm/>

          </div>
        </main>
    </div>
  );
};