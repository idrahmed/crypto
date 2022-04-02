import React from "react";

const SelectButton = ({ children, selected, onClick }) => {
  const styles = {
    border: "1px solid #BB86FC",
    borderRadius: 5,
    padding: 8,
    paddingLeft: 15,
    paddingRight: 15,
    cursor: "pointer",
    backgroundColor: selected ? "#BB86FC" : "",
    color: selected ? "black" : "",
    hover: {
      backgroundColor: "#BB86FC",
      color: "black",
    },
    width: "22%",
    marginTop: 10,
  };

  return (
    <span onClick={onClick} style={styles}>
      {children}
    </span>
  );
};

export default SelectButton;
