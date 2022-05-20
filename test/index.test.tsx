// @ts-ignore
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import * as ReactDOMTestUtils from 'react-dom/test-utils';

import { useUserAgent } from '../src';

const TestHook = ({ callback }: { callback: any }) => {
  callback();
  return null;
};

let root: any = null;
let container: any = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  ReactDOMTestUtils.act(() => {
    root.unmount();
  });
  container = null;
});

test('fulfill `details` object correctly', async () => {
  let actual: any = null;
  ReactDOMTestUtils.act(() => {
    root = ReactDOMClient.createRoot(container);
  });
  ReactDOMTestUtils.act(() => {
    root.render(
      <TestHook
        callback={() => {
          actual = useUserAgent(window.navigator.userAgent);
        }}
      />
    );
  });

  let keys = 'os,browser,cpu,device,engine';
  expect(Object.keys(actual).join(',')).toBe(keys);
});

test('uses default value as `window.navigator.userAgent`', async () => {
  let actual: any = null;

  ReactDOMTestUtils.act(() => {
    root = ReactDOMClient.createRoot(container);
    root.render(
      <TestHook
        callback={() => {
          actual = useUserAgent();
        }}
      />
    );
  });

  expect(actual.browser.name).toBe('WebKit');
});

test('custom user-agent string is parsed correctly', async () => {
  let actual: any = null;

  ReactDOMTestUtils.act(() => {
    root = ReactDOMClient.createRoot(container);
    root.render(
      <TestHook
        callback={() => {
          actual = useUserAgent(
            'Mozilla/5.0 (PlayBook; U; RIM Tablet OS 1.0.0; en-US) AppleWebKit/534.11 (KHTML, like Gecko) Version/7.1.0.7 Safari/534.11'
          );
        }}
      />
    );
  });

  expect(actual.browser.name).toBe('Safari');
});
