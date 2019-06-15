import React, {ReactNode, useState} from 'react';


interface Props<P, T> {
  promiser: (props: P) => Promise<T>;
  render: (options: PromiseComponentRender<P, T>) => ReactNode;
}

export interface PromiseComponentRender<P, T> {
  props: P;
  status: PromiseStatuses;
  result?: T;
  run: () => void;
}

type PromiseStatuses = 'initial' | 'pending' | 'fulfilled' | 'rejected' ;

function promiseComponent<P, T>({promiser, render}: Props<P, T>) {
  return function C(props: P) {
    const [state, setState] = useState<Pick<PromiseComponentRender<P, T>, 'status' | 'result'>>({
      status: 'initial'
    });
    const run = () => {
      setState({status: 'pending'});
      promiser(props).then((result) => {
        setState({status: 'fulfilled', result});
      }, (result) => {
        setState({status: 'rejected', result});
      });
    };
    return (
      <>{render({props, run, ...state})}</>
    );
  };
};
export default promiseComponent;