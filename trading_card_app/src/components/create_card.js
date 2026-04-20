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
      <div className="popup-inner" data-bs-theme="light">
        <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold mb-0 text-center">Create Posting</h2>
        <button className= "btn-close" onClick={props.toggle}/>
        </div>
        <form onSubmit={handleCard}>
        <div className="form-group">
          <label for="imageFile">
            Card Image:
            <input
              className="form-control-file"
              id = "imageFile"
              type="file"
              accept="image/*"
              alt="player-image"
              onChange={(e) => setImage(e.target.files[0])}
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
          <button className="btn btn-primary me-2" type="submit">Post Card</button>
        </form>
      </div>
    </div>
  );
}

export default CreateCard;
