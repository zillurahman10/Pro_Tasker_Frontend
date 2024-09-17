const getId = () => {
  const params = new URLSearchParams(window.location.search).get("freelancerId")
  return params
}

const loadFreelancer = () => {
  const params = getId()
  fetch(`https://pro-tasker-backend-1.onrender.com/freelancers/${params}/`)
    .then(res => res.json())
    .then(data => displayFreelancer(data))
}

async function findFreelancersUserData(id) {

  const response = await fetch(`https://pro-tasker-backend-1.onrender.com/users/${id}`);
  const data = await response.json();
  return data;

}

async function loadPortfolio(id) {
  const response = await fetch(`https://pro-tasker-backend-1.onrender.com/portfolios/${id}`);
  const data = await response.json();
  console.log(typeof data);
  return data;
}

const displayFreelancer = async (freelancerData) => {
  console.log(freelancerData);
  const portfolioData = await loadPortfolio(freelancerData?.portfilio)  
  console.log(portfolioData);
  const userData = findFreelancersUserData(freelancerData?.user)
  userData.then(data => {
    console.log(data);
    const parentDiv = document.getElementById('details')
    parentDiv.innerHTML = `
    <div class="border" style="width: 350px; margin-top: 50px; margin-left: 50px">
  <div class="bg-base-100 shadow-xl mx-auto rounded-xl" style="padding: 10px">
    <figure class="flex justify-center mt-3">
      <img src="${freelancerData?.image}" alt="Photo" style="width: 150px; height: 150px; border-radius: 150px" />
    </figure>
    <div>
      <h2 class="font-bold text-center mt-3">${data.first_name} ${data.last_name}</h2>
      <p class="normal-text text-center">${freelancerData?.rating}</p>
      <div class="px-5 py-2">
        <p class="normal-text mt-5"><b>Title: </b>${freelancerData?.category}</p>
        <p class="normal-text"><b>Skills:</b> ${freelancerData?.skills}</p>
        <p class="normal-text"><b>Location: </b>${freelancerData?.location}</p>
        <p class="normal-text"><b>Member Since: </b>${data?.date_joined.slice(0, 10)}</p>
      </div>
    </div>
  </div>
</div>

<div class="shadow-xl rounded-xl border" style="margin-top: 10px; margin-left: 50px; padding: 30px; width: 350px">
  <p class="font-bold mb-4">About Description</p>
  <p>${freelancerData?.descriptions}</p>
</div>

<h2 class="text-cyan-500 font-bold text-2xl" style="margin-left: 50px; margin-top:50px">Portfolios</h2>
<div style="width: 400px; margin-left: 30px">
  <div class="shadow hover:shadow-xl border p-5 m-5 rounded-xl">
    <div>
      <img src="${portfolioData?.image}" class="rounded-lg shadow-2xl" />
      <div>
        <h1 class="text-2xl font-bold mt-4">${portfolioData?.name}</h1>
        <p class="py-6">
          ${portfolioData?.description.slice(0, 100)}...
        </p>
        <button class="btn btn-outline btn-sm">
          <a target="_blank" href="${portfolioData?.link}">Live link</a>
        </button>
      </div>
    </div>
  </div>
</div>

    `
  })

}

loadFreelancer()