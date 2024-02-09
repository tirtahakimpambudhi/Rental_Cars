
const copyButton = document.getElementById("copyButton");
const copyInput = document.getElementById("copyInput");
document.addEventListener("DOMContentLoaded", function () {


    copyButton.addEventListener("click",async function () {
        // Select the text in the input field
        copyInput.focus() // For mobile devices

        // Copy the selected text to clipboard
        const text = await navigator.clipboard.readText()
        copyInput.value = text


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
          title: 'Succesed Paste Token '
        })
    });
});

document.getElementById("next").addEventListener("click", async () => {
  if(copyInput.value == ''){
    Swal.fire(
    'The Token Empty?',
    'Is the token still empty??',
    'question')
  } else {
    const token = copyInput.value
    const url = new URL(window.location.href)
    url.pathname = `Kelompok_3/seller/verification`
    const fetch_url = url
    const response = await fetch(fetch_url,{
      method :"POST",
      headers : {
        Authorization: `Bearer ${token}`,
      }
    })
    if(!response.ok){
      Swal.fire({
    icon: 'error',
    title: 'Errors '+response.status,
    text: `${response.statusText}!`,
    footer: `<a href="">Back</a>`})
    }
    const data = await response.json(); 
    window.location.replace(`/Kelompok_3/seller/${data.data}`)
  }
})
