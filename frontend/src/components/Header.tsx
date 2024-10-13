"use client";

import Link from "next/link";
import { useAuthContext } from "@/app/auth/AuthProvider";

export default function Header() {
  const { user } = useAuthContext();

  return (
    <header className="bg-secondary py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Silicon Valley Garage</h1>
        <nav>
          <Link href="/" className="text-foreground hover:text-primary mr-4">Home</Link>
          <Link href="/catalog" className="text-foreground hover:text-primary mr-4">Catalog</Link>
          {user && (
            <>
              <Link href="/profile" className="text-foreground hover:text-primary mr-4">Profile</Link>
              <Link href="/admin" className="text-foreground hover:text-primary">Admin</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
