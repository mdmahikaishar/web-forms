import EmptyData from "../common/EmptyData";

interface ICardSection<T> {
  name: string,
  data?: T[],
  renderItem: (item: T) => React.ReactNode,
}

export default function CardSection<T>({ name, data, renderItem }: ICardSection<T>) {
  return (
    <div className="">
      <div className="mb-4">
        <h3 className="text-sm font-semibold">{name}</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data?.map(item => renderItem(item))}
      </div>

      {data?.length === 0 && <EmptyData name="Nothing to show"/>}
    </div>
  )
}