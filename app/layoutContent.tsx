"use client";


import Navbar from "@components/components/Navbar";
import Header from "@components/components/Header";
import { useSession } from "./context/SessionContext";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const isLoggedIn = !!session;

  return (
    <>
      <Header />
      {isLoggedIn && (
        <div className="fixed top-[67px] left-0 w-[240px] h-[calc(100vh-67px)] p-container border-r border-slate-containerColor">
          <Navbar />
        </div>
      )}
      <main className={isLoggedIn ? "ml-[250px]" : ""}>{children}</main>
    </>
  );
}