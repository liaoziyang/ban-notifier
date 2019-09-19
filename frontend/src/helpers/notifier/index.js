import { toast } from 'react-toastify'

const config = {
  autoClose:        5000,
  position:         'bottom-center',
  pauseOnHover:     true,
  hideProgressBar:  true,
  draggable:        false
}

export function error(message, position = 'bottom-center'){
  toast.error(message, { ...config, position: position })
}
export function success(message, position = 'bottom-center'){
  toast.success(message, { ...config, position: position })
}
export function info(message, position = 'bottom-center'){
  toast.info(message, { ...config, position: position })
}
export function warning(message, position = 'bottom-center'){
  toast.warn(message, {...config, position: position };
}
