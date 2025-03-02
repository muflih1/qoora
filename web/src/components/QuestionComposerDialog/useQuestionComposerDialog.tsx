import { useCallback } from 'react';
import { useDialog } from '../../contexts/ModalFlowContext';
import QuestionComposerDialog from './QuestionComposerDialog';

export default function useQuestionComposerDialog({ creationSource }) {
  const createDialog = useDialog();

  return useCallback(() => {
    createDialog(QuestionComposerDialog, { creationSource }, null, {
      replaceCurrentDialog: true,
    });
  }, [createDialog, creationSource]);
}
