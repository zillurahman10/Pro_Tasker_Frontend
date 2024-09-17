const createClient = (event) => {
    event.preventDefault();
    const image = document.getElementById('image').files[0];
    const country = document.getElementById('country').value;

    const formData = new FormData();
    formData.append('image', image);
    
    fetch('https://api.imgbb.com/1/upload?key=f5fb8576323ae406878d203b40597495', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(img_url => {
        console.log(img_url.data.display_url);
        const user = localStorage.getItem("user_id");;
        const data = {
            image: img_url.data.display_url,
            country,
            user: Number(user)
        };
        console.log(data);
        fetch('https://pro-tasker-backend-1.onrender.com/clients/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(data => {
            if(data.id) {
                showToastSuccess('Client created successfully');
                localStorage.setItem('client_id', data.id);
                localStorage.setItem('user_type', "client");
                window.location.href = 'index.html';
            }
        })
        .catch(error => console.error('Error:', error)); // Error handling for the second fetch
    })
    .catch(error => console.error('Error uploading image:', error)); // Error handling for the first fetch
};
