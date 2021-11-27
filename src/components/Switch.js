import React from "react";
import styled from "styled-components";

const Checkbox = styled.input.attrs({
  type: "checkbox",
})`
  :checked {
    right: 0;
  }
`;

export default function Switch(props) {
  return (
    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
      <Checkbox
        id="toggle"
        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        {...props}
      />
      <label
        htmlFor="toggle"
        className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
      ></label>
    </div>
  );
}
