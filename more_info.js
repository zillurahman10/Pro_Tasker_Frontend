const redirectToFreelancer = () => {
    if(localStorage.getItem('user_type') === "Freelancer") {
        window.location.href = "index.html";
    }
    if(localStorage.getItem('user_type') === "client"){
        window.location.href = "create_freelancer.html";
    }
    else {
        window.location.href = "create_freelancer.html";
    }
}
const redirectToClient = () => {
    if(localStorage.getItem('user_type') === "client") {
        window.location.href = "index.html";
    }
    if(localStorage.getItem('user_type') === "Freelancer"){
        window.location.href = "create_client.html";
    }
    else {
        window.location.href = "create_client.html";
    }
}