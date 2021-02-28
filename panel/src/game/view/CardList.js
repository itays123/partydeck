import EditableCard from '../edit/EditableCard';

const CardList = ({ list, title }) => {
  return (
    <div className="card-list container mx-auto overflow-y-visible mt-4 px-2">
      <h3>
        <span className="font-bold text-2xl">{title} </span>
        <span className="font-thin text-gray-700 text-sm">{list.length}</span>
      </h3>
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-2 pb-6">
        {list.map((text, index) => (
          <EditableCard key={index} text={text} onTextChange={() => {}} />
        ))}
      </section>
    </div>
  );
};

export default CardList;
