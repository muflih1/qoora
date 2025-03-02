import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useIsMountRef } from '../lib/utils';

interface DialogProps {
  onClose: (...args: unknown[]) => void;
}

interface DiaglogConfig<Props> {
  dialog: React.ComponentType<Props & DialogProps>;
  dialogProps: Props;
  onClose?: (...args: unknown[]) => void;
}

type CreateDialogConfig = <Props>(
  Dialog: React.ComponentType<Props & DialogProps>,
  props: Props,
  onClose?: null | ((...args: unknown[]) => void),
  config?: { replaceCurrentDialog?: boolean }
) => void;

const DialogContext = createContext<CreateDialogConfig>(undefined!);

export default function DialogProvider({ children }) {
  const [dialogConfigs, setDialogConfigs] = useState<DiaglogConfig<unknown>[]>(
    []
  );
  const dialogConfigsRef = useRef(dialogConfigs);

  useEffect(() => {
    dialogConfigsRef.current = dialogConfigs;
  }, [dialogConfigs]);

  const createDialogConfig = useCallback(
    <Props,>(
      Dialog: React.ComponentType<Props & DialogProps>,
      props: Props,
      onClose?: (...args: unknown[]) => void,
      config?: { replaceCurrentDialog?: boolean }
    ) => {
      setDialogConfigs(prevDialogConfigs => {
        const replaceCurrentDialog = config?.replaceCurrentDialog ?? false;
        const newDialogConfig = {
          dialog: Dialog,
          dialogProps: props,
          onClose,
        };
        return replaceCurrentDialog
          ? [
              ...prevDialogConfigs.slice(0, prevDialogConfigs.length - 1),
              newDialogConfig,
            ]
          : [...prevDialogConfigs, newDialogConfig];
      });
    },
    []
  );

  const isMountedRef = useIsMountRef();

  const removeDialogConfig = useCallback(
    (dialogConfig: DiaglogConfig<unknown>, args: unknown[]) => {
      if (!isMountedRef.current) {
        return;
      }

      setDialogConfigs(prevDialogConfigs => {
        const index = prevDialogConfigs.indexOf(dialogConfig);
        return index < 0
          ? prevDialogConfigs
          : prevDialogConfigs.slice(0, index);
      });

      dialogConfig.onClose?.(...args);
    },
    [isMountedRef]
  );

  return (
    <DialogContext.Provider value={createDialogConfig}>
      {children}
      <div>
        {dialogConfigs.map((config, index) => (
          <DialogController
            key={'DialogController$' + index}
            dialogConfig={config}
            dialogConfigsRef={dialogConfigsRef}
            removeDialogConfig={removeDialogConfig}
          />
        ))}
      </div>
    </DialogContext.Provider>
  );
}

interface DialogControllerProps<Props> {
  dialogConfig: DiaglogConfig<Props>;
  dialogConfigsRef: React.RefObject<Array<DiaglogConfig<Props>>>;
  removeDialogConfig: (
    dialogConfig: DiaglogConfig<Props>,
    args: unknown[]
  ) => void;
}

function DialogController<Props>({
  dialogConfig,
  dialogConfigsRef,
  removeDialogConfig,
}: DialogControllerProps<Props>) {
  const { dialog: Dialog, dialogProps } = dialogConfig;
  const requestRef = useRef(null);

  useEffect(() => {
    return () => {
      if (requestRef.current != null) {
        window.cancelAnimationFrame(requestRef.current);
      }
    };
  });

  const closeDialog = useCallback(
    (...args: unknown[]) => {
      if (requestRef.current != null) {
        window.cancelAnimationFrame(requestRef.current);
      }

      const index = dialogConfigsRef.current.indexOf(dialogConfig);
      if (index < 0) {
        console.error(
          'Attempting to close a dialog that does not exists anymore'
        );
        return;
      }

      requestRef.current = window.requestAnimationFrame(() => {
        removeDialogConfig(dialogConfig, args);
        requestRef.current = null;
      });
    },
    [dialogConfig, dialogConfigsRef, removeDialogConfig]
  );

  return (
    <Dialog
      {...dialogProps}
      onClose={closeDialog}
    />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDialog() {
  return useContext(DialogContext);
}
