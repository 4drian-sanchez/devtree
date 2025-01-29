import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {

  return (
    <>
      <h1 className="text-white text-center font-bold text-4xl mt-10">Iniciar sesion</h1>
      <LoginForm/>
      <nav className="text-center mt-10">
        <Link className="text-white hover:underline font-bold" to={'/auth/register'}>¿No tienes una cuenta?</Link>
      </nav>
    </>
  );
};