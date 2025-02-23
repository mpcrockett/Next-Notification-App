'use server';

export async function GET() {
  return new Response(JSON.stringify({ text: "Hello" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
