import { useState, useEffect } from "react";
import DeleteCard from "./delete_card";
import EditCard from "./edit_card";


const MyCards = (e) => {
  const [cards, setCards] = useState([]);
  const currUser = JSON.parse(localStorage.getItem("currentUser"));
  const [editCard, setEditCard] = useState(false);
 
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/cards?user_id=${currUser.id}`,
        );
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
    
    <div className = "container mt-4">
      <h1 className="text-center">My Cards</h1>
      <div className="row">
        {cards.map((card) => (
          <div className= 'col-md-4 mb-4' key={card.card_id}>
            <div className="card h-100">
            <img
              src={`http://localhost:3001${card.image_path}`}
              alt="Player Card"
              className="card-img-top"
            />
            <div className = "card-body">
            <h5 className = "card-title">{card.description}</h5>
            <p className = "card-text">${card.price}</p>
            <button className="btn btn-danger me-2"
              onClick={() =>
                DeleteCard(
                  currUser,
                  card.card_id,
                  card.image_path,
                  cards,
                  setCards,
                )
              }
            >
              Delete
            </button>
            <button className = "btn btn-danger me-2"
              onClick={()=>setEditCard(card)} style={{ cursor: "pointer" }}>
      
              Edit
            </button>
            </div>
          </div>
          </div>
        ))}
      </div>
      {editCard ?( <EditCard toggle = {() => setEditCard(null)} card = {editCard}/>
      ):null}
    </div>
  );
};

export default MyCards;
