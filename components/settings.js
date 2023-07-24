import ReactSlider from "react-slider";
import styles from  "../styles/slider.module.css"
import { useContext } from "react";
import SettingsContext from "./contexts/settingscontext";
import BackButton from "./buttons/backbutton";

function Settings(){

    const settingsInfo = useContext(SettingsContext); 

    return(
    
    <div style={{textAlign:'left'}}> 
    
        <label> Work Minutes: {settingsInfo.workMinutes} </label>
        <ReactSlider 

            className={styles.slider}
            thumbClassName={styles.thumb}
            trackClassName={styles.track}
            value={settingsInfo.workMinutes}
            onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
            // onChange={newValue => settingsInfo}
            min={1}
            max={120}
        />
        <label> Break Minutes: {settingsInfo.breakMinutes} </label>
        <ReactSlider 

            className={styles.slidergreen}
            thumbClassName={styles.thumbgreen}
            trackClassName={styles.track}
            value={settingsInfo.breakMinutes}
            onChange={newValue => settingsInfo.setBreakMinutes(newValue)}
            min={1}
            max={120}
        />

        <div style={{marginTop: '20px', textAlign:'center'}}>
            <BackButton onClick={() => {settingsInfo.setShowSettings(false)}}/>

        </div>

    </div>
    ); 


}

export default Settings; 