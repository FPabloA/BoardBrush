import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css"
import "./colorpicker.css"

function ColorPopup({colorCB, closeCB}){
    const [color, setColor] = useColor("hex", "#121212");
  
    const handleAddColor = () =>{
        colorCB(color.hex);
    }

    return (
      <div className="colorpck-container">
        <button className="colorpck-close-button" onClick={closeCB}>x</button>
          <h1 className="colorpck-header">Choose a Color to Add!</h1>
          <ColorPicker width={456} height={228} inline={true}
                   color={color} 
                   onChange={setColor} hideHSV dark />
          <button className="colorpck-add-button" onClick={handleAddColor}>
            Add
          </button>
      </div>
    )
}

export default ColorPopup;