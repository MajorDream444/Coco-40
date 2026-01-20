export function ok<T>(data: T) {
  return Response.json({ ok: true, data });
}

export function fail(code: string, message: string, details?: Record<string, any>, status = 400) {
  return Response.json({ ok: false, error: { code, message, details } }, { status });
}

export async function parseJsonSafely(req: Request) {
  try {
    return await req.json();
  } catch {
    return null;
  }
}
