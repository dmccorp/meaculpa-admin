import React from "react";
import "../styles/modal.css";

export default function Modal({ allUsers = [], handleClose }) {
  const handleCloseClicked = () => {
    handleClose();
  };

  const userList = () => {
    return allUsers.map((user, index) => {
      return (
        <tr key={index}>
          <td className="user_name">{user.username}</td>
          <td className="user_mobile">{user.phonenumber}</td>
        </tr>
      );
    });
  };

  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close" onClick={handleCloseClicked}>
          &times;
        </span>
        <hr />
        <form>
          <table className="userlist_wrap">{userList()}</table>
        </form>
      </div>
    </div>
  );
}
