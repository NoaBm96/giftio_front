import Swal from "sweetalert2";

export const success = (message) => {
  Swal.fire({
    title: `${message}!`,
    text: `Your data has been ${message.toLowerCase()}`,
    icon: "success",
    confirmButtonColor: "#4d6d6e",
  });
};

export const shipped = () => {
  Swal.fire({
    title: `Shipment Done!`,
    text: `Your item has been shipped`,
    icon: "success",
    confirmButtonColor: "#4d6d6e",
  });
};

export const loginSuccess = () => {
  Swal.fire({
    title: `Success!`,
    text: `Login Successfully`,
    icon: "success",
    confirmButtonColor: "#4d6d6e",
  });
};

export const warning = (message) => {
  Swal.fire({
    title: "Warning!",
    text: message,
    icon: "warning",
    confirmButtonColor: "#4d6d6e",
  });
};

export const failure = (message) => {
  Swal.fire({
    title: "Error!",
    text: message,
    icon: "error",
    confirmButtonColor: "#4d6d6e",
  });
};

export const confirmation = () =>
  Swal.fire({
    title: "Are you sure?",
    text: "You want to delete?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#4d6d6e",
    cancelButtonColor: "#d33",
    confirmButtonText: "Delete",
  });
