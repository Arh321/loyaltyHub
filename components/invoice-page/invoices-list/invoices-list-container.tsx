import InoiceListItem from "./invoice-list-item";

const InvoicesListContainer = () => {
  return (
    <div className="w-full flex flex-col gap-[12px]">
      {Array.from({ length: 10 }).map((item, index) => {
        return <InoiceListItem key={index} />;
      })}
    </div>
  );
};

export default InvoicesListContainer;
