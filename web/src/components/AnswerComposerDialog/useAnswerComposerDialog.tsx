import { useCallback } from 'react';
import { useDialog } from '../../contexts/ModalFlowContext';
import AnswerComposerDialog from './AnswerComposerDialog';
import { Question } from '../../types/entities';

export default function useAnswerComposerDialog({ question }: { question: Question}) {
  const createDialog = useDialog();

  return useCallback(() => {
    createDialog(AnswerComposerDialog, { question }, null, {
      replaceCurrentDialog: true,
    });
  }, [createDialog, question]);
}
