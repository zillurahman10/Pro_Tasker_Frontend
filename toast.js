function showToastInfo(message) {
    Swal.fire({
      icon: 'info', // You can use 'success', 'error', 'info', 'warning'
      title: message,
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
  }
  
function showToastSuccess(message) {
    Swal.fire({
      icon: 'success', // You can use 'success', 'error', 'info', 'warning'
      title: message,
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
  }