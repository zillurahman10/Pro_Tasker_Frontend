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
    console.log(data);
    const parentDiv = document.getElementById('projects')

    parentDiv.innerHTML = ''
    data.forEach(element => {
        const userData = loadClientData(element?.client)
        userData.then((user) => {
            console.log(user);
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
                        <a href="project_details.html">
                        <button class="btn btn-outline btn-sm">See details</button>
                        </a>
                    </div>
                </div>
            `
            parentDiv.appendChild(div)
        })
    });
}

loadProjects()