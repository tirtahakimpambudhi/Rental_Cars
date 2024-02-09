document.addEventListener("DOMContentLoaded", function () {
    const copyButton = document.getElementById("copyButton");
    const copyInput = document.getElementById("copyInput");

    copyButton.addEventListener("click", function () {
        // Select the text in the input field
        copyInput.select();
        copyInput.setSelectionRange(0, 99999); // For mobile devices

        // Copy the selected text to clipboard
        document.execCommand("copy");

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }})

        Toast.fire({
          icon: 'success',
          title: 'Succesed Copy Token'
        })
    });
});