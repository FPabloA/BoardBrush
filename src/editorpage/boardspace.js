function BoardSpace({doColorCB, row, col, color, }){
    const handleClick = () =>{
        //console.log(doColorCB);
        doColorCB(row, col);
    }

    const tokenDragCB = (e) =>{
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
    }
    const handleDrop = (e) =>{
        e.preventDefault();
        const id = e
        .dataTransfer
        .getData('text');
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

        const dropzone = e.target;
        if(dropzone.hasChildNodes()){
            dropzone.removeChild(dropzone.firstChild);
        }
        dropzone.append(draggableElement);
    }

    return(<>
        <div className="editor-board-space" onClick={handleClick} 
        style={{backgroundColor: color}} onDragOver={handleDragOver}
        onDrop={handleDrop}/>
    </>)
}

export default BoardSpace;