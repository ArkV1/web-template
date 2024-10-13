import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center">
        Welcome to Silicon Valley Garage
      </h1>
      <p className="text-lg sm:text-xl mb-10 text-center max-w-2xl">
        Your innovative project management platform. Collaborate, create, and
        conquer your next big idea.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          href="/login"
          className="btn btn-primary text-lg px-8 py-3 w-full sm:w-auto text-center"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="btn btn-secondary text-lg px-8 py-3 w-full sm:w-auto text-center"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
