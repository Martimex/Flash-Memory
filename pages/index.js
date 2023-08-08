import Landing from './landing.js';
import Play from './play.js';
import React, { useState, useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fab, fas);

function App() {

  const [state, setState] = useState('start');

  useEffect(() => {
    if(state === 'confirm') { // it's a trick to trigger level restart
      setState('game')
    }
  }, [state])

  return (
    <div className="App">
      {state === 'start' && (
        <Landing />
      )}

      {state === 'play' && (
        <Play />
      )}

    </div>
  );
}

export default App;
