import ProtectedPage from "@/components/ProtectedPage";
import { t } from "@/lib/texts";

export const metadata = {
  title: t("register.title"),
};

export default function Page() {
  return (
    <ProtectedPage>
      <div>naber</div>
    </ProtectedPage>
  );
}
