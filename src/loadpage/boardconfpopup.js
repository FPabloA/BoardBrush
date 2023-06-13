function BoardConfPopup({board, deleteCB, closeCB}){
    const handleDel = () =>{
        deleteCB(board);
    }

    return(<>
    <div className="popup-bg-container">
        <div className="conf-content-box">
            <button className="popup-close-button" onClick={closeCB}>x</button>
            <h1>WARNING</h1>
            <div className="conf-warning-text">
                This action will PERMANENTLY delete this board. Are you sure you want to continue?
            </div>
            <button className="conf-button" onClick={handleDel}>YES</button>
            <button className="conf-button" onClick={closeCB}>NO</button>
        </div>
    </div>
    </>);
}

export default BoardConfPopup;