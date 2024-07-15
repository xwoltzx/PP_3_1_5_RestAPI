const URL = "http://localhost:8888/user/api";

fetch(URL).then(response => response.json())
    .then(user => {
        let ownerusername = document.getElementById("owner-username");
        ownerusername.textContent = user.username;
        let ownerrole = document.getElementById("owner-role");
        let roles = '';
        user.roles.forEach(role => { roles += role.name + ' ';});
        ownerrole.textContent = roles.trim();
        let body = `<tr onmouseover="this.style.background='#F8F9FA'" onmouseout="this.style.background='white'">
        <td>${user.id}</td>
        <td>${user.username}</td>
        <td>${user.password}</td>
        <td>${user.name}</td>
        <td>${user.age}</td>
        <td>${user.email}</td>
        <td>${roles}</td>
    </tr>`;

        document.querySelector('#table-user').innerHTML = body;
})