import { IForm, IInput } from "@/types";

interface IFormPreviewer { 
  form: IForm, 
  disabled?: boolean, 
  renderItem: (item: IInput) => React.ReactNode,
  onSubmit?: (e: React.FormEvent) => void
}

export default function FormPreviewer(props: IFormPreviewer) {
  return (
    <div className="mx-auto max-w-sm w-full">
      <div className="mb-8 w-full">
        <input
          className="mb-2 w-full text-center text-3xl font-semibold bg-transparent outline-none"
          type="text"
          placeholder="Untitled Form"
          defaultValue={props.form.name || "Untitled Form"}
          disabled={true}
        />
        <input
          className="w-full text-center text-sm font-semibold text-white/40 bg-transparent outline-none"
          type="text"
          placeholder="Untitled form describtion."
          defaultValue={props.form.describtion || "Untitled form describtion."}
          disabled={true}
        />
      </div>

      <form className="flex flex-col items-center gap-6" onSubmit={props.onSubmit}>
        {props.form.fields.map((field) => props.renderItem(field))}

        {!props.disabled && <button className="w-full h-12 px-4 font-semibold bg-green-500/50" type="submit">Submit</button>}
      </form>
    </div>
  )
}