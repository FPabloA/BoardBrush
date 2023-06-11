import "./helppopup.css"

export default function SavePopup ({closeCB}){

    return(
        <>
        <div className="popup-container">
            <div className="popup">
                <button className="popup-close-button" onClick={closeCB}>X</button>
                <span className="popup-title-text">Save Your Board</span>
                
                
            </div>
        </div>
        </>
    );
}