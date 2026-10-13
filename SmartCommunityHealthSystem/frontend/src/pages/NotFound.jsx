import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center">
      <h1 className="text-7xl font-bold text-blue-600">404</h1>

      <p className="mt-4 text-xl text-slate-600">
        Page Not Found
      </p>

      <Link
        to="/"
        className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;