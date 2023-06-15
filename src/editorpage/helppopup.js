import "./helppopup.css"

export default function HelpPopup ({closeCB}){

    return(
        <>
        <div className="popup-container">
            <div className="popup">
                <button className="popup-close-button" onClick={closeCB}>X</button>
                <span className="popup-title-text">Help</span>
                
                <div className="help-wrapper">
                    <li className="popup-help-text">
                        <img className="help-icon" src={require("../icons/save-icon.png")}></img>
                        Save Button - Saves the color, dimensions and rules associated with the current board
                    </li>
                    <li className="popup-help-text">
                    <img className="help-icon" src={require("../icons/paint-icon.png")}></img>
                        Paint Tool - Select a color/image from the tile bar and click on a space to paint it
                    </li>
                    <li className="popup-help-text">
                    <img className="help-icon" src={require("../icons/bucket-icon.png")}></img>
                        Paint Tool - Select a color/image from the tile bar and click on any two spaces to paint everything
                        in between
                    </li>
                    <li className="popup-help-text">
                    <img className="help-icon" src={require("../icons/rules-icon.png")}></img>
                        Rules Button - Add and manage the rules you want to be associated with the current board
                    </li>
                    <li className="popup-help-text">
                    <img className="help-icon" src={require("../icons/hidden-icon.png")}></img>
                        Hide Button - Toggle whether or not Tile/Token tabs are shown
                    </li>
                </div>
            </div>
        </div>
        </>
    );
}