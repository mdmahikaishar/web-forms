"use client";
import { Bool } from "@/utils";
import { IInputField } from "../types";

export function InputFieldCheckbox(props: IInputField) {
  return (
    <div className="w-full p-1 grid grid-cols-2 gap-1 bg-white/10">
      {props.options?.map(item => {
        const id = props.id + item;
        const checked = props.selectionValue ? props.selectionValue.includes(item): undefined;

        return (
          <label 
            className={`h-10 px-4 flex items-center gap-2 bg-white/10 cursor-pointer hover:bg-white/20 ${
              checked ? "bg-white/30": ""
            }`}
            htmlFor={id}
            key={id}
          >
            <input
              className=""
              id={id}
              type="checkbox"
              name={props.name}
              disabled={props.disabled}
              defaultChecked={checked}
              onChange={(e) => props.onSelectionChange ? props.onSelectionChange(item, e.currentTarget.checked) : undefined}
            />
            <span className="text-sm">{item}</span>
          </label>
        )        
      })}
    </div>
  )
};

export function InputFieldRadio(props: IInputField) {
  return (
    <div className="w-full p-1 grid grid-cols-2 gap-1 bg-white/10">
      {props.options?.map(item => {
        const id = props.id + item;
        const checked = props.textValue ? props.textValue === item : undefined;

        return (
          <label
            className={`h-10 px-4 flex items-center gap-2 bg-white/10 cursor-pointer hover:bg-white/20 ${
              checked ? "bg-white/30": ""
            }`}
            htmlFor={id}
            key={id}
          >
            <input
              className=""
              id={id}
              type="radio"
              name={"checkbox"}
              disabled={props.disabled}
              defaultChecked={checked}
              onChange={(e) => props.onTextChange ? props.onTextChange(item) : undefined}
            />
            <span className="text-sm">{item}</span>
          </label>
        )
      })}
    </div>
  )
};