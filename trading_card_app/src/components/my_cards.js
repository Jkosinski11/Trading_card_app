import { useState, useEffect } from "react";



const MyCards = (e) => {
  
  const [cards, setCards] = useState([]);
  const currUser = JSON.parse(localStorage.getItem("currentUser"));
    useEffect(() => {
      const fetchCards = async () => {
        try {
          const response = await fetch(`http://localhost:3001/cards?user_id=${currUser.id}`);
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
    }, [currUser.id]);
  return (
    <div>
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

export default MyCards;
