function BoardSpace({doColorCB, row, col, color, img, undoCB, token, tokenDragCB, tokenDropCB, tokenDragEndCB}){
    const handleClick = () =>{
        //console.log(doColorCB);
        doColorCB(row, col, token);
    }

    // const tokenDragCB = (e) =>{
    //     e.dataTransfer.clearData();
    //     e.target.id = "boardtoken" + row + "" + col;
    //     e
    //     .dataTransfer
    //     .setData('text/plain', e.target.id);
    // }

    const handleDragEnd = () =>{
        //undoCB()
        // if(e.dataTransfer.dropEffect === 'none'){
        //     e.target.remove();
        // }
        tokenDragEndCB(row, col, color, img)
    }

    const handleDragStart = (e) =>{
        tokenDragCB(e);
    }

    const handleDragOver = (e) =>{
        e.preventDefault();
        e.stopPropagation()
    }
    const handleDrop = (e) =>{
        e.preventDefault();
        tokenDropCB(row, col, color, img);
    }

    const showImg = () =>{
        if(img)
            return <img className="editor-tile-img" src={img} draggable="false"></img>
    }

    const showToken = () =>{
        if(token)
            return <img className="editor-board-token" value={token} src={token} onDragStart={handleDragStart} onDragEnd={handleDragEnd}/>
    }

    return(<>
        <div className="editor-board-space" onClick={handleClick} 
        style={{backgroundColor: color}} onDragOver={handleDragOver}
        onDrop={handleDrop} draggable="false">
            {showImg()}
            {showToken()}
        </div>
    </>)
}

export default BoardSpace;