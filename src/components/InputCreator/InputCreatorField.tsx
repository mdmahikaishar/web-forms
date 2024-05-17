"use client";
import React from "react";

interface FieldOnChange {
  currentTarget: { value: string }
}

interface IInputCreatorField {
  type?: "text" | "select",
  name: string,
  placeholder?: string,
  options?: { name:string, value: string }[],
  required?: boolean;
  // error?: string;
  onValueChange?: (value: string) => void
}

const styles = {
  wrapper: "",
  label: "font-semibold text-sm text-white",
  input: "mt-2 h-10 w-full px-4 text-white bg-white/10 focus-within:bg-white/20",
  select: "mt-2 h-10 w-full px-3 text-white bg-white/10 focus-within:bg-white/20",
  option: "text-black",
}

function InputCreatorField(props: IInputCreatorField, ref: React.ForwardedRef<any>)  {
  const id = "input-creator-field_" + props.name.replace(" ", "-");

  const handleOnChange = <T extends FieldOnChange>(e: T) => {
    props.onValueChange && props.onValueChange(e.currentTarget.value)
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={id}>{props.name}</label>

      {props.type === "select" ? (
        <select className={styles.select} id={id} onChange={handleOnChange} ref={ref} >
          {props.options?.map(item => (
            <option className={styles.option} value={item.value} key={item.name}>{item.name}</option>
          ))}
        </select>
      ): (
        <input className={styles.input} id={id} placeholder={props.placeholder} autoComplete="false" required={props.required} onChange={handleOnChange} ref={ref} />
      )}
    </div>
  )
};

export default React.forwardRef(InputCreatorField);