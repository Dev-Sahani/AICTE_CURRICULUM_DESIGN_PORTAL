import classNames from "classnames";

export default function Loading({
  containerClassName,
  cardClassName,
  count = 1,
  key,
}) {
  const ar = [];
  const cardClassNames = classNames(
    cardClassName,
    "animate-pulse w-full bg-gray-300 h-12 rounded"
  );

  for (let i = 0; i < count; i++)
    ar.push(<div key={i} className={cardClassNames} />);

  const containerClassNames = classNames(
    containerClassName,
    "flex flex-col gap-4 p-2"
  );

  return (
    <div className={containerClassNames} key={key ? key : Math.random() * 1000}>
      {ar}
    </div>
  );
}
