import React from "react";


export const UnitItem =(props) => {
    console.log (props);
    return (
        <div className="Unit">
            <strong> Name is {props.unit.name} </strong>
            <div>ID: {props.unit._id}</div>
            <div>Class is {props.unit.Class}</div>
            <div> HP = {props.unit.HP} </div>
            <div> Max HP = {props.unit.MaxHP} </div>
            <div> MP = {props.unit.MP}</div>
            <div> Max MP = {props.unit.MaxMP}</div>
            <div> Armor = {props.unit.Arrmor} </div>
            <div> mres = {props.unit.mRes}</div>
            <div> X = {props.unit.x}</div>
            <div> Y = {props.unit.y}</div>
            <div>Radius attack = {props.unit.Radius}</div>
            <div>Base damage = {props.unit.baseDmg}</div>
        </div>
    )
}
