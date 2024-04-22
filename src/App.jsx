import { useState, useEffect } from "react";
import { Octokit } from "@octokit/core";
import "./styles/app.css";
import Search from "./components/Search";
import GithubCard from "./components/GithubCard";
import Alert from "./components/Alert";
import useProfile from "./hooks/useProfile";
import Moon from "./assets/moon";
import Sun from './assets/sun'

function App() {

  const { changeTheme, darkTheme, apiError } = useProfile()

  return (

        <div className="container-ppal">
          <div className="title-container">
            <h1>devfinder</h1>
            <div 
            onClick={changeTheme}
            className="light-container"
            >
              <p>{darkTheme === true ? 'Dark' : 'Light'}</p>
              {darkTheme === true ? <Moon/> : <Sun/>}
            </div>
          </div>

          <Search />

          { apiError.msg ? <Alert alert={{msg: apiError.msg, error: true}}/> : <GithubCard />}
          
          <p className="credits">Coded by <a href="https://github.com/misterdan100" target="_blank">Daniel Caceres "Mister Dan"</a></p>
        </div>

  );
}

export default App;
