import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactDOMTestUtils from 'react-dom/test-utils';

import useUserAgent from '../src';

const TestHook = ({ callback }: { callback: any }) => {
  callback();
  return null;
};

let container: any = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  ReactDOM.unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('fulfill `details` object correctly', async () => {
  let actual: any = null;

  ReactDOMTestUtils.act(() => {
    ReactDOM.render(
      <TestHook
        callback={() => {
          actual = useUserAgent(window.navigator.userAgent);
        }}
      />,
      container
    );
  });

  let keys = 'os,browser,cpu,device,engine';
  expect(Object.keys(actual).join(',')).toBe(keys);
});

test('uses default value as `window.navigator.userAgent`', async () => {
  let actual: any = null;

  ReactDOMTestUtils.act(() => {
    ReactDOM.render(
      <TestHook
        callback={() => {
          actual = useUserAgent();
        }}
      />,
      container
    );
  });

  expect(actual.browser.name).toBe('WebKit');
});

test('custom user-agent string is parsed correctly', async () => {
  let actual: any = null;

  ReactDOMTestUtils.act(() => {
    ReactDOM.render(
      <TestHook
        callback={() => {
          actual = useUserAgent("Mozilla/5.0 (PlayBook; U; RIM Tablet OS 1.0.0; en-US) AppleWebKit/534.11 (KHTML, like Gecko) Version/7.1.0.7 Safari/534.11");
        }}
      />,
      container
    );
  });

  expect(actual.browser.name).toBe('Safari');
});