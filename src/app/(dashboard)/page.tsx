import { auth } from "@/auth";
import { protectServer } from "@/features/auth/utils";

export default async function Home() {
  const session = await auth();
  await protectServer();
  
  return (
    <>
      <main>Login</main>
      <p>{JSON.stringify(session)}</p>
    </>
  );
}
