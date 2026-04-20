import { useState, useEffect } from "react";

function EditCard(props) {
     const [text_desc, setText] = useState("");
    const [price, setPrice] = useState("");

  useEffect(() => {
    if (props.card) {
      setText(props.card.description);
      setPrice(props.card.price);
    }
  }, [props.card]);

    const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/cards/${props.card.card_id}`, {
        method: "PUT",
         headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: text_desc,
            price: price,
          }),
        }
      );
      if (response.ok) {
        props.toggle();
        alert("success");
      } else {
        alert("Post failed");
      }
    } catch (error) {
      console.error("Card Post error:", error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Edit Posts</h2>
        <form onSubmit={handleEdit}>
          <label>
            Card Image:
            <img
              src = {`http://localhost:3001${props.card.image_path}`}
              alt = "player-card"
              width = "200"  
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              value={text_desc}
              onChange={(e) => setText(e.target.value)}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <button type="submit">Edit Card</button>
        </form>
        <button onClick={props.toggle}>Close</button>
      </div>
    </div>
  );
}

export default EditCard;
