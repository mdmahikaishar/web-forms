"use client";
import { useState } from "react";
import { IInputField } from "../types";
import { BiUpload, BiX } from "react-icons/bi";

export function InputFieldImage(props: IInputField) {
  const [file, setFile] = useState<File | undefined>();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files ? e.currentTarget.files[0]: undefined;
    if (!file) return;

    setFile(file);

    // TODO: Implement file reader.
    props.onFileChange && props.onFileChange([ file ]);
  }
  
  return (
    <div className="w-full h-48 p-1 bg-white/10">
      <div className="h-full relative bg-white/10">
        {file && <img className="w-full h-full object-cover" src={props.fileValue ? props.fileValue[0]: URL.createObjectURL(file)} /> }

        <label className="w-full h-full absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white/20" htmlFor={props.id}>
          <input 
            className="" 
            type="file" 
            name={props.name} 
            id={props.id} 
            accept="image/**" 
            onChange={handleOnChange}
            required={props.required}
            disabled={props.disabled}
            hidden
          />

          <BiUpload className="text-3xl" />
          <span className="text-xs font-semibold">Upload Image</span>
        </label>
      </div>     
    </div>
  )
};

export function InputFieldFile(props: IInputField) {
  const [files, setFiles] = useState<File[]>([]);

  const handleAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget?.files;
    if (!files) return;

    // FOR EACH, IF `file` exists THEN PASS
    setFiles(pre => {
      const data = [...pre, ...files].reduce(
        (acc, file) => acc.find(item => item.name === file.name) ? acc : [...acc, file],
        [] as File[]
      );
      
      // TODO: Implement file reader.
      props.onFileChange && props.onFileChange(data);

      return data;
    });

  }

  const handleRemoveFile = (name: string) => {
    return () => setFiles(pre => pre.filter(item => item.name !== name));
  }
  
  return (
    <div className="w-full p-1 flex flex-col gap-1 bg-white/10">
      <div className="h-48 relative bg-white/10">
        <label className="w-full h-full absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-white/20" htmlFor={props.id}>
          <input 
            className="" 
            type="file" 
            name={props.name}
            id={props.id}
            accept="**/**" 
            multiple={true} 
            hidden
            required={props.required}
            disabled={props.disabled}
            onChange={handleAddFile} 
          />

          <BiUpload className="text-3xl" />
          <span className="text-xs font-semibold">Upload File</span>
        </label>
      </div>

      <div className="flex flex-col gap-1">
        {!props.disabled && files.map(item => (
          <div className="h-10 pl-4 flex items-center justify-between bg-white/10 hover:bg-white/20">
            <span className="text-sm">{item.name}</span>
            
            <button 
              className="h-10 w-10 grid place-items-center bg-red-500/10 hover:bg-red-500/50"
              type="button"
              onClick={handleRemoveFile(item.name)}
            >
              <BiX className="text-xl" />
            </button>
          </div>
        ))}

        {props.disabled && props.fileValue?.map(item => (
          <div className="h-10 pl-4 flex items-center justify-between bg-white/10 hover:bg-white/20">
            <span className="text-sm">{item}</span>
          </div>
        ))}

        {files.length === 0 && (
          <div className="h-10 px-4 flex items-center justify-center bg-white/10">
            <span className="text-sm font-semibold">No file is uploaded.</span>
          </div>
        )}
      </div>    
    </div>
  )
};