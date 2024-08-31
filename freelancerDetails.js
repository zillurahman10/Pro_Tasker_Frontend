const getId = () => {
    const params = new URLSearchParams(window.location.search).get("freelancerId")
    return params
}

const loadFreelancer = () => {
    const params = getId()
    fetch(`http://127.0.0.1:8000/freelancers/${params}`)
    .then(res => res.json())
    .then(data => displayFreelancer(data))
}

async function findFreelancersUserData(id) {

  const response = await fetch(`http://127.0.0.1:8000/users/${id}`);
  const data = await response.json();
  return data;

}

async function loadPortfolio(id) {
    const response = await fetch(`http://127.0.0.1:8000/portfolios/${id}`);
    const data = await response.json();
    console.log(data);
    return data;
}

const displayFreelancer = (freelancerData) => {
    console.log(freelancerData);
    const portfolioData = loadPortfolio(freelancerData?.portfilio)
    const userData = findFreelancersUserData(freelancerData?.user)
    // console.log(userData);
    userData.then(data => {
      console.log(data);
      const parentDiv = document.getElementById('details')
    parentDiv.innerHTML = `
    <div class="grid lg:grid-cols-2 sm:grid-cols-1 mx-auto" style="width: 100%">
    
    <div class="card card-side bg-base-100 shadow-xl mx-auto" style="width:700px; margin-top: 50px; margin-left: 50px">
        <figure>
          <img src="${freelancerData?.image}" alt="Photo" />
        </figure>
      <div class="card-body">
        <h2 class="card-title">${data.first_name} ${data.last_name}</h2>
        <p class="normal-text"><b>Ratings:</b> ${freelancerData?.rating}</p>
        <p class="normal-text"><b>Job Title:</b> ${freelancerData?.category}</p>
        <p class="normal-text"><b>Skills:</b> ${freelancerData?.skills}</p>
        <p class="normal-text"><b>Location: </b> ${freelancerData?.location}</p>
      </div>
    </div>
    <div>
    <p class="shadow-xl rounded-xl mx-auto" style="margin-top: 50px; width: 500px; padding: 30px">${freelancerData?.descriptions}</p>
    </div>
    </div>



    <div>
    <h2>Portfolios</h2>
      <div class=" min-h-screen">
  <div class="hero-content flex-col lg:flex-row">
    <img
      src="${portfolioData}"
      class="max-w-sm rounded-lg shadow-2xl" />
    <div>
      <h1 class="text-5xl font-bold">Box Office News!</h1>
      <p class="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
      <button class="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
    </div>
    `
    })
    
}

loadFreelancer()