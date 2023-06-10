import "./editor.css"
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from "react";
import BoardSpace from './boardspace';
import ColorPopup from "./colorpicker";
import HelpPopup from "./helppopup";
import RulesPopup from "./rulespopup";
import UploadButton from "./uploadbutton";

export default function Editor({board}) {
    const navigate = useNavigate();
    const tabList = ["Tiles", "Tokens"];

    const [boardGrid, setBoardGrid] = useState([]);

    const [activeTab, setActiveTab] = useState("Tiles");
    const [showColorPop, setShowColorPop] = useState(false);
    const [showHelpPop, setShowHelpPop] = useState(false);
    const [showRulesPop, setShowRulesPop] = useState(false);
    const [colorList, setColorList] = useState([]);
    const [currColor, setCurrColor] = useState("#FFFFFF");
    const [tileImgList, setTileImgList] = useState([]);
    const [currTileImg, setCurrTileImg] = useState("");
    const [tokenImgList, setTokenImgList] = useState([]);
    const [currToken, setCurrToken] = useState("");
    const [numRows, setNumRows] = useState(8);
    const [numCols, setNumCols] = useState(8);
    const [rulesList, setRulesList] = useState([]);

    const [undoQueue, setUndoQueue] = useState([]);
    const [redoQueue, setRedoQueue] = useState([]);

    const boardRef = useRef();
    boardRef.current = boardGrid;
    const colorRef = useRef();
    colorRef.current = currColor;
    const tileImgRef = useRef();
    tileImgRef.current = currTileImg;
    const undoRef = useRef();
    undoRef.current = undoQueue;
    const tokenRef = useRef();
    tokenRef.current = currToken;

    

    const addUndo = () =>{
        console.log("callling undo");
        const list = [...undoRef.current];
        if(undoRef.current.length >= 10){
            list.shift()
        }
        list.push(boardRef.current);
        setUndoQueue([...list])
    }
    const onUndo = () =>{
        if(undoRef.current.length > 0){
            addRedo()
            console.log(undoRef.current)
            const list = [...undoRef.current];
            const newBoard = list.pop();
            setBoardGrid([...newBoard]);
            setUndoQueue([...list]);
            console.log(undoRef.current);
        }
    }
    const addRedo = () =>{
        const list = [...redoQueue];
        if(redoQueue.length >= 5){
            list.shift()
        }
        list.push(boardGrid);
        setRedoQueue([...list])
    }
    const onRedo = () =>{
        if(redoQueue.length > 0){
            addUndo()
            const list = [...redoQueue];
            const newBoard = list.pop();
            setBoardGrid([...newBoard]);
            setRedoQueue([...list]);
        }
    }

    

    const colorSpaces = (row, col, tokenImg) =>{
        addUndo();
        const index = (row * numCols) + col;
        const temp = [...boardRef.current]
        temp[index] = <BoardSpace key={index} doColorCB={colorSpaces}
            row={row} col={col} color={colorRef.current} img={tileImgRef.current} 
            undoCB={addUndo} token={tokenImg} tokenDragCB={handleEditorTokenDragStart}
            tokenDropCB={handleTokenDrop} tokenDragEndCB={clearOldSpace}/>;
        setBoardGrid([...temp]);
        
    }

    //board frame functions
    const doFrame = () =>{
        const frameStyle = {gridTemplateColumns: "repeat("+numCols+", 1fr)",
                            gridTemplateRows: "repeat("+numCols+", 1fr)"};
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
                    row={i} col={j} color={"#FFFFFF"} undoCB={addUndo} tokenDragCB={handleEditorTokenDragStart}
                    tokenDropCB={handleTokenDrop} tokenDragEndCB={clearOldSpace}/>);
                }
            }
            setBoardGrid([...spaces]);
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
    const showActiveColor = () =>{
        return(<>
        <div className="editor-color-display">
            <span className="editor-color-text">Active Color:</span>
            <div className="editor-active-color"
            style={{backgroundColor: currColor}}>
                <img className="editor-active-img" src={currTileImg}></img>
            </div>
        </div>
        
        </>);
    }

    const renderTabContent = () =>{
        const undoSection = <>
        <div className="editor-undo-section">
            <button className="editor-_do-button" onClick={onUndo}>Undo</button>
            <button className="editor-_do-button" onClick={onRedo}>Redo</button>
        </div>
        </>;
        if(activeTab === "Tiles"){
            let colorArr = colorList.map((color, ind) => 
            renderColors(color, ind));
            let imgArr = tileImgList.map((img, ind) => 
            renderImgs(img, ind));
            const addButton = <button className="editor-color-button" 
            onClick={() => setShowColorPop(!showColorPop)}>+</button>;
            const uploadButton = <UploadButton name="editor-tile-upload" imgCB={tileImg}/>;
            return [...colorArr, addButton, ...imgArr, uploadButton, undoSection];
        }
        else if(activeTab === "Tokens"){
            let imgArr = tokenImgList.map((img, ind) => 
            renderTokens(img, ind));
            const uploadButton = <UploadButton name="editor-token-upload" imgCB={tokenImg}/>;
            return [...imgArr,uploadButton, undoSection];
            
        }
    }

    //color button functions
    const renderColors = (color, ind) =>{
        return <button className="editor-color-button"
        style={{backgroundColor: color}} value={color} onClick={onColorClick} key={ind}></button>
    }
    const onColorClick = (e) =>{
        setCurrColor(e.target.value);
        setCurrTileImg(null);
    }

    //img tile button functions
    const tileImg = (img) =>{
        console.log("in tile img")
        const imgURL = URL.createObjectURL(img);
        let temp = [...tileImgList];
        if(temp.length > 5){
            temp.shift();
        }
        temp.push(imgURL);
        setTileImgList([...temp]);
    }
    const renderImgs = (img, ind) =>{
        return <div className="editor-tileimg-button"
        key={ind} onClick={onTileImgClick}>
            <img className="editor-tile-img" src={img} ></img>
        </div>
    }
    const onTileImgClick = (e) =>{
        setCurrTileImg(e.target.src);
        setCurrColor(null);
    }

    //img token button functions
    const tokenImg = (img) =>{
        const imgURL = URL.createObjectURL(img);
        let temp = [...tokenImgList];
        if(temp.length > 10){
            temp.shift();
        }
        temp.push(imgURL);
        setTokenImgList([...temp]);
    }
    //idk dude try to just have the image without the div 
    const renderTokens = (img, ind) =>{
        return <img className="editor-tab-token" key={ind} value={img} src={img} onDragStart={handleEditorTokenDragStart}></img>
    }

    

    //color picker functions
    const toggleColorPop = () =>{
        setShowColorPop(!showColorPop)
    }
    const renderColorPop = () =>{
        if(showColorPop)
            return <ColorPopup colorCB={getColor} closeCB={toggleColorPop}/>
    }
    const getColor = (color) =>{
        let temp = [...colorList];
        if(colorList.length > 8){
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

    //rule button functions
    const toggleRulePop = (rules) =>{
        if(showRulesPop){
            setRulesList([...rules]);
        }
        setShowRulesPop(!showRulesPop);
    }
    const renderRulesPop = () =>{
        if(showRulesPop)
            return <RulesPopup rules={rulesList} closeCB={toggleRulePop}/>
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

    //token functions
    const handleEditorTokenDragStart = (e) =>{
        setCurrToken(e.target.src);
    }
    const clearOldSpace = (row, col, color, img) =>{
        console.log("clearing")
        const index = (row * numCols) + col;
        const temp = [...boardRef.current]
        temp[index] = <BoardSpace key={index} doColorCB={colorSpaces}
            row={row} col={col} color={color} img={img} 
            undoCB={addUndo} token={""} tokenDragCB={handleEditorTokenDragStart}
            tokenDropCB={handleTokenDrop}/>;
        setBoardGrid([...temp]);
    }
    const handleTokenDrop = (row, col, color, img) =>{
        addUndo();
        //console.log("handling drop");
        const index = (row * numCols) + col;
        const temp = [...boardRef.current]
        temp[index] = <BoardSpace key={index} doColorCB={colorSpaces}
            row={row} col={col} color={color} img={img} 
            undoCB={addUndo} token={tokenRef.current} tokenDragCB={handleEditorTokenDragStart}
            tokenDropCB={handleTokenDrop} tokenDragEndCB={clearOldSpace}/>;
        setBoardGrid([...temp]);
        setCurrToken("");
    }

    return(<>
        <>
        <div className="editor-container">
            
            <div className="editor-tool-bar">
                <button className="editor-icon-button">save</button>
                <button className="editor-icon-button"
                onClick={goToLoad}
                >load?</button>
                <button className="editor-func-button" onClick={toggleRulePop}>Rules</button>
                <button className="editor-func-button" onClick={toggleHelpPop}>help</button>
                {showActiveColor()}
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
                {renderRulesPop()}
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
