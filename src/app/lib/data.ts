import { sql } from "@vercel/postgres";

export async function fetchTest() {
  try {
    const data = await sql`SELECT * FROM test;`;
    return data.rows;
  } catch (error) {
    console.error("Database Error", error);
    throw new Error(`Failed to fetch test data: ${error.message}`);
  }
}

export async function createTestUser(firstName: string, lastName: string) {
  try {
    const data = await sql`INSERT INTO test (first_name, last_name) VALUES (${firstName}, ${lastName}) RETURNING *;`;
    return data.rows[0];
  } catch (error) {
    console.error("Database Error", error);
    throw new Error(`Failed to create new user: ${error.message}`);
  }
}
