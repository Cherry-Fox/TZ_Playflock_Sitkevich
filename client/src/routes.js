import React from 'react'
import { Routes ,Route} from 'react-router-dom'
import {UnitList} from './pages/unitList'
import { CreateUnit } from './pages/unitCreate'

export const useRoutes = () => {
    return (
        <Routes> 
            { <Route path = "/" exact>
            <UnitList/>
            </Route> }
            <Route path = "/create" exact>
            <CreateUnit/>
            </Route>
            <Route path = "/edit" exact>
            <editPage/>
            </Route>
            <Route path = "/attack" exact>
            <attackPage/>
            </Route>
            <Route path = "/remove" exact>
            <removePage/>
            </Route>
        </Routes>
    )
}