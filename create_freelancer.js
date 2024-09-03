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
  console.log(categories);




  div.innerHTML = `
        <form
            action=""
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
                ${categories.map(category => `<option value="${category.category_name}">${category.category_name}</option>`).join('')}
                </select>
            </div>
            <div class="mb-4 ml-3">
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                    What skills do you have ?
                </label>
                <select class=" rounded w-full max-w-xs" id="skills" multiple>
                ${skills.map(skill => `<option value="${skill.skill_name}">${skill.skill_name}</option>`).join('')}
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
    const freelancer_image = document.getElementById("freelancer_image").value;
    const about = document.getElementById("about").value;
    const location = document.getElementById("location").value;
    const categories = document.getElementById("categories");
    const selected_categories = Array.from(categories.selectedOptions).map(option => option.value)
    const skills = document.getElementById("skills");
    const selected_skills = Array.from(skills.selectedOptions).map(option => option.value)
    const portfolio_name = document.getElementById("portfolio_name").value;
    const portfolio_image = document.getElementById("portfolio_image").value;
    const description = document.getElementById("portfolio_description").value;
    const live_link = document.getElementById("live_link").value;
    console.log(freelancer_image, about, location, selected_categories, selected_skills, portfolio_name, portfolio_image, description, live_link)
}

freelancer_form();
