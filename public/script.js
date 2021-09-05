const form = document.querySelector('form');
const items = document.getElementById('items');
const userID = document.getElementById('inputUser');
const save = document.getElementById('save-id');
const host = window.location.protocol + '//' + window.location.host;

window.onload = () => {
    if(localStorage.getItem('user_id')) {
        userID.value = localStorage.getItem('user_id');
        save.checked = true;
    }
}

form.addEventListener('submit', async e => {
    e.preventDefault();
    fetch(`${host}/checkout?user_id=${userID.value}&item=${items.value.split('-')[0].trim()}`, {
        method: 'POST'
    }).then(async res => {
        if(save.checked) localStorage.setItem('user_id', userID.value);
        else localStorage.removeItem('user_id');
        const response = await res.json();
        return window.location.replace(response.redirect);
    })
})
