const getParamsId = () => {
    const params = new URLSearchParams(window.location.search).get("id")
    return params
}

const loadProjectDetails = () => {
    const id = getParamsId()
    fetch(`https://pro-tasker-backend-1.onrender.com/projects/${id}/`)
       .then(res => res.json())
       .then(data => displayProjectDetails(data))
}

async function findClientData (id) {
    const response = await fetch(`https://pro-tasker-backend-1.onrender.com/clients/${id}/`);
    const data = await response.json();
    return data;
}
async function findUserData (id) {
    const response = await fetch(`https://pro-tasker-backend-1.onrender.com/users/${id}/`);
    const data = await response.json();
    return data;
}

const displayProjectDetails = async (data) => {
    const clientData = await findClientData(data?.client)
    console.log(clientData);
    const userData = await findUserData(clientData?.user)
    console.log(userData);
    const parentDiv = document.getElementById('project_details')
    const user_type = localStorage.getItem('user_type')
    parentDiv.innerHTML = `
        <div class="flex justify-between mx-5">
            <div class="m-5" style="width: 70%">
                <div class="bg-white m-5 p-5 flex justify-between rounded-xl">
                    <div>
                        <h1 class="text-2xl">${data.title}</h1>
                        <p class="font-bold">${userData?.first_name} ${userData?.last_name}</p>
                        <p class="mt-3 btn btn-xs">Deadline: ${data?.deadline.slice(0, 10)}</p>
                    </div>
                    <div style="margin-left: 100px">
                    ${user_type == "Freelancer" ? 
                        `<a href="proposal.html?client_id=${clientData.id}&project_id=${data?.id}" alt="">
                            <button class="btn rounded-xl">Apply Now</button>
                        </a>` 
                        : ""
                    }
                    
                        <p class="text-xl font-bold text-center mt-4">$${data?.budget}</p>
                    </div>
                </div>  
                <div class="m-5 bg-white  p-5 rounded-xl">
                    <div style="width: 800px">
                        <p class="font-bold mb-3">Project Description</p>
                        <p>${data?.description}</p>
                    </div>
                </div> 
                <div class="m-5 bg-white  p-5 rounded-xl">
                    <div style="width: 800px">
                        <p class="font-bold mb-3">Project Requirements</p>
                        <p>${data?.project_requirements}</p>
                    </div>
                </div> 
                <div class="m-5 bg-white  p-5 rounded-xl">
                    <div style="width: 800px">
                        <p class="font-bold mb-3">Project Attachments</p>
                        <img src="${data?.attachments}" width="30%" class="rounded" alt=""/>
                    </div>
                </div> 
            </div>
            
            <div class="m-5" style="width: 30%">
                <div class="bg-white   m-5 rounded-xl">
                    <div style="margin:" class="p-5">
                        <img src="" alt=""/>
                        <p class="font-bold">${userData?.first_name} ${userData?.last_name}</p>
                        <p class="mt-2">Member Since: ${userData?.date_joined?.slice(0, 10)}</p>
                    </div>
                </div>
            </div>
        </div>
    `
}

loadProjectDetails()