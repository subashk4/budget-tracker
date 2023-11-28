import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Error from './pages/404';
import { PropertyList, PropertyDetail, AddPropertyForm } from './components';
import RequireAuth from './RequireAuth';

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route
          path='/dashboard'
          element={
            <RequireAuth redirectTo='/login'>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path='/property'
          element={
            <RequireAuth redirectTo='/login'>
              <PropertyList />
            </RequireAuth>
          }
        />
        <Route
          path='/property/:id'
          element={
            <RequireAuth redirectTo='/login'>
              <PropertyDetail />
            </RequireAuth>
          }
        />
        <Route
          path='/property/addProperty'
          element={
            <RequireAuth redirectTo='/login'>
              <AddPropertyForm />
            </RequireAuth>
          }
        />
        {/* <Route path='/dashboard' exact element={<Dashboard />} />
        <Route path='/property' exact element={<PropertyList />} />
        <Route path='/property/addProperty' exact element={<AddPropertyForm />} />
        <Route path='/property/:id' element={<PropertyDetail />} /> */}
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </>
  );
}

export default App;

//TODO: fix navbar issue
//Todo: fix routes issue. /property/property useNavigate didn't push to a new url, but an existing url
// todo: update state using spread operation in propertySlice
