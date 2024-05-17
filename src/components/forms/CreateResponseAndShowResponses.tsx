"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { IForm, TextsData, SelectionsData, FilesData, IResponseWithUser } from "@/types";
import InputField from "../InputField";
import Tab from "./Tab";
import FormPreviewer from "./FormPreviewer";
import { ClientCookies } from "@/libs/clientCookies";
import { BiUser } from "react-icons/bi";
import Link from "next/link";
import { EmptyData } from "../common";

export default function CreateResponseAndShowResponses({ form, disabled, showTab }: { form: IForm, disabled?: boolean, showTab?: boolean }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Form");
  const [responses, setResponses] = useState<IResponseWithUser[]>([]);
  const [texts, setTexts] = useState<TextsData>({});
  const [selections, setSelections] = useState<SelectionsData>({});
  const [files, setFiles] = useState<FilesData>({});

  const handleOnTextChange = (fieldId: string) => {
    return (value: string) => setTexts(pre => ({ ...pre, [fieldId]: value }));
  }
  const handleOnSelectionChange = (fieldId: string) => {
    return (name: string, selected: boolean) => {
      setSelections(pre => {
        const preValues = pre[fieldId] || [];

        const newValues = !selected
          ? preValues.filter(item => item !== name)
          : [...preValues, name];

        return ({ ...pre, [fieldId]: newValues })
      })
    }
  }
  const handleOnFileChange = (fieldId: string) => {
    return (files: File[]) => setFiles(pre => ({ ...pre, [fieldId]: files }));
  }

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const token = ClientCookies.getToken();
    if (!token) return router.push("/auth/login");

    api.responses.createResponse(token, form._id, texts, selections, files)
      .then(() => router.push("/"));
  }

  useEffect(() => {
    if (activeTab !== "Responses") return;

    const token = ClientCookies.getToken();
    if (!token) return router.push("/auth/login");
    
    api.responses.getFormResponses(token, form._id)
      .then((data) => setResponses(data));
  }, [activeTab]);

  return (
    <div className="mx-auto max-w-md grow p-8 flex flex-col gap-4 scrollYHidden">
      {showTab && (
        <Tab
          items={[ "Form", "Responses" ]} 
          active={activeTab}
          onClick={(name: string) => setActiveTab(name)}
        />
      )}

      {activeTab === "Form" ? (
        <FormPreviewer
          form={form}
          onSubmit={handleOnSubmit}
          disabled={disabled}
          renderItem={(field) => (
            <InputField
              {...field}
              onTextChange={handleOnTextChange(field.id)}
              onSelectionChange={handleOnSelectionChange(field.id)}
              onFileChange={handleOnFileChange(field.id)}
              disabled={disabled}
              key={field.id}
            />
          )}
        />
      ): (
        <div className="flex flex-col gap-2">
          {responses?.map(item =>(
            <Link className="px-4 py-4 flex items-center gap-4 bg-white/10 hover:bg-white/20 cursor-pointer" href={`/responses/${item._id}`} key={item._id}>
              <div className="w-20 h-20 grid place-items-center bg-white/10 rounded-full">
                <BiUser className="text-2xl" />
              </div>

              <div className="">
                <h3 className="mb-2 text-xl font-semibold">{item.userName}</h3>
                <span className="text-white/30">{item.userEmail}</span>
              </div>
            </Link>
          ))}

          {responses.length === 0 && <EmptyData name="Nothing to show." />}
        </div>
      )}
    </div>
  )
}