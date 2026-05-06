import { json } from "@tanstack/react-start";

export function loader() {
  try {
    return json({
      status: "ok",
      timestamp: new Date().toISOString(),
    });
  } catch {
    return json({ status: "error" }, { status: 500 });
  }
}
