import axios from "axios"
import { response } from "express"
import React, { useState } from "react"
import { Link } from "react-router-dom"
import updateList, { UnitList } from './unitList'
import unitList from "./unitList"

export const UnitCreate = () => {

    const [name, setName] = useState ('')
    const [Class, setClass] = useState ('')
    const [HP, setHP] = useState ('')
    const [MaxHP, setMaxHP] = useState ('')
    const [MP, setMP] = useState ('')
    const [MaxMP, setMaxMP] = useState ('')
    const [Arrmor, setArrmor] = useState ('')
    const [mRes, setMRes] = useState ('')
    const [x, setX] = useState ('')
    const [y, setY] = useState ('')



    const addNewUnit = (e) =>{
        const newUnit = {
            name,
            Class,
            HP,
            MaxHP,
            MP,
            MaxMP,
            Arrmor,
            mRes,
            x,
            y
        }
        return newUnit;
    
    }
    return (
        <div>
            <input
            value={name}
            onChange = {e =>setName(e.target.value)}
            type = "text"
            placeholder = "name"/>
             <input
            value={Class}
            onChange = {e =>setClass(e.target.value)}
            type = "text"
            placeholder = "Class"/>
             <input
            value={HP}
            onChange = {e =>setHP(e.target.value)}
            type = "number"
            placeholder = "HP"/>
             <input
            value={MaxHP}
            onChange = {e =>setMaxHP(e.target.value)}
            type = "number"
            placeholder = "Max HP"/>
             <input
            value={MP}
            onChange = {e =>setMP(e.target.value)}
            type = "number"
            placeholder = "MP"/>
             <input
            value={MaxMP}
            onChange = {e =>setMaxMP(e.target.value)}
            type = "number"
            placeholder = "Max MP"/>
             <input
            value={Arrmor}
            onChange = {e =>setArrmor(e.target.value)}
            type = "number"
            placeholder = "Arrmor"/>
             <input
            value={mRes}
            onChange = {e =>setMRes(e.target.value)}
            type = "number"
            placeholder = "Magic Resist"/>
             <input
            value={x}
            onChange = {e =>setX(e.target.value)}
            type = "number"
            placeholder = "X position"/> <input
            value={y}
            onChange = {e =>setY(e.target.value)}
            type = "number"
            placeholder = "Y position"/>
            <button onClick={postCreate} > Create new unit!
            </button>
            <Link to = '/'> Unit list</Link>
        </div>
    )

    async function postCreate (){
        const unit = addNewUnit ()
        unit.HP = parseInt(unit.HP);
        unit.MaxHP = parseInt(unit.MaxHP);
        unit.MP = parseInt(unit.MP);
        unit.MaxMP = parseInt(unit.MaxMP);
        unit.Arrmor = parseInt(unit.Arrmor);
        unit.mRes = parseInt(unit.mRes);
        unit.x = parseInt(unit.x);
        unit.y = parseInt(unit.y);
        axios.post ('/api/unit/create', unit).catch(function(error){
            console.log(response.data);
        })
        //window.location.reload();
    }
}