const ADDITEM = 'ADD_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const EDIT_ITEM = 'EDIT_ITEM';
const TOGGLE_COMPLETE = 'TOGGLE_COMPLETE';

const addItem = (item) => {
    return {
        type: ADDITEM,
        payload: item
    }
}

const deleteItem = (id) => {
    return {
        type: DELETE_ITEM,
        payload: id
    }
}

const editItem = (id, item) => {
    return {
        type: EDIT_ITEM,
        payload: {
            id,
            item
        }
    }
}

const toggleComplete = (id) => {
    return {
        type: TOGGLE_COMPLETE,
        payload: id
    }
}

export {
    addItem,
    deleteItem,
    editItem,
    toggleComplete
}