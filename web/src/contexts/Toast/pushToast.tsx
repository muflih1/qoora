import { BaseToasetrStateManager } from "./BaseToastStateManager";

const toasterStateManager = BaseToasetrStateManager.getInstance()

export function pushToast(props, duaration = 2750, toasterManager = toasterStateManager) {
  const toastId = toasterManager.push(
    props,
    duaration
  )
  return toastId
}