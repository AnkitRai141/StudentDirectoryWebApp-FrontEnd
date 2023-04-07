
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Component for Routes import
import StudentForm from './Components/StudentForm';
import SingleStudent from './Components/SingleStudent';
import EditStudent from './Components/EditStudent';
import StudentsTable from './Components/StudentsTable';
import RegistrationForm from './Components/RegistrationForm';

function App() {
  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StudentForm />} />
          <Route path='/studentsTable' element={<StudentsTable />} />
          <Route path='/student/:studentId' element={<SingleStudent />} />
          <Route path='/editStudent/:studentId' element={<EditStudent />} />
          <Route path='/registration' element={<RegistrationForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
