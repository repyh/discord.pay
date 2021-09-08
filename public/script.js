const save = document.getElementById('save-id');

window.onload = () => {
    if(localStorage.getItem('user_id')) {
        userID.value = localStorage.getItem('user_id');
        save.checked = true;
    }
}
