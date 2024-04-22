import "../styles/search.css";
import useProfile from "../hooks/useProfile";
import Alert from "./Alert";
import { useState } from "react";

const Search = () => {
  const { inputText, setInputText, getInfoAPI, loading, help } = useProfile();
  const [alert, setAlert] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputText === "" || inputText.trim().includes(" ")) {
      setAlert({ msg: "Enter a valid username.", error: true });

      setTimeout(() => {
        setAlert({})
      }, 3000);
      return;
    }

    setAlert({});
    getInfoAPI(inputText.trim());
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="search-container">
        {loading ? (
          <div className="container-spinner search-icon">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 search-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        )}

        <input
          type="text"
          placeholder="Search GitHub username..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <button type="submit" className="input-button">
          Search
        </button>

      {help && (
        <div className="help">
        <p>Enter for example:   kentcdodds</p>
      </div>
      )}

        
      </form>

      {alert.msg && <Alert alert={alert} />}
    </>
  );
};

export default Search;
