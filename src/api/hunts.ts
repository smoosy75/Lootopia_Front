import { API_URL } from "./config";

export interface Hunt {
  id: number;
  title: string;
  description: string;
}

export interface Step {
  id: number;
  instruction: string;
}

export async function getHunts(): Promise<Hunt[]> {
  const res = await fetch(`${API_URL}/hunts`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!res.ok) throw new Error("Erreur lors de la récupération des chasses");
  return await res.json();
}

export async function getHuntSteps(huntId: number): Promise<Step[]> {
  const res = await fetch(`${API_URL}/hunts/${huntId}/steps`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!res.ok) throw new Error("Erreur lors de la récupération des étapes");
  return await res.json();
}
