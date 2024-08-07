const initialState = {
    myRecipes: [],
    page: 1,
    searchStr: "",
    limit: 6
}

export const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_MY_RECIPE":
            return {
                ...state,
                myRecipes: [...state.myRecipes, action.recipe],
                page: Math.ceil(state.myRecipes.length / state.limit) + 1
            }
        case "DELETE_MY_RECIPE":
            return {
                ...state,
                myRecipes: [],
                page: 1,
                searchStr: action.searchStr
            }
        case "CHANGE_MY_RECIPE":
            return {
                ...state,
                myRecipes: state.myRecipes.map((el) => {
                    if (el.id === action.recipe.id) {
                        return action.recipe
                    }
                    return el
                })
            }
        default:
            return state
    }
}

export const addMyRecipesAction = (value) => ({
    type: "ADD_MY_RECIPE",
    recipe: value
})
export const deleteMyRecipesAction = (searchStr) => ({
    type: "DELETE_MY_RECIPE",
    searchStr: searchStr
})
export const changeMyRecipesAction = (value) => ({
    type: "CHANGE_MY_RECIPE",
    recipe: value
})
