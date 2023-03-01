import React, { useState } from 'react';
import Com from './Com';

const data = [
  {
    key: '1',
    name: 'John',
    age: 32,
    address: 'New York',
  },
  {
    key: '2',
    name: 'Jane',
    age: 28,
    address: 'London',
  },
  {
    key: '3',
    name: 'Jim',
    age: 35,
    address: 'Paris',
  },
];

function App() {
  return (
    <div className="App">
      <Com data={data} type={'pie'} />
      <Com data={data} type={'line'} />
      <Com data={data} type={'bar'} />
    </div>
  );
}

export default App;
