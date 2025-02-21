import React, { useState } from "react";

function CreateArea({ onAdd }) {
  const [note, setNote] = useState({
    title: "",
    content: "",
    amount: "",
    image: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote(prevNote => ({
      ...prevNote,
      [name]: value
    }));
  };

  const submitNote = (e) => {
    e.preventDefault();
    onAdd(note);
    setNote({
      title: "",
      content: "",
      amount: "",
      image: ""
    });
  };

  return (
    <div>
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <input
          name="amount"
          onChange={handleChange}
          value={note.amount}
          placeholder="Amount"
        />
        <input
          name="image"
          onChange={handleChange}
          value={note.image}
          placeholder="Image URL"
        />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;