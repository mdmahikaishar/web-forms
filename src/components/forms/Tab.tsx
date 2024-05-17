export default function Tab({ items, active, onClick }: { items: string[], active: string, onClick: (name: string) => void }) {
  return (
    <div className="mb-4 w-full flex gap-2">
      {items.map(item => (
        <button 
          className={`w-full h-10 flex items-center justify-center hover:bg-white/20 ${ active === item ? "bg-white/20": "bg-white/10"}`}
          type="button"
          onClick={() => onClick(item)}
          key={item}
        >
          <span className="text-sm font-semibold">{item}</span>
        </button>
      ))}
    </div>
  )
}