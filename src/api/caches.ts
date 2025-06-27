import { API_URL } from "./config";

export async function digCache(cacheId: number): Promise<{ found: boolean; message?: string }> {
  const res = await fetch(`${API_URL}/caches/${cacheId}/dig`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
}
