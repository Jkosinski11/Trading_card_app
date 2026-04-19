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
    <div>
      <h1>CARD SHOP</h1>
      <h2>Available Cards</h2>
      <div className="card-grid">
        {cards.map((card) => (
          <div key={card.id}>
            <img
              src={`http://localhost:3001${card.image_path}`}
              alt="Player Card"
              width="200"
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
