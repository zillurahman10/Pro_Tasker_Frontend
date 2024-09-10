// Ensure this function is declared only once
async function loadCategories() {
  const response = await fetch("http://127.0.0.1:8000/categories/");
  const data = await response.json();
  return data;
}

async function loadSkills() {
  const response = await fetch("http://127.0.0.1:8000/skills/");
  const data = await response.json();
  return data;
}

const freelancer_form = async () => {
  const div = document.getElementById("freelancer-form");
  const categories = await loadCategories();
  const skills = await loadSkills();

  div.innerHTML = `
        <form
            action=""
            method="post"
            enctype="multipart/form-data"
            onsubmit="create_freelancer(event)"
            class="my-form shadow-xl p-5"
        >
            <h1 class="ml-2 mt-5 mb-5 text-2xl font-bold">
            Create Freelancer Profile
            </h1>
            <div class="mb-4">
                <label for="name" class="block text-sm font-medium text-gray-700 ml-2">
                    Upload Image
                </label>
                <input
                    type="file"
                    name="username"
                    placeholder="Please place a photo link"
                    id="freelancer_image"
                    class="my-input-big rounded"
                    required
                />
            </div>
            <div class="mb-4">
                <label for="name" class="block text-sm font-medium text-gray-700 ml-2">
                    About Yourself
                </label>
                <input
                    type="text"
                    name="first-name"
                    id="about"
                    class="my-input-big rounded"
                    required
                />
            </div>
            <div class="mb-4">
                <label for="name" class="block text-sm font-medium text-gray-700 ml-2">
                    Location
                </label>
                <input
                    type="text"
                    name="last-name"
                    id="location"
                    class="my-input-big rounded"
                    required
                />
            </div>
            <div class="flex">
            <div class="mb-4 ml-3">
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                    What Profession are you in ?
                </label>
                <select class=" rounded w-full max-w-xs" id="categories" multiple>
                ${categories
                  .map(
                    (category) =>
                      `<option value="${category.slug}">${category.category_name}</option>`
                  )
                  .join("")}
                </select>
            </div>
            <div class="mb-4 ml-3">
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                    What skills do you have ?
                </label>
                <select class=" rounded w-full max-w-xs" id="skills" multiple>
                ${skills
                  .map(
                    (skill) =>
                      `<option value="${skill.slug}">${skill.skill_name}</option>`
                  )
                  .join("")}
                </select>
            </div>
            </div>

            <h1 class="ml-2 mt-5 mb-5 text-2xl font-bold">
            Upload your portfolio
            </h1>
            
            <div class="mb-4">
                <label for="name" class="block text-sm font-medium text-gray-700 ml-2">
                    Name of your project
                </label>
                <input
                    type="text"
                    name="first-name"
                    id="portfolio_name"
                    class="my-input-big rounded"
                    required
                />
            </div>
            <div class="mb-4">
                <label for="name" class="block text-sm font-medium text-gray-700 ml-2">
                    Upload Image
                </label>
                <input
                    type="file"
                    placeholder="Please place a photo link"
                    name="username"
                    id="portfolio_image"
                    class="my-input-big rounded"
                    required
                />
            </div>
            <div class="mb-4">
                <label for="name" class="block text-sm font-medium text-gray-700 ml-2">
                    Description
                </label>
                <input
                    type="text"
                    name="last-name"
                    id="portfolio_description"
                    class="my-input-big rounded"
                    required
                />
            </div>
                <div class="mb-4">
                    <label for="name" class="block text-sm font-medium text-gray-700 ml-2">
                        Live link
                    </label>
                    <input
                        type="text"
                        name="text"
                        id="live_link"
                        class="my-input-big rounded"
                        required
                    />
                </div>
            <input
                class="btn btn-outline btn-wide"
                style="width: 100%"
                type="submit"
                value="Create"
            />
        </form>
    `;
};

const create_freelancer = (event) => {
  event.preventDefault();
  const freelancer_image = document.getElementById("freelancer_image").files[0];
  const about = document.getElementById("about").value;
  const location = document.getElementById("location").value;
  const categories = document.getElementById("categories");
  const selected_categories = Array.from(categories.selectedOptions).map(
    (option) => option.value
  );
  const skills = document.getElementById("skills");
  const selected_skills = Array.from(skills.selectedOptions).map(
    (option) => option.value
  );
  const portfolio_name = document.getElementById("portfolio_name").value;
  const portfolio_image = document.getElementById("portfolio_image").files[0];
  const description = document.getElementById("portfolio_description").value;
  const live_link = document.getElementById("live_link").value;
  const formData = new FormData();
  formData.append("image", freelancer_image);

  fetch("https://api.imgbb.com/1/upload?key=f5fb8576323ae406878d203b40597495", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((freelancer_img) => {
      const formDataPortofolio = new FormData();
      formDataPortofolio.append("image", portfolio_image);
      fetch(
        "https://api.imgbb.com/1/upload?key=f5fb8576323ae406878d203b40597495",
        {
          method: "POST",
          body: formDataPortofolio,
        }
      )
        .then((response) => response.json())
        .then((portfolio_img) => {
          const freelancer_photo = freelancer_img.data.display_url;
          const portfolio_photo = portfolio_img.data.display_url;

          const portfolioData = {
            name: portfolio_name,
            image: portfolio_photo,
            description,
            link: live_link,
          };

          fetch("http://127.0.0.1:8000/portfolios/", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(portfolioData),
          })
            .then((response) => response.json())
            .then((data) => {
              const user_id = localStorage.getItem("user_id");
              const freelancerData = {
                category: selected_categories,
                skills: selected_skills,
                image: freelancer_photo,
                descriptions: about,
                location,
                user: Number(user_id),
                portfilio: data.id,
              };

              console.log(JSON.stringify(freelancerData));

              fetch("http://127.0.0.1:8000/freelancers/", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(freelancerData),
              })
                .then((response) => response.json())
                .then((data) => {
                  if (data.id) {
                    localStorage.setItem("freelancer_id", data.id);
                    localStorage.setItem("user_type", "Freelancer");
                    showToastSuccess("Freelancer Created Successfully");
                    window.location.replace('http://127.0.0.1:5500/index.html')
                  }
                })
                .catch((error) => console.error("Error:", error));
            });
        });
    });


};

freelancer_form();
