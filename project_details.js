const getParams = () => {
    const params = new URLSearchParams(window.location.search).get("id")
    return params
}

const loadProjectDetails = () => {
    const id = getParams()
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
    const userData = await findClientData()
    const parentDiv = document.getElementById('project_details')
    parentDiv.innerHTML = `
        <h2>${userData.name}</h2>
        <p>${userData.email}</p>
    `
}

loadProjectDetails()