import Timer from "./timer.js"; 
import Settings from "./settings.js"
import { useState } from "react";
import SettingsContext from "./settingscontext.js";

function App(){

    const [showSettings, setShowSettings] = useState(false); 
    const [workMinutes, setWorkMinutes]  = useState(45); 
    const [breakMinutes, setBreakMinutes] = useState(15); 

    return(
        <div> 
        <head>
            <title> Tomator Together </title>
        </head>
        <main> 
            <SettingsContext.Provider value={{
                showSettings: showSettings, 
                setShowSettings, setShowSettings, 
                workMinutes: workMinutes, 
                breakMinutes: breakMinutes,
                setWorkMinutes: setWorkMinutes, 
                setBreakMinutes: setBreakMinutes, // can use this values in settings and timer components
            }}>
                {showSettings ? <Settings /> : <Timer />}
                
            </SettingsContext.Provider>
        </main> 
        </div>
    ); 
}

export default App; 