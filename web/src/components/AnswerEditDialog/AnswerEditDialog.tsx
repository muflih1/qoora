import BaseDialog from "../Dialog/BaseDialog";

export default function AnswerEditDialog({onClose}: {onClose: () => void}) {
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