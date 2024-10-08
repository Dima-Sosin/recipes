import { useSelector } from "react-redux"

import { RecipeCards } from "../../components/RecipeCards/RecipeCards.tsx"
import { PageLayout } from "../../components/PageLayout/PageLayout"

import { addLikeRecipes, deleteLikeRecipes, selectLikeRecipes } from "../../store/likeRecipesSlice"

export const LikeRecipesPage = () => {
    const likeRecipes = useSelector(selectLikeRecipes)

    return (
        <PageLayout>
            <h1>Избранные Рецепты</h1>
            <RecipeCards
                data={likeRecipes}
                addRecipes={addLikeRecipes}
                deleteRecipes={deleteLikeRecipes}
            />
        </PageLayout>
    )
}
