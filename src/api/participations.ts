import { API_URL } from "./config";

export async function joinHunt(huntId: number): Promise<{ success: boolean; message?: string }> {
  const res = await fetch(`${API_URL}/participations/${huntId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}
