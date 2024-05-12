import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
  const cookieStore = cookies();

  console.log("env", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("env2", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  return createServerClient(
    "https://uiutzgcaoapvkewarxyx.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpdXR6Z2Nhb2Fwdmtld2FyeHl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUzMzI1NzgsImV4cCI6MjAzMDkwODU3OH0.nzvo99T0YKLiVK5K3V0BhcPO1iTtsewsAbOMVguxmME",
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}
