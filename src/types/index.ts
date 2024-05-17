export type InputType = "text"
  | "number"
  | "email"
  | "date"
  | "time"
  | "textarea"
  | "boolean"
  | "select"
  | "checkbox"
  | "radio"
  | "image"
  | "file";

export interface IInput {
  id: string,
  name: string,

  ty: InputType,
  label: string,

  min?: number,
  max?: number,

  options?: string[],

  placeholder?: string,
  default?: string,

  required?: boolean,
}

export interface IUser {
  _id: any;
  name: string;
  email: string;
  password: string;
}

export interface IForm {
  _id: any;
  userId: any;
  name: string,
  describtion: string,
  fields: IInput[];
}

export type TextsData = Record<string, any>;
export type SelectionsData = Record<string, string[]>;
export type FilesData = Record<string, File[]>;

export interface IResponse {
  _id: any;
  userId: any;
  formId: any;
  texts: TextsData;
  selections: SelectionsData;
  files: FilesData;
}

export interface IMyResponse {
  _id: any;
  formId: string;
  formName: string;
  describtion: string;
}

export interface IMyForm {
  _id: string, 
  name: string,
  describtion: string,
  userId: string,
}

export interface IResponseWithUser extends IResponse {
  userName: string,
  userEmail: string,
}