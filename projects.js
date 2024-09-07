const loadProjects = () => {
    fetch('http://127.0.0.1:8000/projects/')
       .then(res => res.json())
       .then(data => displayProjects(data))
}

async function loadClientData (id) {
    const response = await fetch(`http://127.0.0.1:8000/users/${id}`);
    const data = await response.json();
    return data;
}

const displayProjects = (data) => {
    const parentDiv = document.getElementById('projects')

    parentDiv.innerHTML = ''
    if (data.length > 0) {
        data.forEach(element => {
            const userData = loadClientData(element?.client)
            userData.then((user) => {
                const div = document.createElement('div')
                div.innerHTML = `
                    <div class="shadow-xl border rounded-xl" style="border: 0.1px solid grey; margin: 50px; padding: 15px">
                        <div>
                            <h3 class="text-xl font-bold mb-3">${element?.title}</h3>
                            <p>${element?.description.slice(0, 200)}....</p>
                            <p class="mt-3"><b>Budget: </b>${element?.budget}$</p>
                        </div>
                        <div class="flex justify-between items-center">
                            <p><b>Posted by: </b>${user?.first_name} ${user?.last_name}</p>
                            <a href="project_details.html?id=${element?.id}">
                            <button class="btn btn-outline btn-sm">See details</button>
                            </a>
                        </div>
                    </div>
                `
                parentDiv.appendChild(div)
            })
        });
    }
    else {
        const div = document.createElement('div')
        div.innerHTML = `<p class="text-center text-2xl mt-5">No projects found</p>`
        parentDiv.appendChild(div)
    }
    
}

const loadCategoriesProject = () => {
    fetch('http://127.0.0.1:8000/categories/')
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
    fetch(`http://127.0.0.1:8000/projects/?search=${params}`)
       .then(res => res.json())
       .then(data => displayProjects(data))
}

loadCategoriesProject()

loadProjects()