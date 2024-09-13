const loadFreelancers = () => {
    fetch('https://pro-tasker-backend-1.onrender.com/freelancers')
       .then(response => response.json())
       .then(data => displayFreelancers(data))
}

async function findFreelancersUserData(id) {

    const response = await fetch(`https://pro-tasker-backend-1.onrender.com/users/${id}`);
    const data = await response.json();
    return data;

}

const displayFreelancers = (data) => {
    const parentDiv = document.getElementById('freelancers');
    parentDiv.innerHTML = '';
    data.forEach(element => {
        const userData = findFreelancersUserData(element.user)
        
        userData.then(info => {
            const div = document.createElement('div');
            div.innerHTML = `
        <div style="" class="border shadow p-5 rounded-xl shadow bg-white">
            <div>
                <img class="" style="width:200px; height:200px; border-radius: 10px" src="${element?.image}" alt="">
            </div>
            <div>
                <h4 class="mt-3 font-bold">${info?.first_name} ${info?.last_name}</h4>
                <p class="mt-1"><small>Ratings: </small>${element?.rating}</p>
                <button class="mt-2 btn btn-outline btn-sm">
                    <a href="freelancerDetails.html?freelancerId=${element?.id}">View Details ></a>
                </button>
            </div>
        </div>
        `;
        parentDiv.appendChild(div);
        })
        
    });
}

loadFreelancers()