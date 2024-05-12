import { createClient } from "../utils/superbase/server";

export default async function Notes() {
  const supabase = createClient();
  const { data: notes } = await supabase.from("test").select();
  console.log("notes", notes);
  return null;
}
