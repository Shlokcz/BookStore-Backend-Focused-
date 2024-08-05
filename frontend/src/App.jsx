import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import CreateBooks from "./pages/CreateBooks";
import ShowBook from "./pages/ShowBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} ></Route>
      <Route path='/add' element={<CreateBooks />} ></Route>
      <Route path='/book/:id' element={<ShowBook />} ></Route>
      <Route path='/update/:id' element={<EditBook />} ></Route>
      <Route path='/delete/:id' element={<DeleteBook />} ></Route>
    </Routes>
  )
}

export default App;