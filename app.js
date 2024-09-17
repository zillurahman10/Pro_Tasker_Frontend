const loadCategoriesHome = () => {
    fetch('https://pro-tasker-backend-1.onrender.com/categories/')
        .then(res => res.json())
        .then(data => displayCategories(data))
}
const loadFreelancersHome = () => {
    fetch('https://pro-tasker-backend-1.onrender.com/freelancers/')
        .then(res => res.json())
        .then(data => displayFreelancersHome(data))
}

const displayCategories = (data) => {
    const parentDiv = document.getElementById("categories");
    parentDiv.innerHTML = "";
    data.forEach(info => {
        const div = document.createElement("div");
        div.innerHTML = `
        <a href="filtered_freelancers.html?category=${info.category_name}">
        <div style="width: 200px; height: 240px" class="card-animation service p-3 card shadow border m-3">
            <div class="card-body">
                <img style="width: 75%;" class="mx-auto" src="${info?.image}" alt="">
                <h3 class="text-center font-bold">${info?.category_name}</h3>
            </div>
        </div>
        </a>
        `;
        parentDiv.appendChild(div);
    });
}
const displayFreelancersHome = (data) => {
    const parentDiv = document.getElementById("freelancers");
    parentDiv.innerHTML = "";
    data.forEach(element => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div style="" class="border shadow p-5 rounded-xl shadow bg-white">
            <div>
                <img class="" style="width:200px; height:200px; border-radius: 10px" src="${element?.image}" alt="">
            </div>
            <div>
                <h4 class="mt-3 font-bold">${element?.first_name} ${element?.last_name}</h4>
                <p class="mt-1"><small>Ratings: </small>${element?.rating}</p>
                <button class="mt-2 btn btn-outline btn-sm">
                    <a href="freelancerDetails.html?freelancerId=${element?.id}">View Details ></a>
                </button>
            </div>
        </div>
        `;
        parentDiv.appendChild(div);
    });
}

const navbar = () => {
    const div = document.getElementById("my-navbar")
    const user_type = localStorage.getItem("user_type");
    if(localStorage.getItem("token")){
        div.innerHTML = `
        <div>
        <a href="projects.html" class="btn btn-sm">Projects</a>
        <a href="freelancer.html" class="btn btn-sm">Freelancers</a>
        ${user_type == "Freelancer" ? "" : '<a href="create_project.html" class="btn-sm btn">Post Project</a>'}
        </div>
                <div class="dropdown dropdown-end mr-3">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component"
                                src="images/profile.png" />
                        </div>
                    </div>
                    <ul tabindex="0"
                        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a href="profile.html">Profile</a></li>
                        ${user_type === "Freelancer" ? "" : '<li id="create_freelancer"><a href="create_freelancer.html">Be A Freelancer</a></li>'}

                        
                        <li onclick="handleLogout()"><a>Logout</a></li>
                    </ul>
                    
                </div>
        `
    }
    else{
        div.innerHTML = `
        <div class="dropdown dropdown-end">
        <div class="flex items-center">
                        <a href="login.html">
                            <button class="btn btn-neutral btn-outline btn-sm mr-4">Sign In</button>
                        </a>
                        <p class="mr-4"> | </p>
                        <a href="regsiter.html">
                            <button class="btn btn-active btn-sm mr-4">Sign Up</button>
                        </a>
                    </div>
        </div>
        `
    }
}

const handleCreateFreelancer = () => {
    const nav_freelancer = document.getElementById("create_freelancer")
    if(localStorage.getItem("is_freelancer") === "Yes"){
        nav_freelancer.innerHTML = ""
    }
    else{
        nav_freelancer.innerHTML = `<a href="create_freelancer.html">Be A Freelancer</a>`
    }
}

// handleCreateFreelancer

navbar()

loadCategoriesHome()

loadFreelancersHome()

