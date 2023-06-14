import "./editor.css"
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from "react";
import { ref , set } from "firebase/database";
import BoardSpace from './boardspace';
import ColorPopup from "./colorpicker";
import HelpPopup from "./helppopup";
import RulesPopup from "./rulespopup";
import SavePopup from "./savepopup";
import UploadButton from "./uploadbutton";
import { getDatabase } from "firebase/database";

const db = getDatabase();

export default function Editor({board, user, folders}) {
    const navigate = useNavigate();
    const tabList = ["Tiles", "Tokens"];

    useEffect (() =>{
        if(colorList.length === 0){
            fetchColors();
        }
        if(rulesList.length === 0){
            fetchRules();
        }
        
      }, []);

    const [boardGrid, setBoardGrid] = useState([]);

    const [activeTab, setActiveTab] = useState("Tiles");
    const [showColorPop, setShowColorPop] = useState(false);
    const [showHelpPop, setShowHelpPop] = useState(false);
    const [showRulesPop, setShowRulesPop] = useState(false);
    const [showSavePop, setShowSavePop] = useState(false);

    const [colorList, setColorList] = useState([]);
    const [currColor, setCurrColor] = useState("#FFFFFF");
    //stores colorlist in session so it persists w/ refreshes
    useEffect(() =>{
        if(colorList.length > 0){
          window.sessionStorage.setItem("colors", JSON.stringify(colorList));
        }
      }, [colorList]);

    const [tileImgList, setTileImgList] = useState([]);
    const [currTileImg, setCurrTileImg] = useState("");

    const [tokenImgList, setTokenImgList] = useState([]);
    const [currToken, setCurrToken] = useState("");
    const [numRows, setNumRows] = useState(() =>{
        if(board)
            return board.numRows
        else
            return 8
    });
    const [numCols, setNumCols] = useState(() =>{
        if(board){
            return board.numCols
        }
            
        else
            return 8
    });
    const [rulesList, setRulesList] = useState([]);
    //stores ruleslist in session so it persists w/ refreshes
    useEffect(() =>{
        if(rulesList.length > 0){
          window.sessionStorage.setItem("rules", JSON.stringify(rulesList));
        }
      }, [rulesList]);
    const [undoQueue, setUndoQueue] = useState([]);
    const [redoQueue, setRedoQueue] = useState([]);

    const [hideActive, setHideActive] = useState(false);
    const [activeTool, setActiveTool] = useState("paint");

    const [bucketPoints, setBucketPoints] = useState([]);

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
    const toolRef = useRef();
    toolRef.current = activeTool;
    const bucketPointRef = useRef();
    bucketPointRef.current = bucketPoints;

    

    const addUndo = () =>{
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
            const list = [...undoRef.current];
            const newBoard = list.pop();
            setBoardGrid([...newBoard]);
            setUndoQueue([...list]);
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
        temp[index] = <BoardSpace key={index} doColorCB={handleSpaceClick}
            row={row} col={col} color={colorRef.current} img={tileImgRef.current} 
            undoCB={addUndo} token={tokenImg} tokenDragCB={handleEditorTokenDragStart}
            tokenDropCB={handleTokenDrop} tokenDragEndCB={clearOldSpace}/>;
        setBoardGrid([...temp]);
    }
    const bucketColorSpaces = (row, col) =>{
        addUndo();
        let startRow = Math.min(row, bucketPointRef.current[0]);
        let startCol = Math.min(col, bucketPointRef.current[1]);
        let endRow = Math.max(row, bucketPointRef.current[0]);
        let endCol = Math.max(col, bucketPointRef.current[1]);

        const temp = [...boardRef.current];
        for(let i = startRow; i <= endRow; i++){
            for(let j = startCol; j <=endCol; j++){
                const ind = (i * numCols) + j;
                temp[ind] = <BoardSpace key={ind} doColorCB={handleSpaceClick}
                    row={i} col={j} color={colorRef.current} img={tileImgRef.current} 
                    undoCB={addUndo} token={temp[ind].props.token} tokenDragCB={handleEditorTokenDragStart}
                    tokenDropCB={handleTokenDrop} tokenDragEndCB={clearOldSpace}/>;
            }
        }
        setBoardGrid([...temp]);
        setBucketPoints([]);
    }
    const handleSpaceClick = (row, col, tokenImg) =>{
        if(toolRef.current === "paint"){
            colorSpaces(row, col, tokenImg);
        }
        else{
            if(bucketPointRef.current.length === 0)
                setBucketPoints([row, col]);
                else{
                    bucketColorSpaces(row, col);
                }
        }
    }

    //board frame functions
    const doFrame = () =>{
        const frameStyle = {gridTemplateColumns: "repeat("+numCols+", 1fr)",
                            gridTemplateRows: "repeat("+numRows+", 1fr)"};
        return(<>
        <div className="editor-board-frame" style={frameStyle}>
                    {renderBoard()}
                    {makeTabs()}
                </div>
        </>)
    }
    const renderBoard = () =>{
        if(boardGrid.length === 0 && board){
            let spaces = [];
            const loadedColors = JSON.parse(board.board);
            for(let i = 0; i < numRows; i++){
                for(let j = 0; j < numCols; j++){
                    const spaceColor = loadedColors[(i * numCols) + j]
                    spaces.push(<BoardSpace key={(i * numCols) + j} doColorCB={handleSpaceClick}
                    row={i} col={j} color={spaceColor} undoCB={addUndo} tokenDragCB={handleEditorTokenDragStart}
                    tokenDropCB={handleTokenDrop} tokenDragEndCB={clearOldSpace}/>);
                }
            }
            setBoardGrid([...spaces]);
            return spaces;
        }
        else if(numRows * numCols === boardGrid.length){
            return boardGrid;
        }
        else{
            let spaces = [];
            for(let i = 0; i < numRows; i++){
                for(let j = 0; j < numCols; j++){
                    spaces.push(<BoardSpace key={(i * numCols) + j} doColorCB={handleSpaceClick}
                    row={i} col={j} color={"#FFFFFF"} undoCB={addUndo} tokenDragCB={handleEditorTokenDragStart}
                    tokenDropCB={handleTokenDrop} tokenDragEndCB={clearOldSpace}/>);
                }
            }
            setBoardGrid([...spaces]);
            return spaces;
        }
        
    }
    const makeTabs = () =>{
        if(!hideActive){
            return (<>
            <div className="editor-tabs">
                {tabList.map(tab =>(
                    renderTabs(tab)
                ))}
            </div>
        </>)
        }
        
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
        let hideButton;
        if(hideActive)
            hideButton = <button className="editor-hide-button" onClick={toggleHideTabs}>hidden</button>
        else
            hideButton = <button className="editor-hide-button" onClick={toggleHideTabs}>hide</button>
        return(<>
        <div className="editor-color-display">
            {hideButton}
            <span className="editor-color-text">Active Color:</span>
            <div className="editor-active-color"
            style={{backgroundColor: currColor}}>
                <img className="editor-active-img" src={currTileImg}></img>
            </div>
        </div>
        
        </>);
    }

    const toggleHideTabs = () =>{
        setHideActive(!hideActive);
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
    const fetchColors = () =>{
        try{
            const val = window.sessionStorage.getItem("colors");
            if(val){
              setColorList(JSON.parse(val));
            }
          }catch(err){
            console.log("color error");
          }
    }

    //img tile button functions
    const tileImg = (img) =>{
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
    const fetchRules = () =>{
        try{
            const val = window.sessionStorage.getItem("rules");
            if(val){
              setRulesList(JSON.parse(val));
            }
          }catch(err){
            console.log("rule list error");
          }
    }

    //save button functions
    const toggleSavePop = () =>{
        setShowSavePop(!showSavePop);
    }
    const renderSavePop = () =>{
        if(showSavePop)
            if(board)
                return <SavePopup currFolder={board.folder} currName={board.name} closeCB={toggleSavePop} saveCB={doSave} folders={folders}/>
            else
                return <SavePopup currFolder={null} currName={null} closeCB={toggleSavePop} saveCB={doSave} folders={folders}/>
    }
    const makeColorJSON = () =>{
        const temp = [...boardRef.current];
        let boardColors = [];
            for(let i = 0; i < numRows; i++){
                for(let j = 0; j < numCols; j++){
                    boardColors.push(temp[i*numRows + j].props.color);
                }
            }
            return boardColors;
    }
    const doSave = (folder, boardName) =>{
        const path = 'users/' + user.uid + folder + boardName + '/'
        toggleSavePop();
        //need to enter something
        if(folder === "" || boardName === ""){
            window.alert("Make sure both fields are filled before trying to save")
            return;
        }
        const boardJSON = JSON.stringify(makeColorJSON());
        set(ref(db, 'users/' + user.uid +"/"+ folder +"/"+ boardName), {
            numRows: numRows,
            numCols: numCols,
            board: boardJSON
        }); 
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
        const index = (row * numCols) + col;
        const temp = [...boardRef.current]
        temp[index] = <BoardSpace key={index} doColorCB={handleSpaceClick}
            row={row} col={col} color={color} img={img} 
            undoCB={addUndo} token={""} tokenDragCB={handleEditorTokenDragStart}
            tokenDropCB={handleTokenDrop}/>;
        setBoardGrid([...temp]);
    }
    const handleTokenDrop = (row, col, color, img) =>{
        addUndo();
        const index = (row * numCols) + col;
        const temp = [...boardRef.current]
        temp[index] = <BoardSpace key={index} doColorCB={handleSpaceClick}
            row={row} col={col} color={color} img={img} 
            undoCB={addUndo} token={tokenRef.current} tokenDragCB={handleEditorTokenDragStart}
            tokenDropCB={handleTokenDrop} tokenDragEndCB={clearOldSpace}/>;
        setCurrToken("");
    }

    const setTool = (e) =>{
        setActiveTool(e.target.value)
        //console.log(activeTool)
    }



    return(<>
        <>
        <div className="editor-container">
            
            <div className="editor-tool-bar">
                <button className="editor-icon-button" onClick={toggleSavePop}>Save</button>
                <button className="editor-icon-button"
                onClick={goToLoad}
                >Load</button>

                <button className="editor-icon-button" value="paint" onClick={setTool}>Paint</button>
                <button className="editor-icon-button" value="bucket" onClick={setTool}>Bucket</button>

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
                {renderSavePop()}
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
