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
                        
                        Grab Tool - Allows you to grab tokens without accidentally painting spaces
                    </li>
                    <li className="popup-help-text">

                        Paint Tool - Select a color/image from the tile bar and click on a space to paint it
                    </li>
                    <li className="popup-help-text">
                    
                        Paint Tool - Select a color/image from the tile bar and click on any two spaces to paint everything
                        in between
                    </li>
                    <li className="popup-help-text">

                        Eraser Tool - Click any space to revert it back to being white
                    </li>
                </div>
            </div>
        </div>
        </>
    );
}