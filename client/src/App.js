import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { UnitList } from './pages/unitList';
import { UnitCreate} from './pages/unitCreate'
import { UnitEdit } from './pages/unitEdit';
import { UnitAttack } from './pages/unitAttack';
import { UnitRemove } from './pages/unitRemove';

import 'materialize-css'




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path = "/" element = {<UnitList/>}></Route>
        <Route exact path = "/create" element = {<UnitCreate/>}></Route>
        <Route exact path = "/edit" element = {<UnitEdit/>}></Route>
        <Route exact path = "/attack" element = {<UnitAttack/>}></Route>
        <Route exact path = "/remove" element = {<UnitRemove/>}></Route>
      </Routes>
    </BrowserRouter>
    
  );
}


export default App;
 

