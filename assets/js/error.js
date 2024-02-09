function errorToastShow(code,message){
    const toastPlacementExample = document.querySelector('.toast-placement-ex'),
    toastPlacementBtn = document.querySelector('#showToastPlacement');
    const toast_body = document.getElementById("message")
    toast_body.innerText = `Status ${code} : ${message}`
    let selectedType, selectedPlacement, toastPlacement;
    toastPlacement = new bootstrap.Toast(toastPlacementExample);
    toastPlacement.show();
}
