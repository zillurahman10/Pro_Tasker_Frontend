const loadCategoriesHome = () => {
    fetch('http://127.0.0.1:8000/categories/')
        .then(res => res.json())
        .then(data => displayCategories(data))
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

const navbar = () => {
    const div = document.getElementById("my-navbar")
    if(localStorage.getItem("token")){
        div.innerHTML = `
        <div>
        <a href="projects.html" class="mr-3">Projects</a>
        <a href="freelancer.html" class="mr-3">Freelancers</a>
        </div>
                <div class="dropdown dropdown-end mr-3">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul tabindex="0"
                        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a>Profile</a></li>
                        <li><a href="create_freelancer.html">Be A Freelancer</a></li>
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

navbar()

loadCategoriesHome()