async function DeleteCard(currUser, cardId, image_path, cards, setCards) {
  try {
    const response = await fetch(`http://localhost:3001/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: currUser.id,
      }),
    });

    if (response.ok) {
      setCards(cards.filter((card) => card.card_id !== cardId));
    } else {
      alert("Card unable to be Deleted");
    }
  } catch (error) {
    console.error("Card deletion error:", error);
  }
}

export default DeleteCard;

