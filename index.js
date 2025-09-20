document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault(); 
    
    const userName = document.querySelector('#name').value;
    const userEmail = document.querySelector('#email').value;

    submitData(userName, userEmail);
});

function submitData(name, email) {
    const formData = {
        name: name,
        email: email,
    };

    const configurationObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(formData),
    };

    return fetch("http://localhost:3000/users", configurationObject)
        .then(response => {
            if (!response.ok) {
                throw new Error('Unauthorized Access'); 
            }
            return response.json();
        })
        .then((userData) => {
            const userId = document.querySelector('#user-id');
            userId.textContent = String(userData.id); 
            console.log(userData);
            return userData;
        })
        .catch(error => {
            const errorMsg = document.querySelector('#errorMsg');
            errorMsg.textContent = error.message; 
            document.body.appendChild(errorMsg);
        });
}