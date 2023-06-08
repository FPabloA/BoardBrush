function BoardSpace({doColorCB, row, col, color, img}){
    const handleClick = () =>{
        //console.log(doColorCB);
        doColorCB(row, col);
    }

    const tokenDragCB = (e) =>{
        e.dataTransfer.clearData();
        e.target.id = "boardtoken";
        e
        .dataTransfer
        .setData('text/plain', e.target.id);
    }
    const tokenDragEndCB = (e) =>{
        if(e.dataTransfer.dropEffect === 'none'){
            e.target.remove();
        }
    }

    const handleDragOver = (e) =>{
        e.preventDefault();
        e.stopPropagation()
    }
    const handleDrop = (e) =>{
        e.preventDefault();
        const id = e
        .dataTransfer
        .getData('text/plain');
        let draggableElement;
        if(id === 'editortoken'){
            draggableElement = document.getElementById(id).cloneNode(true);
        }
        else{
            draggableElement = document.getElementById(id);
        }
        draggableElement.className = "editor-board-token";
        draggableElement.addEventListener('dragstart', tokenDragCB, false);
        draggableElement.addEventListener('dragend', tokenDragEndCB, false);
        draggableElement.id = "";
        let dropzone = e.target;
        if(dropzone.hasChildNodes()){
            dropzone.removeChild(dropzone.firstChild);
        }
        if(dropzone.parentNode.className === "editor-board-space"){
            dropzone = dropzone.parentNode;
        }
        dropzone.append(draggableElement);
    }

    const showImg = () =>{
        if(img)
            return <img className="editor-tile-img" src={img} draggable="false"></img>
    }

    return(<>
        <div className="editor-board-space" onClick={handleClick} 
        style={{backgroundColor: color}} onDragOver={handleDragOver}
        onDrop={handleDrop} draggable="false">
            {showImg()}
        </div>
    </>)
}

export default BoardSpace;