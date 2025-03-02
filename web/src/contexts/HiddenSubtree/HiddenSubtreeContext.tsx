import { createContext } from 'react';

export type HiddenSubtreeState = {
  backgrounded: boolean;
  hidden: boolean;
  hiddenOrBackgrounded: boolean;
  hiddenOrBackgrounded_FIXME: boolean;
};

const HiddenSubtreeContext = createContext<HiddenSubtreeState>({
  backgrounded: false,
  hidden: false,
  hiddenOrBackgrounded: false,
  hiddenOrBackgrounded_FIXME: false,
});

export default HiddenSubtreeContext;
