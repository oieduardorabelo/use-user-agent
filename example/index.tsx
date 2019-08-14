import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import useUserAgent from '../src';

const App = () => {
  let details = useUserAgent();

  if (!details) {
    return null;
  }

  let { os, browser, cpu, device, engine } = details;

  return (
    <div>
      <p>My OS is {os.name}, on version {os.version}</p>
      <p>My Browser is {browser.name}, on version {browser.version} with major {browser.major}</p>
      <p>My CPU architecture is {cpu.architecture}</p>
      <p>My Device is {device.vendor}, with model {device.model} of type {device.type}</p>
      <p>My Engine is {engine.name} with version {engine.version}</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
