import * as React from 'react';
import * as UAParser from 'ua-parser-js';

type IUseUserAgentReturn = Omit<IUAParser.IResult, 'ua'>;

function useUserAgent(uastring = window.navigator.userAgent) {
  let [state, setState] = React.useState<IUseUserAgentReturn | null>(null);

  React.useEffect(() => {
    let didRun = true;

    try {
      if (didRun) {
        const uaParser = new UAParser.UAParser();
        uaParser.setUA(uastring);
        const payload = {
          os: uaParser.getOS(),
          browser: uaParser.getBrowser(),
          cpu: uaParser.getCPU(),
          device: uaParser.getDevice(),
          engine: uaParser.getEngine()
        };
        setState(payload);
      }
    } catch (err) {
      setState(null);
    }

    return () => {
      didRun = false;
    };
  }, [uastring]);

  return state;
}

export default useUserAgent;