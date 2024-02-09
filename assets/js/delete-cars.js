const deleteButtons = document.querySelectorAll("button#deleteCars");

deleteButtons.forEach((deleteButton) => {
    const url = deleteButton.getAttribute("data-url");

    deleteButton.addEventListener("click", () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                send_data_ajax(url, "DELETE");
            }
        });
    });
});

function send_data_ajax(url, method) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", `${url}?_method=${method}`, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            Swal.fire({
                icon: "info",
                title: "Success",
                text: "Data has been successfully deleted."
            });
            location.reload()
        } else {
            const response = JSON.parse(xhr.responseText);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `${xhr.status} : ${response.errors}`
            });
        }
    };

    // Additional setup for your XMLHttpRequest, if needed

    xhr.send(); // Finally, send the request
}
