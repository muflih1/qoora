import { useCallback } from "react";
import { useDialog } from "../../contexts/ModalFlowContext";
import AnswerEditDialog from "./AnswerEditDialog";

export default function useAnswerEditDialog() {
  const createDialog = useDialog()

  return useCallback(() => {
    createDialog(AnswerEditDialog, {}, null, {replaceCurrentDialog: true})
  }, [createDialog])
}
