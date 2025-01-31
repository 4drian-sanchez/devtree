import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <Link to='/' className="max-w-lg p-2 pt-5">
            <img src="/logo.svg" className="w-full block" />
        </Link>
    );
};