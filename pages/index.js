import Timer from "../components/timer.js"; 
import Settings from "../components/settings.js"
import { useState } from "react";
import SettingsContext from "../components/contexts/settingscontext.js";

function App(){

    const [showSettings, setShowSettings] = useState(false); 
    const [workMinutes, setWorkMinutes]  = useState(45); 
    const [breakMinutes, setBreakMinutes] = useState(15); 

    return(
        
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
    
    ); 
}

export default App; 