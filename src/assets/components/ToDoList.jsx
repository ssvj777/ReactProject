import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";
import { MdAddBox } from "react-icons/md";
import Swal from "sweetalert2";

//function starts
const ToDoList = () => {
  //state for list contents
  let [items, setItems] = useState([
    { id: 1, label: "HTML5 & CSS3", checked: true },
    { id: 2, label: "JavaScript", checked: true },
    { id: 3, label: "React Js", checked: false },
    { id: 4, label: "Front-End Developer", checked: false },
  ]);

  // state for new list element
  let [newItems, setNewItems] = useState("");

  // state for add and save button
  let [isEdit, setIsEdit] = useState(false);

  //state for temporarily storing new list content
  let [editItemId, setEditItemId] = useState(null);

  // edit button function
  let editItem = (updateId) => {
    let editItemLabel = items.find((item) => item.id === updateId);
    setNewItems(editItemLabel.label);
    setIsEdit(true);
    setEditItemId(updateId);
  };

  // add and save button function
  // let handleAddSaveItem = () => {
  //   if (isEdit) {
  //     let saveItems = items.map((item) => {
  //       return item.id === updateItem ? { ...item, label: newItems } : item;
  //     });
  //     setItems(saveItems);
  //     setUpdateItem(null);
  //     setNewItems("");
  //     setIsEdit(false);
  //   } else {
  //     setItems([
  //       ...items,
  //       { id: items.length + 1, label: newItems, checked: false },
  //     ]);
  //     setNewItems("");
  //   }
  // };

  let handleAddSaveItem = () => {
    if (isEdit) {
      let saveItem = items.map((item) => {
        return item.id === editItemId ? { ...item, label: newItems } : item;
      });
      setItems(saveItem);
      setIsEdit(false);
      setNewItems("");
      setEditItemId(null);
    } else {
      if (newItems !== "") {
        setItems([
          ...items,
          { id: items.length + 1, label: newItems, checked: false },
        ]);
        setNewItems("");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "List Content can't be Empty!",
        });
      }
    }
  };

  // let handleAddSaveItem = () => {
  //   if (newItems !== "") {
  //     if (isEdit) {
  //       let saveItem = items.map((item) => {
  //         return item.id === updateItem ? { ...item, label: newItems } : item;
  //       });
  //       setItems(saveItem);
  //       setUpdateItem(null);
  //       setIsEdit(false);
  //       setNewItems("");
  //     } else {
  //       setItems([
  //         ...items,
  //         { id: items.length + 1, label: newItems, checked: false },
  //       ]);
  //       setNewItems("");
  //     }
  //   } else {
  //     alert("List item not to be empty");
  //   }
  // };

  // checkbox function
  let handleCheckbox = (id) => {
    let newListItem = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(newListItem);
  };

  //delete content function
  function deleteItem(deleteItemId) {
    let remainingItems = items
      .filter((item) => item.id !== deleteItemId)
      .map((item, index) => ({ ...item, id: index + 1 }));
    setItems(remainingItems);
  }

  return (
    <div className="toDoList">
      <div className="inputBox">
        {/* input box */}
        <input
          type="text"
          value={newItems}
          placeholder="Enter New List Content"
          onChange={(e) => {
            setNewItems(e.target.value);
          }}
        />

        {/* add and save button */}
        <div onClick={handleAddSaveItem}>
          {" "}
          {isEdit ? (
            <IoIosSave className="save" size={40} />
          ) : (
            <MdAddBox size={47} className="add" />
          )}
        </div>
      </div>

      <ul>
        {items.map((item) => {
          return (
            <li key={item.id} className="listItem">
              {/* checkbox */}
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => {
                  handleCheckbox(item.id);
                }}
              />

              {/* list content */}
              <label htmlFor=""> {item.label}</label>

              {/* edit button */}
              <FaEdit
                size={20}
                className="edit"
                onClick={() => editItem(item.id)}
              />

              {/* delete button */}
              <FaTrashAlt
                size={18}
                className="delete"
                onClick={() => {
                  deleteItem(item.id);
                }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ToDoList;
