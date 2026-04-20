import { useEffect, useState } from "react";

const CardPage = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch("http://localhost:3001/cards");
        const data = await response.json();

        if (response.ok) {
          setCards(data.cards);
        } else {
          console.error("Failed to generate cards");
        }
      } catch (error) {
        console.error("Error Fetching Cards:", error);
      }
    };

    fetchCards();
  }, []);

  return (
    <div className = "container mt-4">
      <h1 className="title">CARD SHOP</h1>
      <h2 className="subTitle">Available Cards</h2>
      <div className="row">
        {cards.map((card) => (
          <div className= 'col-md-4 mb-4' key={card.card_id}>
            <img
              src={`http://localhost:3001${card.image_path}`}
              alt="Player Card"
              className="card-img-top"
            />
            <p>{card.description}</p>
            <p>${card.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardPage;
