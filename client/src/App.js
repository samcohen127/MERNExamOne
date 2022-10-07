import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Form from './components/Form';
import PetList from './components/PetList';
import EditForm from './components/EditForm';
import PetDetails from './components/PetDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<PetList />} />
          <Route path='/form' element={<Form />} />
          <Route path='/petPage/:id' element={<PetDetails />} />
          <Route path='/edit/:id' element={<EditForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
