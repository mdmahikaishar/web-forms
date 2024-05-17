"use client";
import { useRef, useState } from "react";
import { IInput } from "../../../types";
import InputField from "../../../components/InputField";
import InputCreator from "../../../components/InputCreator";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { ClientCookies } from "@/libs/clientCookies";
import { EmptyData } from "@/components/common";

export default function CreateFormPage() {
  const router = useRouter();
  const [fields, setFields] = useState<IInput[]>([]);
  const ref = {
    name: useRef({} as HTMLInputElement),
    describtion: useRef({} as HTMLInputElement),
  }

  const handleOnRemove = (index: number) => {
    return () => setFields(pre => pre.filter((_, idx) => idx !== index));
  }

  const handleOnCreate = (e: React.FormEvent) => {
    e.preventDefault();

    const token = ClientCookies.getToken();
    if (!token) return router.push("/auth/login");

    api.forms.createForm(token, ref.name.current.value, ref.describtion.current.value, fields)
      .then(() => router.push("/"));
  }

  return (
    <>
      <div className="grow p-8 scrollY">
        <div className="mx-auto max-w-sm w-full">
          {/* FORMS HEADING */}
          <div className="mb-8 w-full">
            <input
              className="mb-2 w-full text-center text-3xl font-semibold bg-transparent outline-none"
              type="text"
              placeholder="Untitled Form"
              defaultValue={"Untitled Form"}
              ref={ref.name}
            />
            <input
              className="w-full text-center text-sm font-semibold text-white/40 bg-transparent outline-none"
              type="text"
              placeholder="Untitled form describtion."
              defaultValue={"Untitled form describtion."}
              ref={ref.describtion}
            />
          </div>

          {/* FORM FIELDS */}
          <form className="flex flex-col items-center gap-6">
            {fields.map((field, idx) => (
              <InputField {...field} onRemove={handleOnRemove(idx)} key={field.name} />
            ))}

            {fields.length ===0 && <EmptyData name="Empty Form" describtion="Add few fields to this form" />}

            {/* SUBMIT BUTTON */}
            {fields.length !== 0 && (
              <button
                className="w-full h-12 px-4 font-semibold text-sm bg-green-500/50"
                onClick={handleOnCreate}
              >
                Create Form
              </button>
            )}
          </form>
        </div>
      </div>

      <div className="flex-none w-full h-full max-w-sm p-8 flex flex-col gap-4 border-l-2 border-white/20 scrollY">
        <InputCreator onCreate={(data) => setFields(pre => [...pre, data])} />
      </div>
    </>
  )
}