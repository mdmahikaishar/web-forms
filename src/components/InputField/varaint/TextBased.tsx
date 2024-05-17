"use client";
import { IInputField } from "../types"
import styles from "../InputField.module.scss"
import { Bool } from "@/utils";

export function InputFieldInput(props: IInputField) {
  return (
    <input 
      className={styles.input}
      type={props.ty}
      id={props.id}
      placeholder={props.placeholder}
      min={props.min}
      max={props.max}
      required={props.required}
      defaultValue={props.textValue || props.default}
      disabled={props.disabled}
      onChange={(e) => props.onTextChange ? props.onTextChange(e.currentTarget.value) : undefined}
      autoComplete="false"
    />
  )
};

export function InputFieldTextArea(props: IInputField) {
  return (
    <textarea
      className={styles.textarea + " py-3 max-h-32 scrollY"}
      id={props.id}
      placeholder={props.placeholder}
      required={props.required}
      defaultValue={props.textValue || props.default}
      disabled={props.disabled}
      onChange={(e) => props.onTextChange ? props.onTextChange(e.currentTarget.value) : undefined}
      autoComplete="false"
    ></textarea>
  )
};

export function InputFieldSelect(props: IInputField) {
  return (
    <select
      className={styles.select}
      defaultValue={props.textValue || props.default}
      disabled={props.disabled}
      onChange={(e) => props.onTextChange ? props.onTextChange(e.currentTarget.value) : undefined}
    >
      {props.options?.map(item => <option className={styles.selectOption} value={item} key={item}>{item}</option>)}
    </select>
  )
};

export function InputFieldBoolean(props: IInputField) {
  const id = props.id + "boolean-input";

  return (
    <div className="w-full h-12 p-1 gap-1 flex bg-white/10">
      <input
        className={styles.booleanInput}
        id={id}
        type="checkbox"
        name="boolean"
        defaultChecked={Bool.fromStr(props.textValue || "")}
        disabled={props.disabled}
        onChange={(e) => props.onTextChange ? props.onTextChange(e.currentTarget.checked ? "true" : "false") : undefined}
      />
      <label className={`${styles.booleanLabel} ${styles.booleanLabelTrue}`} htmlFor={id}>True</label>
      <label className={`${styles.booleanLabel} ${styles.booleanLabelFalse}`} htmlFor={id}>False</label>
    </div>
  )
};
