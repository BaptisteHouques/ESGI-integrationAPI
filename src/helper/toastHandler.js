import {useToast} from "vue-toastification";

export function toastHandler(type, message, options = {timeout: 10000}) {
    const toast = useToast()
    switch (type) {
        case 'error':
            toast.error(message, options);
            break;
        case 'success':
            toast.success(message, options);
            break;
    }
}