const getParams = () => {
    const params = new URLSearchParams(window.location.search).get("category")
    return params
}


const findFreelancer = () => {
    const params = getParams()
    fetch(`https://pro-tasker-backend-1.onrender.com/freelancers/?search=${params}`)
        .then(res => res.json())
        .then(data => {
            displayFreelancers(data)
        })
}

// function findFreelancersUserData(id) {
//     let data;
//     console.log(id);
//     fetch(`https://pro-tasker-backend-1.onrender.com/users/${id}`)
//         .then(res => res.json())
//         .then(data => {
//             data = data

//         })
//         console.log(data);
//     return data
// }

async function findFreelancersUserData(id) {

    const response = await fetch(`https://pro-tasker-backend-1.onrender.com/users/${id}`);
    const data = await response.json();
    return data;

}

const displayFreelancers = (data) => {
    const parentDiv = document.getElementById('freelancers')
    parentDiv.innerHTML = ''
    data.forEach(element => {
        console.log('Freelancer Data', element);
        const userData = findFreelancersUserData(element.user)
        // console.log(element?.ratings);
        userData.then(data => {
            console.log('User data', data);
            const div = document.createElement('div')
            div.innerHTML = `
                <div style="" class="border shadow p-5 rounded-xl shadow bg-white">
                    <div>
                        <img class="" style="width:200px; height:200px; border-radius: 10px" src="${element?.image}" alt="">
                    </div>
                    <div>
                        <h4 class="mt-3 font-bold">${data?.first_name} ${data?.last_name}</h4>
                        <p class="mt-1"><small>Ratings: </small>${element?.rating}</p>
                        <button class="mt-2 btn btn-neutral btn-outline btn-sm">
                            <a href="freelancerDetails.html?freelancerId=${element.id}">View Details ></a>
                        </button>
                    </div>
                </div>
                `
            parentDiv.appendChild(div)
        })

    });
}


findFreelancer()
// getParams()