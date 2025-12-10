import { redirect } from "next/dist/client/components/navigation";

export default function ManageClassPage() {
    redirect("ManageClass/GeneralSettings");
}