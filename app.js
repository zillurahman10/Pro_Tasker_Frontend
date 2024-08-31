const loadCategories = () => {
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
        <div style="width: 200px; height: 240px" class="card-animation service p-3 card shadow hover:shadow-xl border m-3">
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

const loadFreelancerByCategory = (category) => {

}

loadCategories()