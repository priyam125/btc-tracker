import './App.css';
import './index.css'
import React from 'react';
import Dashboard from './Dashboard';

const App = () => {



  return (
    <div className="flex justify-center h-screen w-screen bg-white pt-8">
      <div className="bg-white h-11/12 w-11/12 p-1 px-6">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
