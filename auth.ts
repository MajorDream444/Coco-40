/**
 * MVP auth stub.
 * In dev, pass x-user-id. If missing, defaults to demo-user.
 */
export async function requireUserId(req: Request): Promise<string> {
  return req.headers.get("x-user-id") || "demo-user";
}
