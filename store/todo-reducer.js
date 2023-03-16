const todoReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_ITEM":
            return [...state, action.payload];
        case "DELETE_ITEM":
            return state.filter((item) => item.id !== Number(action.payload));
        case "TOGGLE_COMPLETE":
            return state.map((item) => {
                if (item.id === Number(action.payload)) {
                    return {
                        ...item,
                        completed: !item.completed
                    }
                }
                return item;
            });
        case "EDIT_ITEM":
            return state.map((item) => {
                if (item.id === Number(action.payload.id)) {
                    return {
                        ...item,
                        value: action.payload.item
                    }
                }
                return item;
            });
        default:
            return state;
    }
}
export default todoReducer;
