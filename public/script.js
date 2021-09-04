const form = document.querySelector('form');
const items = document.getElementById('items');
const userID = document.getElementById('inputUser');
const host = 'http://localhost:2000';

form.addEventListener('submit', async e => {
    e.preventDefault();
    fetch(`${host}/checkout?user_id=${userID.value}&item=${items.value}`, {
        method: 'POST'
    }).then(async res => {
        const response = await res.json();
        return window.location.replace(response.redirect);
    })
})