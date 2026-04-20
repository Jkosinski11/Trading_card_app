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
      <div className="popup-inner" data-bs-theme="light">
        <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold mb-0 text-center">Edit Posting</h2>
        <button className= "btn-close" onClick={props.toggle}/>
        </div>

        <form onSubmit={handleEdit}>
        <div className="form-group">
          <label for="imageFile">
            Card Image:
            <img
              id = "imageFile"
              src = {`http://localhost:3001${props.card.image_path}`}
              alt = "player-card"
              width = "200"  
            />
          </label>
         </div>
        <div className="form-group">
          <label for = "description">
            Description:
            <input
              className="form-control"
              id ="description"
              type="text"
              value={text_desc}
              onChange={(e) => setText(e.target.value)}
            />
          </label>
          </div>
          <div className="form-group">
          <label for = "price">
            Price:
            <input
              id = "price"
              className="form-control"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          </div>
          <button className="btn btn-primary me-2" type="submit">Edit Card</button>
        </form>
      </div>
    </div>
  );
}

export default EditCard;
