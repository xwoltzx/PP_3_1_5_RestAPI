const URL = "http://localhost:8888/admin/api";
$(document).ready(function () {

    window.addEventListener('load', show);

});
class Role {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
const infoTable = $('.info_table');
function info() {

    infoTable.empty();
    fetch(URL).then(response => response.json())
        .then(users => {
            let roles = '';
            users[users.length - 1].authorities.forEach(role => {
                roles += role.name + ' ';
            });
    let row = `$(<tr onmouseover="this.style.background=\'#F8F9FA\'" onmouseout="this.style.background=\'white\'">
                            <td>${users[users.length - 1].id}</td>
                            <td>${users[users.length - 1].username}</td>
                            <td>${users[users.length - 1].password.substring(0, 10) + "..."}</td>
                            <td>${users[users.length - 1].name}</td>
                            <td>${users[users.length - 1].age}</td>
                            <td>${users[users.length - 1].email}</td>
                            <td>${roles}</td>
                            
                        </tr>)`;
    infoTable.append(row);
})}
function show() {
    const usersTable = $('.users-table');
    usersTable.empty();
    fetch(URL).then(response => response.json())
        .then(users => {
            let ownerusername = document.getElementById("owner-username");
            ownerusername.textContent = users[users.length - 1].username;
            let ownerrole = document.getElementById("owner-roles");
            let roles = '';
            users[users.length - 1].authorities.forEach(role => {
                roles += role.name + ' ';
            });
            ownerrole.textContent = roles;
            users.pop();
            users.forEach(user => {
                let roles1 = '';
                user.authorities.forEach(role => {
                    roles1 += role.name + ' ';
                });
                let row = `$(<tr onmouseover="this.style.background=\'#F8F9FA\'" onmouseout="this.style.background=\'white\'">
                            <td>${user.id}</td>
                            <td>${user.username}</td>
                            <td>${user.password.substring(0, 10) + "..."}</td>
                            <td>${user.name}</td>
                            <td>${user.age}</td>
                            <td>${user.email}</td>
                            <td>${roles1}</td>
                            <td>

                                            <button type="button" class="btn btn-primary" data-toggle="modal"  onclick=${'edit('+user.id+')'} href="#modality" style="background-color: #17A2B8; color: white">
                                                Edit
                                            </button>
                                        </td>

                                        <td>
                                                <button type="submit" class="btn btn-primary" onclick=${'del('+user.id+')'} style="background-color: #DC3545; color: white" >
                                                Delete
                                                </button>
                                        </td>
                        </tr>)`;
                usersTable.append(row);
            })
        }).catch(err => console.error(err));
}
async function del(id) {
    try {
        const response = await fetch("http://localhost:8888/admin/" + id, {
            method: 'DELETE'
        }).then(resp => console.log(resp)).then(show);
    } catch (e) {
        console.error(e);
    }
}
async function edit(id) {
    let body = "";
    let url = "http://localhost:8888/admin/" + id;
    fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            body += `
            <form className="text-center" id="formEditUser">
                    <div class="form-group">
                    <label class="font-weight-bold" for="id">Id:</label>
                    <input class="form-control" type="text" id="id" name="id" value="${data.id}" readonly>
                </div>
                <div class="form-group">
                    <label class="font-weight-bold" for="name">Username:</label>
                    <input class="form-control" type="text" id="username" name="username" value="${data.username}">
                </div>
                <div class="form-group">
                    <label class="font-weight-bold" for="name">Name:</label>
                    <input class="form-control" type="text" value="${data.name}" id="name" name="name">
                </div>
                <div class="form-group">
                    <label class="font-weight-bold" for="password">Password:</label>
                    <input class="form-control" type="password" value="${data.password}" name="password" id="password">
                </div>
                <div class="form-group">
                    <label class="font-weight-bold" for="age">Age:</label>
                    <input class="form-control" type="number" value="${data.age}" name="age" id="age">
                </div>
                <div class="form-group">
                    <label class="font-weight-bold" for="email">Email:</label>
                    <input class="form-control" type="text" value="${data.email}" name="email" id="email">
                </div>
                <div class="form-group" style="display: flex; flex-direction: column">
                    <label class="font-weight-bold" for="roles">Role:</label>
                      <select multiple class="mb-3 custom-select" id="roles" name="roles">
                        <option value="2">Admin</option>
                        <option value="1">User</option>
                      </select>
                </div>
            </form>`
            document.querySelector('.modal-body').innerHTML = body;
        })
        .catch((err) => {
            console.log(err);
        })
}

async function newUser() {
    const url = "http://localhost:8888/admin/";

    const form = document.getElementById("form-new-user");

    const formData = new FormData(form);
    let currentRoles = [];
    const existingRoles = Array.from(formData.getAll('EditRoleSelect1'));

    for (let i = 0; i < existingRoles.length; i++) {
        const id = existingRoles[i];
        const role = id == 2 ? `ROLE_ADMIN` : `ROLE_USER`;
        currentRoles.push(new Role(id, role));
    }

    let data = {
        username: formData.get('editUsername1'),
        password: formData.get('editPassword1'),
        name: formData.get('editName1'),
        age: formData.get('editAge1'),
        email: formData.get('editEmail1'),
        roles: currentRoles
    }
    console.log(JSON.stringify(data))
    try {
        console.log(JSON.stringify(data));
        const response = await fetch(url+'new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json()).then(data => {
            form.reset();
            show();
        })
    } catch (err) {
        alert(err.name);
        console.log(err)
    }

}
usersTableCard = $('#tab_users');
newUserCard = $('#tab_info');
document.querySelector("#addNewUser").addEventListener('click', newUser);
$("#addNewUser").click(() => {
    if (!usersTableCard.attr('class').includes('active')) {
        show();
        $('#tab1').attr('class', "tab-pane fade show active");
        $('#tab2').attr('class', "tab-pane fade");
        usersTableCard.attr('class', "nav-link active");
        newUserCard.attr('class', "nav-link text-primary");
        document.querySelector('#tab2').style.display = "none";
        document.querySelector('#tab1').style.display = "block";
    }
})
usersTableCard.click(() => {
    if (!usersTableCard.attr('class').includes('active')) {
        $('#tab1').attr('class', "tab-pane fade show active");
        $('#tab2').attr('class', "tab-pane fade");
        usersTableCard.attr('class', "nav-link active");
        newUserCard.attr('class', "nav-link text-primary");
        document.querySelector('#tab2').style.display = "none";
        document.querySelector('#tab1').style.display = "block";
        show();
    }
})
newUserCard.click(() => {
    if (!newUserCard.attr('class').includes("active")) {
        show();
        $('#tab1').attr('class', "tab-pane fade");
        $('#tab2').attr('class', "tab-pane fade show active");
        newUserCard.attr('class', "nav-link active");
        usersTableCard.attr('class', "nav-link text-primary");
        document.querySelector('#tab2').style.display = "block";
        document.querySelector('#tab1').style.display = "none";
    }
});
adminPanel = $('#admin');
infoPanel = $('#user');
$('#admin_tab').click(() => {
    if (!adminPanel.attr('class').includes('active')) {
        document.querySelector('#admin_tab').style.background = "#007BFF";
        document.querySelector('#admin_tab').style.color = "#FFFFFF";
        document.querySelector('#user_tab').style.background = "#F0F0F0";
        document.querySelector('#user_tab').style.color = "#000000";
        adminPanel.attr('class', "tab-pane fade show active");
        infoPanel.attr('class', "tab-pane fade");
        document.querySelector('#user').style.display = "none";
        document.querySelector('#admin').style.display = "block";
        infoTable.empty();
        show();
    }
})
$('#user_tab').click(() => {
    if (!infoPanel.attr('class').includes("active")) {
        document.querySelector('#user_tab').style.background = "#007BFF";
        document.querySelector('#admin_tab').style.color = "#000000";
        document.querySelector('#admin_tab').style.background = "#F0F0F0";
        document.querySelector('#user_tab').style.color = "#FFFFFF";
        adminPanel.attr('class', "tab-pane fade");
        infoPanel.attr('class', "tab-pane fade show active");
        document.querySelector('#user').style.display = "block";
        document.querySelector('#admin').style.display = "none";
        info();
    }
});
async function editUser() {
    let currentRoles = [];
    const formData = await new FormData(await document.querySelector("#formEditUser"));
    const existingRoles = Array.from(formData.getAll('roles'))

    for (let i = 0; i < existingRoles.length; i++) {
        const id = existingRoles[i];
        const name = id == 2 ? `ROLE_ADMIN` : `ROLE_USER`;
        currentRoles.push(new Role(id, name));
    }
    let data = {
        id: formData.get('id'),
        username: formData.get('username'),
        name: formData.get('name'),
        age: formData.get('age'),
        email: formData.get('email'),
        password: formData.get('password'),
        roles: currentRoles
    }
    console.log(data)
    try {
        const response = await fetch("http://localhost:8888/admin/edit", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json()).then(data => {
            show();
        })
    } catch (err) {
        console.log(err);
    }
}

//click to edit user
document.querySelector('#editInfo').addEventListener('click', editUser);
