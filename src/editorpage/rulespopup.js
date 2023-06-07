import React, {useState} from "react";
import "./rulespopup.css"

function RulesPopup ({rules, closeCB}) {
    

    const [rulesList, setList] = useState(rules);
    const [currRule, setRule] = useState();

    const closeRules = () =>{
        closeCB(rulesList);
    }

    const onChangeRules = (e) =>{
        setRule(e.target.value);
    }

    const onAddButton = () =>{
        setList([...rulesList, currRule]);
        setRule('');
    }

    const removeRule = (e) =>{
        const ind = rulesList.indexOf(e.target.value)
        const newList = [...rulesList];
        newList.splice(ind, 1);
        setList(newList);
    }

    const makeRules = (item) =>{
        return (
            <>
            <div className="rule-entry-wrapper">
                <li className="popup-rule-text" >
                    {item}
                </li>
                <button className="remove-button" onClick={removeRule} value={item}>x</button>
            </div>
            
            </>
        )
    }

    return(
        <>
        <div className="popup-container">
            <div className="popup">
                <button className="popup-close-button" onClick={closeRules}>X</button>
                <span className="popup-title-text">Rules</span>
                <div className="rules-wrapper">
                {rulesList.map(item =>(
                    makeRules(item)
                ))}
                </div>
                <div className="input-wrapper">
                    <input type={"text"} value={currRule} onChange={onChangeRules} className="rules-entry"></input>
                <button className="add-button" onClick={onAddButton}>Add Rule</button>
                </div>
                
            </div>
        </div>
        </>
    );
    
}

export default RulesPopup;