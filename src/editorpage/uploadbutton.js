import React, { useRef } from 'react'

const UploadButton = ({name, imgCB}) =>{
    const upRef = useRef();

    const buttonClick = () =>{
        upRef.current.click();
    }

    const imgChange = (e) =>{
        if(e.target.files && e.target.files[0]){
            const img = e.target.files[0];
            imgCB(img);
        }
    }

    return(
        <>
            <button className={name} onClick={buttonClick}>
                <img className="editor-upload-icon" src={require("../icons/upload-icon.png")}></img>
            </button>
            <input ref={upRef} type='file' accept=".jpg, .jpeg, .png" style={{display: 'none'}} onChange={imgChange}/>
        </>
    )
}

export default UploadButton;