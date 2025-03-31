import backendUrl from "./backend-url";

export async function postSignUp(data) {
  try {
    const response = await fetch(`${backendUrl}/api/auth/create/customer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("Response:", response);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error during sign-up:", error);
  }
}
