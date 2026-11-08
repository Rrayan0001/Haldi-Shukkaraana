import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type RsvpPayload = {
  name?: unknown;
  email?: unknown;
  attending?: unknown;
  guests?: unknown;
  events?: unknown;
  message?: unknown;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RsvpPayload;

    if (!body.name || typeof body.name !== "string" || !body.name.trim()) {
      return NextResponse.json(
        { ok: false, error: "Name is required." },
        { status: 400 },
      );
    }

    const entry = {
      name: body.name.trim(),
      email: typeof body.email === "string" ? body.email.trim() : "",
      attending: body.attending === "no" ? "no" : "yes",
      guests: Number(body.guests) || 1,
      events: Array.isArray(body.events) ? body.events.map(String) : [],
      message: typeof body.message === "string" ? body.message.trim() : "",
      submittedAt: new Date().toISOString(),
    };

    try {
      const directory = path.join(process.cwd(), "data");
      const file = path.join(directory, "rsvps.json");
      await fs.mkdir(directory, { recursive: true });

      let existing: unknown[] = [];
      try {
        const raw = await fs.readFile(file, "utf8");
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) existing = parsed;
      } catch {
        existing = [];
      }

      existing.push(entry);
      await fs.writeFile(file, `${JSON.stringify(existing, null, 2)}\n`, "utf8");
    } catch {
      /* falls back to accepting the RSVP without persisting */
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something went wrong." },
      { status: 500 },
    );
  }
}
