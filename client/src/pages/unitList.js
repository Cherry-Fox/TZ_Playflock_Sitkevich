import React from "react"
import {useState} from 'react'
import axios from 'axios'
import {UnitItem} from '../component/UnitItem'
import { Link } from "react-router-dom"

export const UnitList = () => {

    const [unit, setUnit] = useState ([])
       
    return (
        <div className="row">
            <h1>Unit list!</h1>
            <div className="col s6 offset-s3"> </div>
            <ul className="collection with-header">
                {unit.map(unit=>
                    <UnitItem unit = {unit} key = {unit._id}/>)}
            </ul>
            <button className="blue darken-1" onClick={fetchList} > Update Unit!</button>
            <ul> <Link to = '/create'>Create new Unit</Link></ul>
            <ul> <Link to = '/edit'>Edit unit on ID!</Link></ul>
        </div>
    );
    async function fetchList (){
        const response = await axios.get ('api/unit/list')
        setUnit(response.data)
    }

}
