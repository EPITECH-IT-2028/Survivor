export async function updateUserPassword(email: string, password: string) {
  try {
    if (!email || !password) {
      throw new Error("Missing email or password");
    }

    const response = await fetch("/api/auth/reset", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      status: 500,
      data: {
        error: "An unknown error has occurred",
        details: error instanceof Error ? error.message : "Unknown error",
      },
    };
  }
} 
