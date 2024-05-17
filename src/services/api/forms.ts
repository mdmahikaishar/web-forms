import { IForm, IInput, IMyForm } from "@/types";
import server from "./server";

export  async function createForm(token: string, name: string, describtion: string, fields: IInput[]): Promise<any> {
  const result = await server.post("/api/forms")
    .body({ name, describtion, fields })
    .header("Authorization", token)
    .exec();

  return result.id;
}

export  async function getForm(token: string, formId: any): Promise<IForm> {
  const result = await server.get(`/api/forms/${formId}`)
    .header("Authorization", token)
    .exec();
  
  return result.form as IForm;
}

export  async function getMyForms(token: string): Promise<IMyForm[]> {
  const result = await server.get("/api/forms")
    .header("Authorization", token)
    .exec();

  return result.forms as  IMyForm[];
}