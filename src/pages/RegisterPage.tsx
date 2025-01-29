import { Link } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <>
      <h1 className="text-white text-center font-bold text-4xl mt-10">Crear cuenta</h1>
      <RegisterForm/>

      <nav className="text-center mt-10">
        <Link className="text-white hover:underline font-bold"  to={'/auth/login'}>¿Ya tienes una cuenta?</Link>
      </nav>
    </>
  );
};