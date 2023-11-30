import Swal from "sweetalert2";

export default Swal.mixin({
    reverseButtons: false,
    confirmButtonColor: "#eb6056",
    confirmButtonText: "Ya",
    showCancelButton: true,
    cancelButtonText: "Tidak",
    showClass: {
        popup: "animate__animated animate__fadeIn animate__faster",
    },
    hideClass: {
        popup: "animate__animated animate__fadeOut animate__faster",
    },
});