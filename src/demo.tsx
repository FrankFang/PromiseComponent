import React from 'react';
import ReactDOM from 'react-dom';
import promiseComponent from './index';
import './demo.css';

const root = document.createElement('div');
document.body.append(root);

type Resource = Array<{ id: number, name: string }>

const ComponentOne = promiseComponent<{}, Resource | Error>({
  promiser: () => ajax(),
  displayName: 'ComponentOne',
  renderFulfilled({result}) {
    console.log(result);
    return <div>
      请求结果一定存在，因为 result 不为空
    </div>;
  },
  // 可选
  renderRejected({error}) {
    return <div>
      请求失败
    </div>;
  },
  // 可选
  renderInitial() {
    return <div>最开始的样子</div>;
  },
  // 可选
  renderPending() {
    return <div>加载中</div>;
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