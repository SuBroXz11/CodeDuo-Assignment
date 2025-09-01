import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-base-100">
      <div className="card bg-base-200 shadow-xl p-8 max-w-lg w-full flex flex-col items-center">
        <h1 className="text-9xl font-extrabold text-error mb-4 animate-pulse">
          404
        </h1>
        <h2 className="text-4xl font-bold text-neutral-content mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-400 mb-6">
          Oops! The page you're looking for doesn't exist. It might have been
          moved or doesn't exist.
        </p>
        <Link
          to="/"
          className="btn btn-primary btn-wide rounded-full flex justify-center items-center"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
