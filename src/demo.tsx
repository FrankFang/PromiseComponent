import React from 'react';
import ReactDOM from 'react-dom';
import promiseComponent from './index';
import './demo.css';

const root = document.createElement('div');
document.body.append(root);

type Resource = Array<{ id: number, name: string }>

const ComponentOne = promiseComponent<{}, Resource | Error>({
  promiser: () => ajax(),
  render({props, status, result, run}) {
    console.log('result');
    console.log(result);
    switch (status) {
      case 'initial':
        return (<>
          <button onClick={run}>搜索</button>
        </>);
      case 'pending':
        return (<>
          <button disabled>搜索</button>
          <span className="loading"/>
        </>);
      case 'fulfilled':
        return (<>
          <button onClick={run}>搜索</button>
          <div>
            成功 {JSON.stringify(result)}
          </div>
        </>);
      case 'rejected':
        return (<>
          <button onClick={run}>搜索</button>
          <div>
            失败 {(result as Error).message}
          </div>
        </>);
    }
  }
});

ReactDOM.render(<div>
  <ComponentOne/>
</div>, root);

function ajax() {
  return new Promise<Resource | Error>((resolve, reject) => {
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