import CreateResponseAndShowResponses from "@/components/forms/CreateResponseAndShowResponses";
import api from "@/services/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function GetFormByFormIdPage({ params }: { params: { formId: string }}) {
  const token = cookies().get("token");
  if (!token) return redirect("/auth/login");

  const [form, user] = await Promise.all([
    api.forms.getForm(token.value, params.formId),
    api.auth.user(token.value)
  ]);

  
  return (
    <>
      <CreateResponseAndShowResponses
        form={form}
        showTab={form.userId === user?._id}
        disabled={form.userId === user?._id}
      />
    </>
  )
}