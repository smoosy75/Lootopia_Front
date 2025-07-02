import { API_URL } from "./config";

export interface LoginResponse {
  token: string;
  name?: string;
  role?: string;
}

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erreur de connexion");
  return data;
}

export async function register(
  email: string,
  password: string,
  nickname: string
): Promise<void> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, nickname }),
  });

  if (res.ok) return;

  // Lecture du corps une seule fois
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    const data = await res.json();
    throw new Error(data.message || "Erreur d'inscription");
  } else {
    const text = await res.text();
    throw new Error(text || "Erreur d'inscription");
  }
}
