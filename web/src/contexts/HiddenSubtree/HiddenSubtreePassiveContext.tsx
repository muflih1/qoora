import { createContext } from 'react';
import { HiddenSubtreeState } from './HiddenSubtreeContext';

export type HiddenSubtreePassiveContextType = {
  getCurrentState: () => HiddenSubtreeState
  subscribeToChanges: (callback: (state: HiddenSubtreeState) => void) => {remove: () => void}
}

const HiddenSubtreePassiveContext = createContext<HiddenSubtreePassiveContextType>({
  getCurrentState: () => ({
    backgrounded: false,
    hidden: false,
    hiddenOrBackgrounded: false,
    hiddenOrBackgrounded_FIXME: false,
  }),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  subscribeToChanges: (_callback) => ({
    remove: () => {},
  }),
});

export default HiddenSubtreePassiveContext