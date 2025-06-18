import { toast } from "sonner";

export const showSuccessAlert = (message, options = {}) => {
  return toast.success(message, {
    duration: 4000,
    position: "top-right",
    ...options,
  });
};

export const showErrorAlert = (message, options = {}) => {
  return toast.error(message, {
    duration: 6000,
    position: "top-right",
    ...options,
  });
};

export const showWarningAlert = (message, options = {}) => {
  return toast.warning(message, {
    duration: 5000,
    position: "top-right",
    ...options,
  });
};

export const showInfoAlert = (message, options = {}) => {
  return toast.info(message, {
    duration: 4000,
    position: "top-right",
    ...options,
  });
};

export const showCustomAlert = (message, options = {}) => {
  return toast(message, {
    duration: 4000,
    position: "top-right",
    ...options,
  });
};

export const showConfirmAlert = (
  message,
  onConfirm,
  onCancel,
  options = {}
) => {
  return toast(message, {
    duration: Infinity,
    position: "top-right",
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
    position: "top-right",
    ...options,
  });
};

export const clearAllAlerts = () => {
  toast.dismiss();
};

export const useCustomAlerts = () => {
  const showSuccess = (message, options) => showSuccessAlert(message, options);
  const showError = (message, options) => showErrorAlert(message, options);
  const showWarning = (message, options) => showWarningAlert(message, options);
  const showInfo = (message, options) => showInfoAlert(message, options);
  const showCustom = (message, options) => showCustomAlert(message, options);
  const showConfirm = (message, onConfirm, onCancel, options) =>
    showConfirmAlert(message, onConfirm, onCancel, options);
  const showLoading = (message, promise, options) =>
    showLoadingAlert(message, promise, options);
  const clearAll = () => clearAllAlerts();

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showCustom,
    showConfirm,
    showLoading,
    clearAll,
  };
};
