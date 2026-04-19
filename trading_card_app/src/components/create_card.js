import React, { useState } from "react";

function CreateCard(props) {
  const [img, setImage] = useState("");
  const [text_desc, setText] = useState("");
  const [price, setPrice] = useState("");
  const currUser = JSON.parse(localStorage.getItem("currentUser"));

  const handleCard = async (e) => {
    e.preventDefault();
    props.toggle();
    const formData = new FormData();
    formData.append("image", img);
    formData.append("description", text_desc);
    formData.append("price", price);
    formData.append("user_id", currUser.id);
    try {
      const response = await fetch("http://localhost:3001/create_card", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
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
        <h2>Create Posting</h2>
        <form onSubmit={handleCard}>
          <label>
            Card Image:
            <input
              type="file"
              accept="image/*"
              alt="player-image"
              onChange={(e) => setImage(e.target.files[0])}
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
          <button type="submit">Post Card</button>
        </form>
        <button onClick={props.toggle}>Close</button>
      </div>
    </div>
  );
}

export default CreateCard;
