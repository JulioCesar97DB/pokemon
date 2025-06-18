import { toast } from "sonner";

const baseConfig = {
  position: "top-right",
};

export const showSuccessAlert = (message, options = {}) =>
  toast.success(message, { duration: 4000, ...baseConfig, ...options });

export const showErrorAlert = (message, options = {}) =>
  toast.error(message, { duration: 6000, ...baseConfig, ...options });

export const showWarningAlert = (message, options = {}) =>
  toast.warning(message, { duration: 5000, ...baseConfig, ...options });

export const showInfoAlert = (message, options = {}) =>
  toast.info(message, { duration: 4000, ...baseConfig, ...options });

export const showCustomAlert = (message, options = {}) =>
  toast(message, { duration: 4000, ...baseConfig, ...options });

export const showConfirmAlert = (
  message,
  onConfirm,
  onCancel,
  options = {}
) => {
  return toast(message, {
    duration: Infinity,
    ...baseConfig,
    action: {
      label: "Confirmar",
      onClick: () => {
        onConfirm();
        toast.dismiss();
      },
    },
    cancel: {
      label: "Cancelar",
      onClick: () => {
        if (onCancel) onCancel();
        toast.dismiss();
      },
    },
    ...options,
  });
};

export const showLoadingAlert = (message, promise, options = {}) => {
  return toast.promise(promise, {
    loading: message || "Cargando...",
    success: options.successMessage || "¡Completado!",
    error: options.errorMessage || "Error al procesar",
    ...baseConfig,
    ...options,
  });
};

export const clearAllAlerts = () => toast.dismiss();

export const useCustomAlerts = () => ({
  showSuccess: showSuccessAlert,
  showError: showErrorAlert,
  showWarning: showWarningAlert,
  showInfo: showInfoAlert,
  showCustom: showCustomAlert,
  showConfirm: showConfirmAlert,
  showLoading: showLoadingAlert,
  clearAll: clearAllAlerts,
});
