import { API_URL } from "./config";

export interface UserProfile {
  name: string;
  email: string;
  role: string;
}

export async function getProfile(): Promise<UserProfile> {
  const res = await fetch(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!res.ok) throw new Error("Impossible de récupérer le profil");
  return await res.json();
}
