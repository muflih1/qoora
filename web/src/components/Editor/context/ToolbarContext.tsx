import type { ElementFormatType } from 'lexical';
import {
  createContext,
  JSX,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

export const rootTypeToRootName = {
  root: 'Root',
  table: 'Table',
};

export const blockTypeToBlockName = {
  bullet: 'Bullet List',
  code: 'Code Block',
  h1: 'Heading 1',
  number: 'Numbered List',
  paragraph: 'Normal',
  quote: 'Quote',
};

const INITIAL_TOOLBAR_STATE = {
  blockType: 'paragraph' as keyof typeof blockTypeToBlockName,
  canRedo: false,
  canUndo: false,
  codeLanguage: '',
  elementFormat: 'left' as ElementFormatType,
  fontColor: '#000',
  fontFamily: 'Arial',
  fontSize: 16,
  isBold: false,
  isCode: false,
  isItalic: false,
  isRTL: false,
};

type ToolbarState = typeof INITIAL_TOOLBAR_STATE;

type ToolbarStateKey = keyof ToolbarState;
type ToolbarStateValue<Key extends ToolbarStateKey> = ToolbarState[Key];

type ContextShape = {
  toolbarState: ToolbarState;
  updateToolbarState<Key extends ToolbarStateKey>(
    key: Key,
    value: ToolbarStateValue<Key>
  ): void;
};

const Context = createContext<ContextShape | undefined>(undefined);

export const ToolbarContext = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [toolbarState, setToolbarState] = useState(INITIAL_TOOLBAR_STATE);

  const updateToolbarState = useCallback(
    <Key extends ToolbarStateKey>(key: Key, value: ToolbarStateValue<Key>) => {
      setToolbarState(prev => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const contextValue = useMemo(
    () => ({
      toolbarState,
      updateToolbarState,
    }),
    [toolbarState, updateToolbarState]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useToolbarState = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('useToolbarState must be used within a ToolbarProvider');
  }

  return context;
}
