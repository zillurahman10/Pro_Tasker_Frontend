const loadProjects = () => {
    fetch('https://pro-tasker-backend-1.onrender.com/projects/')
       .then(res => res.json())
       .then(data => displayProjects(data))
}

async function loadClientData (id) {
    const response = await fetch(`https://pro-tasker-backend-1.onrender.com/clients/${id}/`);
    const data = await response.json();
    return data;
}

async function loadUserData (id) {
    const response = await fetch(`https://pro-tasker-backend-1.onrender.com/users/${id}/`);
    const data = await response.json();
    return data;
}

const displayProjects = async (data) => {  // Mark as async
    console.log(data);
    const parentDiv = document.getElementById('projects')

    parentDiv.innerHTML = ''
    if (data.length > 0) {
        for (const element of data) {  // Use for..of to enable async/await
            const clientData = await loadClientData(element?.client)  // Await client data
            const userData = await loadUserData(clientData?.user)  // Await user data

            const div = document.createElement('div')
            div.innerHTML = `
                <div class="shadow-xl border rounded-xl" style="border: 0.1px solid grey; margin: 30px; margin-left: 50px; padding: 15px">
                    <div>
                        <h3 class="text-xl font-bold mb-3">${element?.title}</h3>
                        <p>${element?.description.slice(0, 200)}....</p>
                        <p class="mt-3"><b>Budget: </b>${element?.budget}$</p>
                    </div>
                    <div class="flex justify-between items-center">
                        <p><b>Posted by: </b>${userData?.first_name} ${userData?.last_name}</p>
                        <a href="project_details.html?id=${element?.id}">
                        <button class="btn btn-outline btn-sm">See details</button>
                        </a>
                    </div>
                </div>
            `
            parentDiv.appendChild(div)
        }
    } else {
        const div = document.createElement('div')
        div.innerHTML = `<p class="text-center text-2xl mt-5">No projects found</p>`
        parentDiv.appendChild(div)
    }
    
}

const loadCategoriesProject = () => {
    fetch('https://pro-tasker-backend-1.onrender.com/categories/')
       .then(res => res.json())
       .then(data => displayCategoriesProject(data))
}

const displayCategoriesProject = (data) => {
    const parentDiv = document.getElementById('categories-filter')
    parentDiv.innerHTML = ''
    data.forEach(category => {
        const li = document.createElement('li')
        li.style.marginLeft = '10px'
        li.style.marginTop = '5px'
        li.innerHTML = `
            <a onclick="displayProjectsByCategory('${category.category_name}')">
                ${category.category_name}
            </a>
        `
        parentDiv.appendChild(li)
    })
}

const getParams = () => {
    const params = new URLSearchParams(window.location.search).get("search")
    return params
}

const displayProjectsByCategory = (params) => {
    // const params = getParams()
    console.log(params);
    fetch(`https://pro-tasker-backend-1.onrender.com/projects/?search=${params}`)
       .then(res => res.json())
       .then(data => displayProjects(data))
}

loadCategoriesProject()
loadProjects()
