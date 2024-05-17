"use client";
import {  BiX } from "react-icons/bi";
import { InputFieldTextArea, InputFieldBoolean, InputFieldSelect, InputFieldCheckbox, InputFieldRadio, InputFieldImage, InputFieldFile, InputFieldInput } from "./varaint";
import {  IInputFieldProps } from "./types";

export default function InputField({ onRemove, ...field }: IInputFieldProps) {
  return (
    <div className="w-full px-4 py-4 relative flex flex-col gap-2 border-2 border-white/10">
      <label className="font-semibold text-white" htmlFor={field.id}>{field.label}</label>
      {onRemove && (
        <button
          className="w-6 h-6 absolute right-2 top-2 grid place-items-center bg-red-500/10 hover:bg-red-500/50"
          type="button"
          onClick={onRemove}
        >
          <BiX />
        </button>
      )}

      {field.ty === "textarea" ? (
        <InputFieldTextArea {...field} />
      ): field.ty === "boolean" ? (
        <InputFieldBoolean {...field} />
      ): field.ty === "select" ? (
        <InputFieldSelect {...field} />
      ): field.ty === "checkbox" ? (
        <InputFieldCheckbox {...field} />
      ): field.ty === "radio" ? (
        <InputFieldRadio {...field} />
      ): field.ty === "image" ? (
        <InputFieldImage {...field} />
      ): field.ty === "file" ? (
        <InputFieldFile {...field} />
      ):(
        <InputFieldInput {...field} />
      )}
    </div>
  )
}