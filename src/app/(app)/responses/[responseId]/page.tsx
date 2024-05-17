import InputField from "@/components/InputField";
import api from "../../../../services/api";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FILE_FIELDS, SELECTION_FIELDS, TEXT_FIELDS } from "@/constances";
import FormPreviewer from "@/components/forms/FormPreviewer";

export default async function GetResponseByResponseIdPage({ params }: { params: {responseId: string }}) {
  const token = cookies().get("token");
  if (!token) return redirect("/auth/login");

  const response = await api.responses.getResponse(token.value, params.responseId);
  const myform = await api.forms.getForm(token.value, response.formId);

  return (
    <div className="grow p-8 scrollY">
      <FormPreviewer
        form={myform}
        disabled={true}
        renderItem={(field) => (
          <InputField
            {...field}
            textValue={TEXT_FIELDS.includes(field.ty) ? response.texts[field.id] : undefined}
            selectionValue={SELECTION_FIELDS.includes(field.ty) ? response.selections[field.id] : undefined}
            fileValue={FILE_FIELDS.includes(field.ty) ? response.files[field.id] : undefined}
            disabled={true}
            key={field.id}
          />
        )}
      />
    </div>
  )
}