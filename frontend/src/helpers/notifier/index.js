import { toast } from 'react-toastify'

const config = {
  autoClose:        5000,
  position:         'bottom-center',
  pauseOnHover:     true,
  hideProgressBar:  true,
  draggable:        false
}

export function error(message, position = 'bottom-center'){
  return toast.error(message, { ...config, position: position })
}
export function success(message, position = 'bottom-center'){
  return toast.success(message, { ...config, position: position })
}
export function colored(message, position = 'bottom-center'){
  return toast.info(message, { ...config, position: position })
}
export function warning(message, position = 'bottom-center'){
  return toast.warn(message, { ...config, position: position })
}
