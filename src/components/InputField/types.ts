import { IInput } from "../../types";

export interface IInputField extends IInput {
  textValue?: string,
  selectionValue?: string[],
  fileValue?: any[],
  onTextChange?: (value: string) => void,
  onSelectionChange?: (name: string, value: boolean) => void,
  onFileChange?: (files: File[]) => void,
  disabled?: boolean;
}


export interface IInputFieldProps extends IInputField {
  onRemove?: () => void;
}
