import { SelectionsData, FilesData, TextsData, IMyResponse, IResponseWithUser } from "@/types";
import server from "./server";


export  async function createResponse(token: string, formId: any, texts: TextsData, selections: SelectionsData, files: FilesData): Promise<any> {
  const result = await server.post("/api/responses")
    .body({ formId, texts, selections, files })
    .header("Authorization", token)
    .exec();

  return result.id;
}

export  async function getResponse(token: string, responseId: any): Promise<IResponseWithUser> {
  const result = await server.get(`/api/responses/${responseId}`)
    .header("Authorization", token)
    .exec();

  return result.response as IResponseWithUser;
}

export  async function getMyResponses(token: string): Promise<IMyResponse[]> {
  const result = await server.get("/api/responses")
    .header("Authorization", token)
    .exec();

  return result.responses as IMyResponse[];
}

export  async function getFormResponses(token: string, formId: string): Promise<IResponseWithUser[]> {
  const result = await server.get(`/api/responses/forms/${formId}`)
    .header("Authorization", token)
    .exec();

  return result.responses as IResponseWithUser[];
}