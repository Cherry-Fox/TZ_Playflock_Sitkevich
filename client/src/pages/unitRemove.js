import axios from "axios"
import React, { useState } from "react"
import { Link } from "react-router-dom"


export const UnitRemove = () => {
    const [ID, setID] = useState ('')

    const addNewUnit = (e) =>{
        const newUnit = {
            ID
        }
        return newUnit;
    
    }
    return (
        <div>
            <ul><output>Write ID unit you want remove</output></ul>
            <input
            value={ID}
            onChange = {e =>setID(e.target.value)}
            type = "text"
            placeholder = "ID"/>
            <button onClick={postCreate} > Remove this unit!
            </button>
            <ul><Link to = '/'> Unit list!</Link></ul>
            <ul><Link to = '/create'> Creatre new unit!</Link></ul>
            <ul><Link to = '/edit'> Edit unit on ID</Link></ul>

        </div>
    )

    async function postCreate (){
        const unit = addNewUnit ()
        axios.post ('/api/unit/remove', unit).catch(function(error){
            alert(error.response.data.error);
        })
    }
}