const getParams = () => {
    const clientId = new URLSearchParams(window.location.search).get("client_id")
    const projectId = new URLSearchParams(window.location.search).get("project_id")
    return {clientId: clientId, projectId: projectId}
}

const postProposal = (event) => {
    event.preventDefault()
    const params = getParams()
    
    const bid = document.getElementById('bid')
    const cover_letter = document.getElementById('cover_letter')
    const freelanerId = localStorage.getItem('freelancer_id')
    console.log(freelanerId);
    const data = {
        bid: Number(bid.value),
        cover_letter: cover_letter.value,
        client: Number(params.clientId),
        project: Number(params.projectId),
        freelancer: Number(freelanerId)
    }

    console.log(data);

    fetch('http://127.0.0.1:8000/proposals/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        if(data.id) {
            showToastSuccess("Proposal Posted Successfully")
            location.replace('http://127.0.0.1:5500/profile.html')
        }
    })
}