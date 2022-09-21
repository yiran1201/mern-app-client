import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  //add new todo item to database
  const [itemText, setItemText] = useState('');
  const [listItems, setListItems] = useState([]);
  const addItem = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5500/api/item', {
        item: itemText,
      });
      console.log(res);
      setItemText('');
    } catch (err) {
      console.log(err);
    }
  };

  //Create function to fetch all todo items from database -- we will use useEffect hook
  useEffect(() => {
    const getItemsList = async () => {
      try {
        const res = await axios.get('http://localhost:5500/api/items');
        setListItems(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getItemsList();
  }, []);

  //Delete item when click on delete
  const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5500/api/item/${id}`);
      console.log(res.data);
    } catch (err) {
      console.log(err);
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
        {listItems.map((item) => (
          <div className='todo-item'>
            <p className='item-content'>{item.item}</p>
            <button className='update-item'>Update</button>
            <button
              className='delete-item'
              onClick={() => {
                deleteItem(item._id);
              }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
