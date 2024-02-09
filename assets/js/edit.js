
    const action = window.location.href
    function getFormValues() {
    const form = document.getElementById("formAccountSettings");
    const formData = { };
    const elements = form.elements;

    for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
    if (element.type !== "button" && element.type !== "reset") {
        formData[element.name] = element.value;
        }
    }

    return formData;
}
    // Menyiapkan permintaan AJAX ke server.
    function send_data_ajax(formData) {
        var xhr = new XMLHttpRequest();
    xhr.open("POST", `${action}?_method=PATCH`, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
        console.log(xhr.responseText);
    Swal.fire({
        icon: "info",
    title: "Success",
    text: "Data has been successfully updated."
                });
            } else {
              const response = JSON.parse(xhr.responseText)
    Swal.fire({
        icon: "error",
    title: "Error",
    text: `${xhr.status} : ${response.errors}`
                });
            }
        };
    xhr.send(new URLSearchParams(formData));
    }

    // Memanggil fungsi untuk mengirim data melalui AJAX.

    const saveButton = document.getElementById("sb");
    saveButton.addEventListener("click",async function() {
    const {value: formValues, dismiss: isDismissed } = await Swal.fire({
        title: 'Confirm Account',
    html:
    '<h3>Email</h3>' +
    '<input id="swal-input1" type="email" required class="swal2-input">' +
        '<h3>Password</h3>' +
        '<input id="swal-input2" type="password" required class="swal2-input">',
            focusConfirm: false,
        preConfirm: () => {
            const email = document.getElementById('swal-input1').value;
            const password = document.getElementById('swal-input2').value;

            if (email.trim() === "" || password.trim() === "") {
                Swal.showValidationMessage("Please input your email and password.");
            }

            return {
                emailOld: email,
            passwordOld: password
            };
        }
    });

            if (isDismissed) {
                // Pengguna membatalkan SweetAlert, tidak melakukan apa-apa.
                Swal.fire({
                    icon: 'error',
                    title: "400 : Bad Request",
                    text: "Please Enter Email And Password"
                })
        return;
    }
            const formData = getFormValues();
            // Lakukan sesuatu dengan data yang telah diambil, misalnya kirim ke server menggunakan AJAX.
            const action = window.location.href
            formData.emailOld = formValues.emailOld
            formData.passwordOld = formValues.passwordOld
            send_data_ajax(formData);

});

