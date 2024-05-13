import { createTestUser, fetchTest } from "../lib/data";

export default async function Page() {
  const handleCreateUser = async (firstName, lastName) => {
    try {
      const newUser = await createTestUser(firstName, lastName);
      console.log("newUser---", newUser);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const test = await fetchTest();
  console.log("test---", test);
  return (
    <div>
      {test.map((user, id) => {
        return (
          <div key={id}>
            {user.first_name} {user.last_name}
          </div>
        );
      })}
      <div>{/* <button onClick={handleCreateUser}>Create User</button> */}</div>
    </div>
  );
}
