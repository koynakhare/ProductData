import axios from "axios";
import Table from "./pages/table";
import { useState, useEffect } from "react";
import Updatedata from "./component/AddProduct/addProduct";
import { Switch, Route } from "react-router-dom";

import Form from "./component/AddProduct/addProduct";

function App() {
  return (
    <>
      <h1>hiii</h1>
      <Switch>
        <Route exact path="/update">
          {<Updatedata />}
        </Route>
        <Route exact path="/">
          {<Table />}
        </Route>
        {/* <Route exact path="/" >{<InitialSort />}</Route> */}
        <Route exact path="/form">
          {<Form />}
        </Route>
      </Switch>
    </>
  );
}

export default App;
