const users = [
    {
        id: 1,
        name: 'Manuel'
    },
    {
        id: 2,
        name: 'Angel'
    },
    {
        id: 3,
        name: 'Warrant'
    },
];

export const getIndex = (id) => {
    const index = users.findIndex(user => user.id === id);
    if (index === -1) {
        return null
    }
    return index
}

export const getAllUsers = () => {
    return users;
}

export const getUserById = (id) => {
    id = Number(id);
    return users.find(user => user.id === id);
}

export const postUser = (name) => {
    users.push({
        id: users[users.length - 1].id + 1,
        name
    })

    return users
}

export const putUser = (id, name) => {
    id = Number(id);
    const users = getAllUsers();
    const index = getIndex(id);
    if (!index) return null;
    users[index].name = name;
    return users[index];
}

export const delUser = (id) => {
    if (isNaN(id)) return null;
    const index = users.findIndex(
        user => user.id === id
    );
    if (index === -1) return null
    users.splice(index, 1);
    return true;
}