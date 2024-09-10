const handleRegister = (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirm_password = document.getElementById("confirm_password").value;

  const data = {
    username,
    first_name,
    last_name,
    email,
    password,
    confirm_password,
  };
  console.log();

  fetch("http://127.0.0.1:8000/register/", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if(data.message) {
        showToastRegister(data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const handleLogin = (event) => {
  event.preventDefault();
  const username = document.getElementById("username_login").value;
  const password = document.getElementById("password_login").value;

  const data = {
    username,
    password,
  };

  fetch("http://127.0.0.1:8000/login/", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
        if(data.token){
            localStorage.setItem("token", data.token);
            localStorage.setItem("user_id", data.user_id);
            if(localStorage.getItem("user_type")){
              location.replace('http://127.0.0.1:5500/index.html')
            }
            else {
              location.replace("http://127.0.0.1:5500/more_info.html")
            }
        }
    })
    .catch((error) => {
      console.error(alert(error.message));
    });
};


const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    location.reload()
}

function showToastRegister(message) {
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
