import './App.css';
import React, { useState } from 'react'

function App() {

  const [items, setItems] = useState([
    { id: 1, name: "build more birds", done: false },
    { id: 2, name: "write angsty letter to mum and dad", done: false },
    { id: 3, name: "calm down", done: false },
    { id: 4, name: "talk to echo about yearbook", done: false }
  ]);
  
  const [newItem, setNewItem] = useState("")

  const handleItemInput = (event) => {
    setNewItem(event.target.value)
  }

  const saveNewItem = (event) => {
    event.preventDefault();
    const newItemObj = { id: Date.now(), name: newItem };
    const nextItems = [...items, newItemObj];
    setItems(nextItems);
    setNewItem("");
  }

  const completeItem = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, done: !item.done };
      }
      return item;
    });
    setItems(updatedItems);
  };
  
  const incompleteItems = items.filter(item => !item.done);
  const problemCount = incompleteItems.length;

  const listItems = items.map((item) => {
    const itemClassName = item.done ? "done" : "";
    const buttonContent = item.done ? "✅" : "Done!";
    return (
      <li key={item.id} className={itemClassName}>
        <span>{item.name}</span>
        <button onClick={() => completeItem(item.id)}>{buttonContent}</button>
      </li>
    )
  })

  return (
    <div className="App">
      <h1>Kate's Camp List</h1>


<h2>{problemCount ? `you got ${problemCount} problems Katie, work that shit out` : "you got 0 problems"}</h2>

      <hr></hr>

      <ul>
        {listItems}
      </ul>

      <form onSubmit={saveNewItem}>
        <label htmlFor="new-item">Add a new item:</label>
        <input id="new-item" type="text" onChange={handleItemInput} value={newItem} required={true} />
        <input type="submit" value="Save New Item" />
      </form>
    </div>
  );
}

export default App;