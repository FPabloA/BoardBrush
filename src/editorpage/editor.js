import "./editor.css"
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import BoardSpace from './boardspace'

function Editor({board}) {
    const navigate = useNavigate();
    const [boardGrid, setBoardGrid] = useState([]);
    const [renderKey, setRenderKey] = useState(0);

    const renderBoard = () =>{
        if(boardGrid.length === 0){
            let spaces = [];
            let keyVal = renderKey;
            for(let i = 0; i < 8; i++){
                for(let j = 0; j < 8; j++){
                    spaces.push(<BoardSpace key={keyVal} doColorCB={colorSpaces}
                    row={i} col={j} color={"white"}/>);
                    keyVal++;
                }
            }
            setRenderKey(keyVal);
            setBoardGrid([...spaces]);   
        }
        console.log(boardGrid);
        return boardGrid;
        
    }

    const colorSpaces = (row, col) =>{
        //need to fix this hardcode
        const index = (row * 8) + col;
        console.log(boardGrid);
        // let newBoard = [...boardGrid];
        // newBoard[index] = <BoardSpace key={renderKey} doColorCB={colorSpaces}
        //     row={row} col={col} color={"black"}/>;
    }

    const goToLoad = () =>{
        navigate("/boardbrush/load");
    }

    return(<>
        <>
        <div className="editor-container">
            
            <div className="editor-tool-bar">
                <button className="editor-icon-button">save</button>
                <button className="editor-icon-button"
                onClick={goToLoad}
                >load?</button>
                
                <button className="editor-help-button">help</button>
            </div>
            <div className="editor-right-side">
                <div className="editor-header-bar">
                    <span className="editor-title">Board Editor</span>
                    <button className="editor-play-button">
                        <span className="editor-start-text">Start Game</span>
                        
                    </button>

                    <span className="editor-grid-text">Grid Size:</span>
                    
                    <input className='editor-size-input'></input>
                    <span className="editor-grid-text">X</span>
                    <input className='editor-size-input'></input>
                    

                    <span className="editor-code-text">Room Code:</span>
                    <span className="editor-code">1234</span>
                </div>
                <div className="editor-board-frame">
                    {renderBoard()}
                </div>
                
                <div className="editor-tab-content">
                            
                </div>
            </div>
        </div>
        
        </>
    </>);
}

export default Editor;