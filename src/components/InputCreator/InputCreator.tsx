"use client";
import React, { useRef, useState } from "react";
import InputCreatorField from "./InputCreatorField";
import OptionCreator from "./OptionCreator";
import { BOOLEAN_OPTIONS, DEFAULT_EXCLUDED_FIELDS, INPUT_TYPES, PLACEHOLDER_EXCLUDED_FIELDS, SELECTION_FIELDS } from "../../constances";
import { IInput, InputType } from "../../types";
import { generateRandomId, generateRandomName } from "../../libs";
import { Bool } from "../../utils";

interface IInputCreator {
  onCreate: (data: IInput) => void
}

interface IErrors {
  options?: string
}

export default function InputCreator({ onCreate }: IInputCreator) {
  const [inputType, setInputType] = useState<InputType>("text");
  const [options, setOptions] = useState<string[]>([]);
  const [errors, setErrors] = useState<IErrors>({})

  const ref = {
    ty: useRef({} as HTMLSelectElement),
    label: useRef({} as HTMLInputElement),
    placeholder: useRef({} as HTMLInputElement),
    min: useRef({} as HTMLInputElement),
    max: useRef({} as HTMLInputElement),
    options: useRef({} as HTMLInputElement),
    required: useRef({} as HTMLSelectElement),
    default: useRef({} as HTMLInputElement),
  };

  const extractFieldInformation = (): IInput => {
    return {
      id: generateRandomId(),
      name: generateRandomName(), 

      ty: ref.ty.current.value as InputType,
      label: ref.label.current.value,
      
      min: Number(ref.min?.current?.value) || undefined,
      max: Number(ref.max?.current?.value) || undefined,
      
      options:  options.length !== 0 ? options : undefined,

      placeholder: ref.placeholder?.current?.value || undefined,
      default: ref.default?.current?.value || "",
      
      required: Bool.fromStr(ref.required.current.value),
    }
  };

  const informationValidation = (data: IInput): boolean => {
    if (SELECTION_FIELDS.includes(data.ty) && (!data.options || (data.options && data.options.length === 0))) {
      setErrors({ options: "Minimum one option is required." });

      return false;
    };

    return true;
  };

  const resetState = () => {
    ref.label.current.value = "";
    ref.required.current.value = "true";
    ref.placeholder?.current && (ref.placeholder.current.value = "");
    ref.default?.current && (ref.default.current.value = "");
    setOptions([]);
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});

    const data = extractFieldInformation(); 
    if (!informationValidation(data)) return;    

    onCreate(data);

    resetState();
  };  
  
  return (
    <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
      <InputCreatorField
        name="Type"
        type="select"
        options={INPUT_TYPES}
        onValueChange={(value) => setInputType(value as InputType)}
        ref={ref.ty}
      />
      <InputCreatorField name="Label" required ref={ref.label}/>

      {!PLACEHOLDER_EXCLUDED_FIELDS.includes(inputType) && (
        <InputCreatorField name="Placeholder" ref={ref.placeholder}/>
      )}

      {inputType === "number" && (
        <div className="flex items-center gap-4">
          <InputCreatorField name="Min" ref={ref.min}/>
          <InputCreatorField name="Max" ref={ref.max}/>
        </div>
      )}
      
      {[...SELECTION_FIELDS, "radio", "select"].includes(inputType) && (
        <OptionCreator options={options} setOptions={setOptions} error={errors.options} />
      )}

      <InputCreatorField name="Required" type="select" options={BOOLEAN_OPTIONS} ref={ref.required} />

      {!DEFAULT_EXCLUDED_FIELDS.includes(inputType) && (
        <InputCreatorField name="Default" ref={ref.default} />    
      )}      

      <button className="h-10 w-full text-sm font-semibold bg-green-500/50" type="submit">Add Field</button>
    </form>
  )
}