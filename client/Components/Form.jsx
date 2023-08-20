import React from "react";

const Form = ({ state, setState, handleSend, placeholder }) => {
  return (
    <form className="flex gap-5">
      <input
        type="text"
        value={state}
        placeholder={placeholder}
        onChange={(e) => {
          setState(e.target.value);
        }}
        className="px-5 py-2 rounded-full text-gray-900  "
      />
      <button
        className="px-5 py-2 rounded-full bg-yellow-500 hover:bg-yellow-600"
        type="submit"
        onClick={handleSend}
      >
        Send
      </button>
    </form>
  );
};

export default Form;
