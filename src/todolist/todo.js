import React, { useState, useEffect } from "react";
import "./style.css";

const getLocaData = () => {
  const lists = localStorage.getItem("todolist");
  if (lists) {
    return JSON.parse(lists);
    //return JSON.parse(lists);//to change object to array
  }
  else return [];
}

const todo = () => {
  const [newItems, setNewItems] = useState("");
  //const [oldItems, setOldItems] = useState([]);
  const [oldItems, setOldItems] = useState(getLocaData());
  const [editId, setEditId] = useState("");
  const [toggleButton, settoggleButton] = useState(false);
  //console.log(oldItems);

  const setItem = () => {
    if (!newItems) {   //newItems === "  "
      alert("Plz fill the value..");
    }
    else if (newItems && toggleButton) {
      setOldItems(oldItems.map((elem) => {
        if (elem.id === editId) {
          return { ...elem, name: newItems };
        }
        return elem;
      }));
      setNewItems("");
      settoggleButton(false);
    }
    else {
      const updatedItems = {
        id: new Date().getTime().toString(),
        name: newItems,
        // date:Date()
      }


      // setOldItems([...oldItems, newItems]);
      setOldItems([...oldItems, updatedItems]);
      setNewItems("");
    }
  }

  //  delete item
  const deleteItem = (id) => {
    const data = oldItems.filter((elem) => {
      // if(!(elem.id===id)){    //if(elem.id!==id)
      //     return elem;
      // }
      return elem.id !== id
    })
    setOldItems(data);
  }

  //delete all items
  const deleteAll = () => {
    setOldItems([]);
  }

  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(oldItems));

  }, [oldItems]);

  //edit item
  console.log(oldItems);
  const editItem = (index) => {
    //find()=>its return matching data and if is not match its return undefined
    // The find() method returns the value of the first element that passes a test. The find() //method executes a function for each array element. The find() method retuns undefined if //no elements are found.
    const editableItem = oldItems.find((Element, ind, array) => {
      return Element.id === index;
    });
    setNewItems(editableItem.name);
    setEditId(index);
    settoggleButton(true);
  };


  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src='./images/todo-list-icon.jpg' alt='todo_logo' />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItem">
            <input
              type="text"
              placeholder=" ✍ Add Item"
              className="form-control" value={newItems}
              onChange={(event) => setNewItems(event.target.value)}
            />
            {/* <i className="fa fa-plus add-btn" onClick={setItem}></i> */}
            {
              toggleButton ? <i className="fa fa-edit add-btn" onClick={setItem} ></i>
                : <i className="fa fa-plus add-btn" onClick={setItem}></i>
            }
          </div>
          
    {/*    show items */}
          <div className="showItems" >
            {
              oldItems.map((e) => {
                return (
                  <div className="eachItem" key={e.id}>
                    <h3>{e.name}</h3>
                    {/* <h3>{e.date}</h3> */}
                    <div className="todo-btn">
                      <i className="far fa-edit add-btn" onClick={() => editItem(e.id)}></i>
                      <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(e.id)}></i>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="showItems">
            <button className="btn effect04" data-sm-link-text="Remove All" onClick={() => deleteAll()}>
              <span>CHECK LIST</span></button>
          </div>
        </div>
      </div>
    </>
  )
}
export default todo;









