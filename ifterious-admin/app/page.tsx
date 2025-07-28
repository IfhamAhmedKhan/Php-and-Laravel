"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    // Check for admin session (localStorage for now)
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "true") {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [router]);
  return null;
}
