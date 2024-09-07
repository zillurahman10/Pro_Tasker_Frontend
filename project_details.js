const getParamsId = () => {
    const params = new URLSearchParams(window.location.search).get("id")
    return params
}

const loadProjectDetails = () => {
    const id = getParamsId()
    fetch(`http://127.0.0.1:8000/projects/${id}`)
       .then(res => res.json())
       .then(data => displayProjectDetails(data))
}

async function findClientData (id) {
    const response = await fetch(`http://127.0.0.1:8000/users/${id}`);
    const data = await response.json();
    return data;
}

const displayProjectDetails = async (data) => {
    console.log(data);
    const userData = await findClientData(data?.client)
    console.log(userData);
    const parentDiv = document.getElementById('project_details')
    parentDiv.innerHTML = `
        <div class="flex justify-between mx-5">
            <div class="m-5" style="width: 70%">
                <div class="bg-white m-5 p-5 flex justify-between rounded-xl">
                    <div>
                        <h1 class="text-2xl">${data.title}</h1>
                        <p class="font-bold">${userData?.first_name} ${userData?.last_name}</p>
                        <p class="mt-3 bg-blue-200 btn btn-xs">Deadline: ${data?.deadline.slice(0, 10)}</p>
                    </div>
                    <div style="margin-left: 100px">
                        <button class="btn rounded-xl">Apply Now</button>
                        <p class="text-xl font-bold text-center mt-4">$${data?.budget}</p>
                    </div>
                </div>  
                <div class="m-5 bg-white p-5 rounded-xl">
                    <div style="width: 800px">
                        <p class="font-bold mb-3">Project Description</p>
                        <p>${data?.description}</p>
                    </div>
                </div> 
                <div class="m-5 bg-white p-5 rounded-xl">
                    <div style="width: 800px">
                        <p class="font-bold mb-3">Project Requirements</p>
                        <p>${data?.project_requirements}</p>
                    </div>
                </div> 
                <div class="m-5 bg-white p-5 rounded-xl">
                    <div style="width: 800px">
                        <p class="font-bold mb-3">Project Attachments</p>
                        <img src="${data?.attachments}" width="30%" class="rounded" alt=""/>
                    </div>
                </div> 
            </div>
            
            <div class="border m-5" style="width: 30%">
                <div class="bg-white m-5 rounded-xl">
                    <div style="margin:" class="p-5">
                        <p class="font-bold">Poster by: </p>
                        <p class="font-bold">${userData?.first_name} ${userData?.last_name}</p>
                        <p class="mt-2">Member Since: ${userData?.date_joined?.slice(0, 10)}</p>
                    </div>
                </div>
            </div>
        </div>
    `
}

loadProjectDetails()