export default function EmptyData({ name, describtion }: { name: string, describtion?: string }) {
  return (
    <div className="w-full h-32 flex flex-col text-center items-center justify-center gap-2 bg-white/10">
      <h3 className="text-2xl text-white/40">{name}</h3>
      {describtion && <span className="text-sm text-white/30">{describtion}</span>}
    </div>
  )
}