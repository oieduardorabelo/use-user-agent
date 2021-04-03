import * as React from 'react';
import * as UAParser from 'ua-parser-js';

type IUseUserAgentReturn = Omit<UAParser.IResult, 'ua'>;

function useUserAgent(uastring = window.navigator.userAgent) {
  let [state, setState] = React.useState<IUseUserAgentReturn | null>(null);

  React.useEffect(() => {
    let didRun = true;

    try {
      const uaParser = new UAParser.UAParser();
      uaParser.setUA(uastring);
      const payload = {
        os: uaParser.getOS(),
        browser: uaParser.getBrowser(),
        cpu: uaParser.getCPU(),
        device: uaParser.getDevice(),
        engine: uaParser.getEngine(),
      };
      if (didRun) {
        setState(payload);
      }
    } catch (err) {
      if (didRun) {
        setState(null);
      }
    }

    return () => {
      didRun = false;
    };
  }, [uastring]);

  return state;
}

export { useUserAgent };
