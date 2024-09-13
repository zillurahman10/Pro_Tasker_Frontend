async function loadClientData(params) {
    const response = await fetch(`https://pro-tasker-backend-1.onrender.com/clients/${params}/`);
    const data = await response.json();
    return data;
}

async function loadUserData(params) {
    const response = await fetch(`https://pro-tasker-backend-1.onrender.com/users/${params}/`);
    const data = await response.json();
    return data;   
}

async function loadFreelancerData() {
    const freelancerId = localStorage.getItem('freelancer_id');
    const response = await fetch(`https://pro-tasker-backend-1.onrender.com/freelancers/${freelancerId}/`);
    const data = await response.json();
    return data;
}

async function loadPortfolioData(params) {
    const response = await fetch(`https://pro-tasker-backend-1.onrender.com/portfolios/${params}`);
    const data = await response.json();
    return data;
}

async function loadProjectData(params) {
    const response = await fetch(`https://pro-tasker-backend-1.onrender.com/projects/${params}`);
    const data = await response.json();
    return data;
}

const loadAllProjects = async () => {
    const response = await fetch('https://pro-tasker-backend-1.onrender.com/projects/');
    const data = await response.json();
    return data;
}

async function loadProposalData () {
    const response = await fetch(`https://pro-tasker-backend-1.onrender.com/proposals/`);
    const data = await response.json();
    return data;
}

const showProfileInfo = async () => {
   const user_id = localStorage.getItem('user_id')
    const userData = await loadUserData(user_id)
    console.log(userData);
    const profile_container = document.getElementById('profile_info')
    profile_container.innerHTML = `
        <div class="bg-white m-5 p-5 rounded-xl mx-auto" style="width: 20%;">
            <h3>Name: ${userData.first_name} ${userData.last_name}</h3>
            <h3>Email: ${userData.email}</h3>
            <h3>Member since: ${userData.date_joined.slice(0, 10)}</h3>
            
            `
}

const showTable = async () => {
    const freelancerData = await loadFreelancerData();
    // const portfolioData = await loadPortfolioData(freelancerData.portfolio)
    const userData = await loadUserData(freelancerData.user);
    const proposalData = await loadProposalData();
    
    const filteredProposal = proposalData.filter(proposal => proposal.freelancer == freelancerData.id);

    const table = document.getElementById('proposal_table');
    table.innerHTML = "";

    // Using for...of loop to work with await
    for (const proposal of filteredProposal) {
        const projectData = await loadProjectData(proposal.project)
        console.log(projectData);
        const clientData = await loadClientData(projectData.client);
        const userData = await loadUserData(clientData.user)        
        // console.log(projectData);
        const tr = document.createElement('tr');
        tr.classList.add('hover');
        tr.innerHTML = `
            <th>${proposal.id}</th>
            <td>${userData.first_name} ${userData.last_name}</td>
            <td>${projectData.title.slice(0, 20)}...</td>
            <td>${proposal.status}</td>
            <td><button class="btn btn-neutral btn-outline btn-xs">Details</button></td>
        `;
        table.appendChild(tr);
    }
};

const showProfile = async () => {
    const user_id = localStorage.getItem('user_id')
    const userData = await loadUserData(user_id)
    const user_type = localStorage.getItem('user_type')
    const profile_container = document.getElementById('profile_container')

    if(user_type == "Freelancer") {
        profile_container.innerHTML = `
        <div>
        <h1 class="text-center text-xl font-bold m-5">Your Applied Projects</h1>
          <div class="overflow-x-auto mx-auto" style="width: 800px; border: 0.1px solid gray; border-radius: 10px;">
              <table class="table">
                <!-- head -->
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Client Name</th>
                    <th>Project Title</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody id="proposal_table">
                </tbody>
              </table>
            </div>
      </div>
        `
    }
    if(user_type == 'client') {
        profile_container.innerHTML = `
        <h1 class="text-xl text-center font-bold m-5">Your Posted Projects</h1>
        <div class="overflow-x-auto mx-auto" style="width: 800px; border: 0.1px solid gray; border-radius: 10px;">
          <table class="table">
            <!-- head -->
            <thead>
              <tr>
                <th>ID</th>
                <th>Project Name</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="project_table">
            </tbody>
          </table>
        </div>
        `;

        // Call showProjects() here after the DOM is updated
        await showProjects();
    }
}


const showProjects = async () => {

    const table = document.getElementById('project_table');
    table.innerHTML = "";

    const projects = await loadAllProjects()
    console.log(projects);
    const client_id = localStorage.getItem('client_id')
    console.log(client_id);
    filteredProjects = projects.filter(project => project.client == client_id)
    console.log(filteredProjects);

    for (const project of filteredProjects) {
        const tr = document.createElement('tr');
        tr.classList.add('hover');
        tr.innerHTML = `
            <th>${project.id}</th>
            <td>${project.title.slice(0, 16)}... </td>
            <td>${project.deadline.slice(0, 10)}</td>
            <td>${project.is_completed === "False" ? "Not Completed" : "Completed"}</td>
            <td><a href="https://pro-tasker-zr.netlify.app/project_details.html?id=${project.id}" alt=""> <button class="btn btn-neutral btn-outline btn-xs">Details</button></a></td>
        `;
        table.appendChild(tr);
    }
}

showProfile()

showProjects()
showProfileInfo()

showTable()