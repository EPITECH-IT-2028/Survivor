"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import RoleCombobox from "./RoleCombobox";
import { toast } from "sonner";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    title: string;
    description: string;
  } | null>(null);
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    if (message) {
      toast[message.type](message.title, {
        description: message.description,
      });
    }
  }, [message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
          role: role,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage({
          type: "success",
          title: "Registered successfully!",
          description: "",
        });
        setName("");
        setPassword("");
        setEmail("");
        setRole("");
        login(data.token);
        router.push("/");
      } else {
        setMessage({
          type: "error",
          title: "Registration failed",
          description: data.error || "Please try again.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        title: "An unknown error has occurred",
        description: error instanceof Error ? error.message : "",
      });
    }
  };
  return (
    <Card className="absolute top-1/2 left-1/2 w-[350px] -translate-1/2">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="registerName">Full name</Label>
              <Input
                id="registerName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="registerPassword">Password</Label>
              <Input
                id="registerPassword"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="registerEmail">Email</Label>
              <Input
                id="registerEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <RoleCombobox value={role} onValueChange={setRole} />
          </div>
        </CardContent>
        <CardFooter className="mt-6 flex flex-row items-end">
          <Button type="submit">Register</Button>
          <Button
            variant="link"
            className="mt-4"
            onClick={() => router.push("/login")}
          >
            Already have an account? Login
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
