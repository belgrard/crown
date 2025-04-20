import { t } from "@/lib/texts";
import RegisterPage from "./RegisterClient";

export const metadata = {
  title: t("register.title"),
};

export default function Page() {
  return <RegisterPage />;
}
