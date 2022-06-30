export const generateUniqueKey = () => {
    const num = Math.floor(Math.random() * 100).toString()
    return Date.now() + num
}

export const initUser = () => {
    let name = localStorage.getItem('plan_name')
    let key = localStorage.getItem('plan_key')
    if (!name) {
        name = prompt('Enter you name')
        localStorage.setItem('plan_name', name)
    }
    if (!key) {
        key = generateUniqueKey()
        localStorage.setItem('plan_key', key)
    }
    return {name, key}
}

export const ROOM_NAME = 'test_room'