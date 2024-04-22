import { createContext, useEffect, useState } from 'react'
import { Octokit } from "@octokit/core";

const ProfileContext = createContext()

const ProfileProvider = ({children}) => {



    const [inputText, setInputText] = useState('')
    const [userData, setUserData] = useState({})
    const [darkTheme, setDarkTheme] = useState(true)
    const [apiError, setApiError] = useState({})
    const [loading, setLoading] = useState(false)
    const [help, setHelp] = useState(false)

    const getInfoAPI = async (username) => {
      setLoading(true)
      setHelp(false)
      try {
        const octokit = new Octokit({
          auth: import.meta.env.VITE_API_KEY,
        });

        const {data} = await octokit.request("GET /users/{username}", {
          username: username,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        });

        if(data.name === null) {
          setApiError({msg: 'User not valid!'})
        } else {
          setUserData(data)
        }

      } catch (error) {
        setUserData({})
        if(error.status === 404) {
          setApiError({msg: 'User not found!'})
          setTimeout(() => {
            setApiError({})
          }, 3000);
        }
        console.log(error);
      }
      setLoading(false)
    };

    useEffect(() => {
      setTimeout(() => {
        if(!userData.name) {
          setHelp(true)
        }
      }, 4000);
    }, [])

    const changeTheme = () => {
      setDarkTheme(!darkTheme)

      const bodyTag = document.querySelector('body')
      darkTheme === false ? bodyTag.classList.add('dark') : bodyTag.classList.remove('dark')
    }

  return (
    <ProfileContext.Provider
        value={{
            inputText,
            setInputText,
            getInfoAPI,
            userData,
            changeTheme,
            darkTheme,
            apiError,
            loading,
            help
        }}
    >
        {children}
    </ProfileContext.Provider>
  )
}

export default ProfileProvider
export { ProfileContext }
