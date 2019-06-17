# promiseComponent

Make async code easy again!

## Installation

```bash
yarn add promise-component
```

## Usage

ComponentOne.js

```javascript 
import React from 'react';
import ReactDOM from 'react-dom';
import promiseComponent from 'promise-component';

const ComponentOne = promiseComponent({
  promiser: () => ajax(),
  render({props, status, result, run}) {
    switch (status) {
      case 'initial':
        return (<>
          <button onClick={run}>search</button>
        </>);
      case 'pending':
        return (<>
          <button disabled>search</button>
          <span>loading...</span>
        </>);
      case 'fulfilled':
        return (<>
          <button onClick={run}>search</button>
          <div>
            succeed: {JSON.stringify(result)}
          </div>
        </>);
      case 'rejected':
        return (<>
          <button onClick={run}>search</button>
          <div>
            failed: {(result).message}
          </div>
        </>);
    }
  }
});

export default ComponentOne;


function ajax() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve([
          {id: 1, name: 'Frank'},
          {id: 2, name: 'Jack'}
        ]);
      } else {
        reject(new Error('network broken'));
      }
    }, 1500);
  });
}

```



