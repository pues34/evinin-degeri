import { redirect } from "next/navigation";

// Portföy artık Profil sayfasına taşındı
export default function PortfoyRedirect() {
    redirect("/profil");
}
