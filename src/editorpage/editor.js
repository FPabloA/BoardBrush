import "./editor.css"
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from "react";
import BoardSpace from './boardspace'
import ColorPopup from "./colorpicker";

export default function Editor({board}) {
    const navigate = useNavigate();

    const [showColorPop, toggleColorPop] = useState(false);
    const [colorList, setColorList] = useState([]);
    const [currColor, setCurrColor] = useState("#FFFFFF");
    const colorRef = useRef();
    colorRef.current = currColor;

    

    let immSpaces = [];

    

    const colorSpaces = (row, col) =>{
        console.log(colorRef.current);
        //need to fix this hardcode
        const index = (row * 8) + col;
        console.log("clicked " + row + ", " + col);
        immSpaces[index] = <BoardSpace key={index} doColorCB={colorSpaces}
            row={row} col={col} color={colorRef.current}/>;
        setBoardGrid([...immSpaces]);
        
    }

    const [boardGrid, setBoardGrid] = useState(() => {
        let spaces = [];
            for(let i = 0; i < 8; i++){
                for(let j = 0; j < 8; j++){
                    spaces.push(<BoardSpace key={(i * 8) + j} doColorCB={colorSpaces}
                    row={i} col={j} color={"#FFFFFF"}/>);
                }
            }
            immSpaces = spaces;
            return spaces;
    });


    const renderBoard = () =>{
        return boardGrid;
    }
 
    

    const goToLoad = () =>{
        navigate("/boardbrush/load");
    }

    const renderColors = (color, ind) =>{
        return <button className="editor-color-button"
        style={{backgroundColor: color}} value={color} onClick={onColorClick} key={ind}></button>
    }
    const onColorClick = (e) =>{
        console.log(e.target.value);
        setCurrColor(e.target.value);
    }

    const renderColorPop = () =>{
        if(showColorPop)
            return <ColorPopup colorCB={getColor}/>
    }
    const getColor = (color) =>{
        let temp = [...colorList];
        if(colorList.length > 8){
            console.log("called?")
            temp.shift()
        }
        temp.push(color);
        setColorList([...temp]);
        toggleColorPop(!showColorPop)
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
                {renderColorPop()}
                <div className="editor-tab-content">
                    {colorList.map((color, ind) => 
                        renderColors(color, ind)
                    )}
                            <button className="editor-color-button" 
                            onClick={() => toggleColorPop(!showColorPop)}>+</button>
                </div>
            </div>
        </div>
        
        </>
    </>);
}
