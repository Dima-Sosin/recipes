import GlobalStyles from "./styles/global"

import { useSelector } from "react-redux"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ThemeProvider } from "styled-components"

import { PageHeader } from "./components/PageHeader/PageHeader"
import { selectTheme } from "./store/themeSlice"
import { api } from "./api/api"

import { AllRecipesPage } from "./pages/AllRecipesPage/AllRecipesPage"
import { MyRecipesPage } from "./pages/MyRecipesPage/MyRecipesPage"
import { LikeRecipesPage } from "./pages/LikeRecipesPage/LikeRecipesPage"
import { RecipePage } from "./pages/RecipePage/RecipePage"
import { SignUpPage } from "./pages/SignUpPage/SignUpPage"
import { SignInPage } from "./pages/SignInPage/SignInPage"
import { ProfilePage } from "./pages/ProfilePage/ProfilePage"

const router = createBrowserRouter([
    {
        path: "/",
        element: <PageHeader />,
        children: [
            {
                path: "allRecipes",
                element: <AllRecipesPage />
            },
            {
                path: "myRecipes",
                element: <MyRecipesPage />
            },
            {
                path: "likeRecipes",
                element: <LikeRecipesPage />
            },
            {
                path: "recipe/:recipeId",
                element: <RecipePage />,
                loader: async ({ params }) => {
                    return await api
                        .get("/recipes?id=" + params.recipeId)
                        .then((response) => response)
                }
            },
            {
                path: "profile",
                element: <ProfilePage />,
                loader: async () => {
                    return await api
                        .get(
                            "/users/" + localStorage.getItem("id"),
                            {},
                            localStorage.getItem("token")
                        )
                        .then((response) => response)
                }
            }
        ]
    },
    {
        path: "/signup",
        element: <SignUpPage />
    },
    {
        path: "/signin",
        element: <SignInPage />
    }
])

export const App = () => {
    const theme = useSelector(selectTheme)
    return (
        <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
            <GlobalStyles />
        </ThemeProvider>
    )
}
