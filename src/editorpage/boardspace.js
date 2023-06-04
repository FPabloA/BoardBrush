function BoardSpace({doColorCB, row, col, color}){
    const handleClick = () =>{
        //console.log(doColorCB);
        doColorCB(row, col);
    }

    return(<>
        <div className="editor-board-space" onClick={handleClick} 
        style={{backgroundColor: color}}/>
    </>)
}

export default BoardSpace;