import { getUserFromToken } from "@/lib/auth";

export default async function ProtectedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromToken();
  console.log(user);
  if (!user) {
    return <h1>Login is required to see this page</h1>;
  } else {
    return <>{children}</>;
  }
}
