import Swal from "sweetalert2";

export const swalLoginModal = (msg) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please login to " + msg,
      background: 'radial-gradient( farthest-side at 73% 21%, transparent, rgb(26,29,41) )',
    });
  };