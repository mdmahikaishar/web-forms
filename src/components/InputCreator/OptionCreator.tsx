"use client";
import { useRef } from "react";
import { BiPlus, BiX } from "react-icons/bi";
import InputCreatorField from "./InputCreatorField";

interface IOptionCreator {
  error?: string,
  options: string[],
  setOptions: React.Dispatch<React.SetStateAction<string[]>>
}

export default function OptionCreator({ error, options, setOptions }: IOptionCreator) {
  const value = useRef({} as HTMLInputElement);

  const handleOnAdd = () => {
    const data = value.current.value.trim();
    if (!data) return;

    // IF `data` exists, THEN PASS    
    setOptions(pre => pre.find(item => item === data) ? pre : [...pre, data]);

    value.current.value = "";
  }

  const handleOnRemove = (value: string) => {
    return () => setOptions(pre => pre.filter(item => item !== value))
  }

  return (
    <>
      {/* Creator */}
      <div className="flex items-end gap-4">
        <InputCreatorField name="Option Name" ref={value}/>
        <button
          className="flex-none h-10 w-10 grid place-items-center text-xl font-semibold bg-green-500/50"
          type="button"
          onClick={handleOnAdd}
        >
          <BiPlus />
        </button>
      </div>

      {/* Selected */}
      <div className="w-full flex flex-col gap-1">
        <h3 className="mb-1 font-semibold text-sm">Added Options</h3>
        
        {options.map(item => (
          <div className="flex items-center gap-1 hover:bg-white/10 cursor-pointer" key={item}>
            <span className="w-full h-10 px-4 flex items-center text-sm bg-white/10">{item}</span>
            <button
              className="flex-none h-10 w-10 grid place-items-center text-xl font-semibold bg-red-500/50 hover:bg-red-500/100"
              type="button"
              onClick={handleOnRemove(item)}
            >
              <BiX />
            </button>
          </div>
        ))}

        {options.length === 0 && (
          <div className="flex items-center gap-1 cursor-pointer">
            <span className="w-full h-10 px-4 flex items-center justify-center text-sm font-semibold bg-white/10">No options is added.</span>
          </div>
        )}

        {error && (
          <div className={"text-right"}>
            <div className={"text-xs font-semibold text-red-500/50"}>{error}</div>
          </div>
        )}
      </div>
    </>
  )
};