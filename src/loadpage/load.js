import "./load.css";

function Load({loggedUser}) {
    const parseUser = () => {
        const ind = loggedUser.email.indexOf("@");
        return loggedUser.email.substring(0, ind);
    }

    return (
        <>
        <div className="wrapper">
        <div className="load-header">
            
            <span className="load-header-text">Load Boards</span>
            <span className="load-header-name">{parseUser()}</span>
        </div>
            <div className="load-recent">
                <div className="load-recent-header">
                    <span className="load-recent-text">Recent Boards</span>
                    <button className="load-recent-button" >
                        <span className="load-new-text">New Board</span> 
                        
                    </button>
                </div>
            </div>
            <div className="load-folders">
                <div className="load-folder-header">
                    <span className="load-recent-text">Folders</span>
                    <button className="load-recent-button">
                        <span className="load-new-text">Add Folder</span> 
                        
                    </button>
                </div>
            </div>
            <div className="load-footer">
                <button className="load-exit-button" >
                    <span className="load-exit-text">Exit</span>
                    
                </button>
            </div>
        </div>
            
        </>
    );
}
export default Load;