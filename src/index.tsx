import React, {useState, ReactElement} from 'react';

interface Params<P, T> {
  promiser: (props: P) => Promise<T>;
  displayName: string;
  renderInitial?: (options: PromiseComponentRender<P, T>) => ReactElement | null;
  renderPending?: (options: PromiseComponentRender<P, T>) => ReactElement | null;
  renderRejected?: (options: PromiseComponentRender<P, T> & { result?: undefined; error: Error }) => ReactElement | null;
  renderFulfilled: (options: PromiseComponentRender<P, T> & { result: T; error?: undefined }) => ReactElement | null;
}

export interface PromiseComponentRender<P, T> {
  props: P;
  /**
   * @deprecated
   */
  status: PromiseStatuses;
  result?: T;
  error?: Error;
  run: () => void;
}

type PromiseStatuses = 'initial' | 'pending' | 'fulfilled' | 'rejected' ;

const defaultRenderInitial = ({run}: { run: () => void }) => {
  run();
  return <div>empty</div>;
};
const defaultRenderRejected = () => <div>获取数据失败</div>;
const defaultRenderPending = () => <div>loading</div>;


function promiseComponent<P, T>(promiseComponentParams: Params<P, T>) {
  const {promiser, displayName, renderFulfilled, renderInitial, renderPending, renderRejected} = promiseComponentParams;
  const Component: React.FunctionComponent<P> = (props) => {
    const [state, setState] = useState<Pick<PromiseComponentRender<P, T>, 'status' | 'result' | 'error'>>({
      status: 'initial'
    });
    const run = () => {
      setState({status: 'pending'});
      promiser(props).then((result) => {
        setState({status: 'fulfilled', result});
      }, (error) => {
        setState({status: 'rejected', error});
      });
    };
    switch (state.status) {
      case 'initial':
        return renderInitial ? renderInitial({props, run, ...state}) : defaultRenderInitial({run});
      case 'fulfilled':
        return renderFulfilled({props, run, status: 'fulfilled', result: state.result!});
      case 'rejected':
        return (renderRejected || defaultRenderRejected)({props, run, status: 'rejected', error: state.error!});
      case 'pending':
        return (renderPending || defaultRenderPending)({props, run, ...state});
      default:
        return null;
    }
  };
  Component.displayName = displayName;
  return Component;
}

export default promiseComponent;
