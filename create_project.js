async function loadCategories (id) {
    const response = await fetch(`https://pro-tasker-backend-1.onrender.com/categories/`);
    const data = await response.json();
    return data;
}

const displayForm = async () => {
  const div = document.getElementById("create_form");

  const categories = await loadCategories()
  console.log(categories);
  div.innerHTML = `
        <form 
            action="" 
            class="my-form shadow-xl p-5"
            method="post"
            enctype="multipart/form-data"
            onsubmit="create_project(event)"    
        >
            <h1 class=" mt-5 mb-5 text-2xl font-bold">Post Project</h1>
                <div class="mb-4">
                    <label for="name" class="block text-sm font-medium text-gray-700">Title<span class="text-red-500 ml-1">*</span></label>
                    <input type="text" name="title" id="title" class="my-input-login rounded  text-gray-500" required>
                </div>
                <div class="mb-4">
                    <label for="name" class="block text-sm font-medium text-gray-700">Description<span class="text-red-500 ml-1">*</span></label>
                    <textarea type="text" name="description" id="description" class="my-input-login rounded  text-gray-500" required></textarea>
                </div>
                <div class="mb-4">
                    <label for="name" class="block text-sm font-medium text-gray-700">Budget<span class="text-red-500 ml-1">*</span></label>
                    <input type="number" name="budget" id="budget" class="my-input-login rounded  text-gray-500" required>
                </div>
                <div class="mb-4">
                    <label for="name" class="block text-sm font-medium text-gray-700">Deadline<span class="text-red-500 ml-1">*</span></label>
                    <input type="datetime-local" name="deadline" id="deadline" class="my-input-login rounded  text-gray-500" required>
                </div>
                <div class="mb-4">
                    <label for="name" class="block text-sm font-medium text-gray-700">Requirements<span class="text-red-500 ml-1">*</span></label>
                    <textarea type="text" name="requirements" id="requirements" class="my-input-login rounded  text-gray-500" required></textarea>
                </div>
                <div class="mb-4">
                    <label for="name" class="block text-sm font-medium text-gray-700">Attachments</label>
                    <input type="file" name="attachments" id="attachments" class="my-input-login rounded  text-gray-500">
                </div>
                <div class="mb-4">
                    <label for="name" class="block text-sm font-medium text-gray-700">Category<span class="text-red-500 ml-1">*</span></label>
                    <select type="text" name="category" id="category" class="my-input-login rounded  text-gray-500" required>
                        ${categories.map(category => 
                            `<option value="${category?.id}">${category.category_name}</option>`
                        ).join("")}
                    </select>
                </div>

            <input class="btn btn-outline btn-wide" style="width: 100%;" type="submit" value="Create">
        </form>
    `;


    
};

const create_project = (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const budget = document.getElementById('budget').value;
    const deadline = document.getElementById('deadline').value;
    const requirements = document.getElementById('requirements').value;
    const category = document.getElementById('category').value;
    const attachments = document.getElementById('attachments').files[0];

    

    const formData = new FormData()
    formData.append('image', attachments)

    fetch("https://api.imgbb.com/1/upload?key=f5fb8576323ae406878d203b40597495", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(img_url => {
        
        const client = localStorage.getItem('client_id');
        const data = {
            title: title,
            description: description,
            budget: budget,
            deadline: deadline,
            project_requirements: requirements,
            category: Number(category),
            client: Number(client),
            attachments: img_url.data.display_url
        };

        console.log(data);

        fetch('https://pro-tasker-backend-1.onrender.com/projects/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.id){
                showToastProject('Project created successfully');
                window.location.replace('https://pro-tasker-zr.netlify.app/projects.html')
            }
        })
    })
}

function showToastProject(message) {
    Swal.fire({
      icon: 'success', // You can use 'success', 'error', 'info', 'warning'
      title: message,
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
  }

displayForm();
