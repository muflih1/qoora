import { useCallback } from 'react';
import { useDialog } from '../../contexts/ModalFlowContext';
import AnswerComposerDialog from './AnswerComposerDialog';

export default function useAnswerComposerDialog({ question }) {
  const createDialog = useDialog();

  return useCallback(() => {
    createDialog(AnswerComposerDialog, { question }, null, {
      replaceCurrentDialog: true,
    });
  }, [createDialog, question]);
}
