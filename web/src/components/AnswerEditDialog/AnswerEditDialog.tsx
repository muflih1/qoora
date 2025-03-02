import BaseDialog from "../Dialog/BaseDialog";

export default function AnswerEditDialog({onClose}) {
  return (
    <BaseDialog
      titleText="Edit your answer"
      primaryClickableProps={{
        isDisabled: true,
        label: 'Save',
        onPress: () => {}
      }}
      onClose={onClose}
    >
      <div></div>
    </BaseDialog>
  )
}