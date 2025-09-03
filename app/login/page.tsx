"use client";

import { Button } from "@/components/ui/button";

interface fetchLoginProps {
  email: string;
  password: string;
}

async function fetchLogin({ email, password }: fetchLoginProps) {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
    });
    const data = await response.json();
    if (response.status != 200) {
      console.error(
        `API Response failed: ${response.status} ${response.statusText}\n`,
        `Cause: ${data.error}`,
      );
      return;
    }
    console.log("API Response:", data);
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "An unknown error has occured",
      error,
    );
  }
}

export default function Login() {
  return (
    <div className="absolute top-1/2 left-1/2 flex -translate-1/2 flex-col justify-center">
      <p className="font-instrument-serif text-4xl">login page.</p>
      <Button
        className="mt-4 cursor-pointer"
        variant="outline"
        onClick={() =>
          fetchLogin({
            email: "admin@jeb.com",
            password: "password",
          })
        }
      >
        Login
      </Button>
    </div>
  );
}
