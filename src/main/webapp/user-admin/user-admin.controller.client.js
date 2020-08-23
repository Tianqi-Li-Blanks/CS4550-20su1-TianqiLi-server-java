(function () {
    let users = [
        {username: 'alice', password: 'alice', first: 'Alice', last: 'Wonderland', role: 'FACULTY'},
        {username: 'bob', password: 'bob', first: 'Bob', last: 'Marley', role: 'FACULTY'},
        {username: 'charlie', password: 'charlie', first: 'Charlie', last: 'Garcia', role: 'STUDENT'}
    ]

    let $tbody, $addBtn, $updateBtn, $searchBtn;
    let $usernameFld, $passwordFld, $firstFld, $lastFld, $roleFld;
    const service = new AdminUserServiceClient();
    let selectedUser = {};
    $(main);

    function main() {
        $tbody = $('tbody')
        $addBtn = $('.wbdv-create')
        $updateBtn = $('.wbdv-update')
        $searchBtn = $('.wbdv-search')

        $addBtn.click(createUser)
        $updateBtn.click(updateUser)
        $searchBtn.click(searchUser)

        $usernameFld = $('.wbdv-username-fld')
        $passwordFld = $('.wbdv-password-fld')
        $firstFld = $('.wbdv-first-fld')
        $lastFld = $('.wbdv-last-fld')
        $roleFld = $('.wbdv-role-fld')

        findAllUsers()

        const tr = jQuery('tr')
        tr.css('backgroundColor', 'black')
            .css('color', 'white')

        const h1 = jQuery('h1')
        h1.css('color', 'gray')

    }

    function searchUser() {
        const newUser = {
            username: $usernameFld.val(),
            first: $firstFld.val(),
            last:  $lastFld.val(),
            role: $roleFld.val()
        }
        service.findAllUsers()
            .then(function() {
                users = users.filter(
                    function(user) {
                        if(newUser.username === ''){
                            if(newUser.first === ''){
                                if (newUser.last === ''){
                                    if(newUser.role === ''){
                                    }
                                    else{
                                       return user.role=== newUser.role
                                    }
                                }
                                else{
                                    if(newUser.role === ''){
                                        return user.last=== newUser.last
                                    }
                                    else{
                                        return user.last=== newUser.last &&
                                               user.role=== newUser.role
                                    }
                                }
                            }
                            else{
                                if (newUser.last === ''){
                                    if(newUser.role === ''){
                                        return user.first=== newUser.first
                                    }
                                    else{
                                        return user.first=== newUser.first &&
                                               user.role=== newUser.role
                                    }
                                }
                                else{
                                    if(newUser.role === ''){
                                        return user.last=== newUser.last &&
                                               user.first=== newUser.first
                                    }
                                    else{
                                        return user.last=== newUser.last &&
                                               user.role=== newUser.role &&
                                               user.first=== newUser.first
                                    }
                                }

                            }
                        }
                        else{
                            if(newUser.first === ''){
                                if (newUser.last === ''){
                                    if(newUser.role === ''){
                                        return user.username === newUser.username
                                    }
                                    else{
                                        return user.role=== newUser.role &&
                                               user.username === newUser.username
                                    }
                                }
                                else{
                                    if(newUser.role === ''){
                                        return user.last=== newUser.last &&
                                               user.username === newUser.username
                                    }
                                    else{
                                        return user.last=== newUser.last &&
                                               user.role=== newUser.role &&
                                               user.username === newUser.username
                                    }
                                }
                            }
                            else{
                                if (newUser.last === ''){
                                    if(newUser.role === ''){
                                        return user.first=== newUser.first &&
                                               user.username === newUser.username
                                    }
                                    else{
                                        return user.first=== newUser.first &&
                                               user.role=== newUser.role &&
                                               user.username === newUser.username
                                    }
                                }
                                else{
                                    if(newUser.role === ''){
                                        return user.last=== newUser.last &&
                                               user.first=== newUser.first &&
                                               user.username === newUser.username
                                    }
                                    else{
                                        return user.last=== newUser.last &&
                                               user.role=== newUser.role &&
                                               user.first=== newUser.first &&
                                               user.username === newUser.username
                                    }
                                }
                            }
                        }
                    }
                )
                renderUsers(users)
                service.findAllUsers()
                    .then(function (allUsers) {
                        users = allUsers
                    })
            })
    }


    function createUser() {
        const newUser = {
            username: $usernameFld.val(),
            first: $firstFld.val(),
            last:  $lastFld.val(),
            role: $roleFld.val()
        }
        service.createUser(newUser)
            .then(function (actualUser) {
                users.push(actualUser)
                renderUsers(users)
            })
    }

    function findAllUsers() {
        service.findAllUsers()
            .then(function (allUsers) {
                users = allUsers
                renderUsers(users)
            })
    }

    function deleteUser(event) {
        const target = event.currentTarget
        const $button = $(target)
        const userId = $button.attr('id')
        service.deleteUser(userId)
            .then(function() {
                users = users.filter(function(user) {
                    return user._id !== userId
                })
                renderUsers(users)
            })
    }

    function selectUser(event) {
        const target = event.currentTarget
        const $button = $(target)
        const userId = $button.attr('id')
        service.findUserById(userId)
            .then(function (user) {
                renderUser(user)
            })
    }

    function updateUser() {
        const updatedUser = {
            _id: selectedUser._id,
            username: $usernameFld.val(),
            password: $passwordFld.val(),
            first: $firstFld.val(),
            last: $lastFld.val(),
            role: $roleFld.val()
        }
        service.updateUser(selectedUser._id, updatedUser)
            .then(function() {
                users = users.map(function(user) {
                    if(user._id === selectedUser._id) {
                        return updatedUser
                    } else {
                        return user
                    }
                })
                renderUsers(users)
            })
    }

    function renderUser(user) {
        selectedUser = user
        $usernameFld.val(user.username)
        $passwordFld.val(user.password)
        $firstFld.val(user.first)
        $lastFld.val(user.last)
        $roleFld.val(user.role)
    }

    function renderUsers(users) {
        const template = $('.wbdv-user-row-template')[0]
        const $template = $(template)
        const clone = $template.clone()
        $tbody.empty()
        for(let i=0; i<users.length; i++) {
            const user = users[i]
            const copy = clone.clone()
            copy.find('.wbdv-username').html(user.username)
            copy.find('.wbdv-first-name').html(user.first)
            copy.find('.wbdv-last-name').html(user.last)
            copy.find('.wbdv-role').html(user.role)
            copy.find('.wbdv-remove')
                .attr('id', user._id)
                .click(deleteUser)
            copy.find('.wbdv-edit')
                .attr('id', user._id)
                .click(selectUser)
            $tbody.append(copy)
        }
    }

})()