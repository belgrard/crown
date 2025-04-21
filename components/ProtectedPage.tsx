import { getUserFromToken } from "@/lib/auth";
import Box from "./common/Box";
import LoginForm from "./auth/LoginForm";
import { t } from "@/lib/texts";

export default async function ProtectedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromToken();

  if (!user) {
    return (
      <Box
        title={t("login.box.title")}
        description={t("login.box.description")}
      >
        <LoginForm />
      </Box>
    );
  } else {
    return <>{children}</>;
  }
}
