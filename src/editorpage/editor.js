import "./editor.css"
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from "react";
import BoardSpace from './boardspace'
import ColorPopup from "./colorpicker";
import HelpPopup from "./helppopup";

export default function Editor({board}) {
    const navigate = useNavigate();
    const tabList = ["Tiles", "Tokens", "Rules"];
    const [activeTab, setActiveTab] = useState("Tiles");
    const [showColorPop, setShowColorPop] = useState(false);
    const [showHelpPop, setShowHelpPop] = useState(false);
    const [colorList, setColorList] = useState([]);
    const [currColor, setCurrColor] = useState("#FFFFFF");
    const [numRows, setNumRows] = useState(8);
    const [numCols, setNumCols] = useState(8);

    const colorRef = useRef();
    colorRef.current = currColor;

    

    let immSpaces = [];

    

    const colorSpaces = (row, col) =>{
        console.log(colorRef.current);
        //need to fix this hardcode
        const index = (row * numCols) + col;
        immSpaces[index] = <BoardSpace key={index} doColorCB={colorSpaces}
            row={row} col={col} color={colorRef.current}/>;
        setBoardGrid([...immSpaces]);
        
    }

    const [boardGrid, setBoardGrid] = useState(() => {
        let spaces = [];
            for(let i = 0; i < numRows; i++){
                for(let j = 0; j < numCols; j++){
                    spaces.push(<BoardSpace key={(i * numCols) + j} doColorCB={colorSpaces}
                    row={i} col={j} color={"#FFFFFF"}/>);
                }
            }
            immSpaces = spaces;
            return spaces;
    });

    //board frame functions
    const doFrame = () =>{
        const frameStyle = {gridTemplateColumns: "repeat("+numCols+", 1fr)"};
        return(<>
        <div className="editor-board-frame" style={frameStyle}>
                    {renderBoard()}
                    {makeTabs()}
                </div>
        </>)
    }
    const renderBoard = () =>{
        if(numRows * numCols === boardGrid.length){
            return boardGrid;
        }
        else{
            let spaces = [];
            for(let i = 0; i < numRows; i++){
                for(let j = 0; j < numCols; j++){
                    spaces.push(<BoardSpace key={(i * numCols) + j} doColorCB={colorSpaces}
                    row={i} col={j} color={"#FFFFFF"}/>);
                }
            }
            immSpaces = spaces;
            setBoardGrid([...immSpaces]);
            return spaces;
            
        }
        
    }
    const makeTabs = () =>{
        return (<>
            <div className="editor-tabs">
                {tabList.map(tab =>(
                    renderTabs(tab)
                ))}
            </div>
        </>)
    }
    const renderTabs = (tab) =>{
        if(activeTab === tab){
            return <button className="editor-tab-active" id={tab}>{tab}</button>
        }
        else{
            return <button className="editor-tab" id={tab} onClick={onTabClick}>{tab}</button>
        }
    }
    const onTabClick = (e) =>{
        setActiveTab(e.target.id);
    }
 
    const goToLoad = () =>{
        navigate("/boardbrush/load");
    }

    const renderTabContent = () =>{
        if(activeTab === "Tiles"){
            let list = colorList.map((color, ind) => 
            renderColors(color, ind));
            const addButton = <button className="editor-color-button" 
            onClick={() => setShowColorPop(!showColorPop)}>+</button>;
            return [...list, addButton];
        }
    }

    //color button functions
    const renderColors = (color, ind) =>{
        return <button className="editor-color-button"
        style={{backgroundColor: color}} value={color} onClick={onColorClick} key={ind}></button>
    }
    const onColorClick = (e) =>{
        console.log(e.target.value);
        setCurrColor(e.target.value);
    }

    //color picker functions
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
        setShowColorPop(!showColorPop)
    }

    //help button functions
    const toggleHelpPop = () =>{
        setShowHelpPop(!showHelpPop);
    }
    const renderHelpPop = () =>{
        if(showHelpPop)
            return <HelpPopup closeCB={toggleHelpPop}/>;
    }

    const handleRowChange = (e) =>{
        if(!isNaN(e.target.value)){
            setNumRows(e.target.value);
        }
        return;
    }
    const handleColChange = (e) =>{
        if(!isNaN(e.target.value)){
            setNumCols(e.target.value);
        }
        return;
    }

    return(<>
        <>
        <div className="editor-container">
            
            <div className="editor-tool-bar">
                <button className="editor-icon-button">save</button>
                <button className="editor-icon-button"
                onClick={goToLoad}
                >load?</button>
                
                <button className="editor-help-button" onClick={toggleHelpPop}>help</button>
            </div>
            <div className="editor-right-side">
                <div className="editor-header-bar">
                    <span className="editor-title">Board Editor</span>
                    <button className="editor-play-button">
                        <span className="editor-start-text">Start Game</span>
                        
                    </button>

                    <span className="editor-grid-text">Grid Size:</span>
                    
                    <input className='editor-size-input'
                    type="text" onChange={handleRowChange} value={numRows}></input>
                    <span className="editor-grid-text">X</span>
                    <input className='editor-size-input'
                    type="text" onChange={handleColChange} value={numCols}></input>
                    

                    <span className="editor-code-text">Room Code:</span>
                    <span className="editor-code">1234</span>
                </div>
                {doFrame()}
                {renderHelpPop()}
                {renderColorPop()}
                <div className="editor-tab-content">
                    {
                    renderTabContent()
                    }
                </div>
            </div>
        </div>
        
        </>
    </>);
}
