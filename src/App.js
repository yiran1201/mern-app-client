import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

const ORIGIN = 'http://localhost:5500/api';

function App() {
  //add new todo item to database
  const [itemText, setItemText] = useState('');
  const [listItems, setListItems] = useState([]);

  //Create function to fetch all todo items from database -- we will use useEffect hook
  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    try {
      const res = await axios.get(`${ORIGIN}/items`);
      setListItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${ORIGIN}/item`, {item: itemText});
      console.log(res);
      setItemText('');
    } catch (err) {
      console.log(err);
    } finally {
      getItems();
    }
  };

  //Delete item when click on delete
  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`${ORIGIN}/item/${id}`);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      getItems();
    }
  };

  return (
    <div className='App'>
      <h1>Todo List</h1>
      <form className='form' onSubmit={(e) => addItem(e)}>
        <input
          type='text'
          placeholder='Add Todo Item'
          onChange={(e) => {
            setItemText(e.target.value);
          }}
          value={itemText}
        />
        <button type='submit'>Add</button>
      </form>
      <div className='todo-listItems'>
        {listItems.map((item, i) => (
          <div className='todo-item' key={i}>
            <p className='item-content'>{item.item}</p>
            <button className='update-item'>Update</button>
            <button
              className='delete-item'
              onClick={() => deleteItem(item._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
