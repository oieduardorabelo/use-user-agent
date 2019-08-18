# @oieduardorabelo/use-user-agent

React Hooks to detect browsers user-agent using [`ua-parser-js`](https://github.com/faisalman/ua-parser-js) as main dependency.

To install it:

```
yarn add @oieduardorabelo/use-user-agent
```

## Example

An online demo is available at CodeSandbox:

- **Live demo:** https://codesandbox.io/s/live-demo-use-user-agent-d7iyg

If you've any issues, **open an issue with a CodeSandbox link** with your issue

## API Explained

In your app, you can add:

```javascript
import { useUserAgent } from '@oieduardorabelo/use-user-agent';

function App() {
  let details = useUserAgent(uastring)
  ...
}
```

### `details` object is composed of:

- `details`: It is either `null` or an ua-parser-js object.
- `details.os`: It is a `Object`, with keys `name` and `version` as `string|undefined`
- `details.browser`: It is a `Object`, with keys `name`, `version` and `major` as `string|undefined`
- `details.cpu`: It is a `Object`, with keys `architecture` as `string|undefined`
- `details.device`: It is a `Object`, with keys `vendor`, `model` and `type` as `string|undefined`
- `details.engine`: It is a `Object`, with keys `name` and `version`  as `string|undefined`

For full documentation, refer to [ua-parser-js repository](https://github.com/faisalman/ua-parser-js#example).

### `uastring` parameter is composed of:

- `uastring`: It is a `String`, should be a user-agent string, if none is passed, we default to `window.navigator.userAgent`

## Examples

Using default value from `useUserAgent()`:

```javascript
import { useUserAgent } from '@oieduardorabelo/use-user-agent';

function App() {
  let details = useUserAgent(); // default is `window.navigator.userAgent`

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
}
```

Passing a custom user-agent string:

```javascript
import { useUserAgent } from '@oieduardorabelo/use-user-agent';

function App() {
  let uastring = "Mozilla/5.0 (PlayBook; U; RIM Tablet OS 1.0.0; en-US) AppleWebKit/534.11 (KHTML, like Gecko) Version/7.1.0.7 Safari/534.11";
  let details = useUserAgent(uastring);

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
}
```

### License

[MIT License](https://oss.ninja/mit/oieduardorabelo/) © [Eduardo Rabelo](https://eduardorabelo.me)
