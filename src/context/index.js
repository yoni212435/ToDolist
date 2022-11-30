import { useState, createContext } from "react";

export const dataContext = createContext();

export const DataProvider = ({ children }) => {

    const [search, setSearch] = useState("צבי ליאור");
    const [video, setVideo] = useState("https://www.youtube.com/watch?v=ePnH4JKKnBI");
    const [name, setName] = useState("אורח");


    function changeName(name) {
        setName(name);
    }
    return (
        <dataContext.Provider
            value={{
                setSearch,
                setVideo,
                setName,
                changeName,
                name,
                search,
                video,
            }}
        >
            {children}
        </dataContext.Provider>
    )
}