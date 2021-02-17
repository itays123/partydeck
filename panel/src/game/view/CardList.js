const CardList = ({ list, title }) => {
  return (
    <div className="card-list container mx-auto overflow-y-visible">
      <h3>
        {title} <span>{list.size}</span>
      </h3>
      <section className="grid">
        {list.map((text, index) => (
          <div key={`${text}:${index}`}>{text}</div>
        ))}
      </section>
    </div>
  );
};

export default CardList;
