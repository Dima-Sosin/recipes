import * as S from "../../styles/components"

import { useNavigate } from "react-router-dom"
import { Formik } from "formik"
import * as yup from "yup"

import { Button, DefaultButton } from "../../components/Button/Button_components"
import { Input } from "../../components/Input/Input"
import { api } from "../../api/api"

export const SignUpPage = () => {
    const nav = useNavigate()

    const initialValues = {
        lastname: "",
        firstname: "",
        email: "",
        password: ""
    }

    const onSubmit = (values) => {
        api.post("/signup", values).then((response) => {
            localStorage.setItem("token", response.accessToken)
            localStorage.setItem("userId", response.user.id)
            nav("/allRecipes")
        })
    }

    const validationSchema = yup.object({
        lastname: yup
            .string()
            .max(100, "Слишком много символов!")
            .matches(/^[A-ZА-Я-]+$/i, "Фамилия должна содержать только буквы!"),
        firstname: yup
            .string()
            .max(100, "Слишком много символов!")
            .matches(/^[A-ZА-Я-]+$/i, "Имя должно содержать только буквы!"),
        email: yup
            .string()
            .max(100, "Слишком много символов!")
            .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,64}$/i, "Неправильный email!")
            .required("Обязательное поле!"),
        password: yup
            .string()
            .min(8, "Минимум 8 символов")
            .matches(
                /^.*(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
                "Используйте буквы верхнего и нижнего регистра, а также цифры!"
            )
            .required("Обязательное поле!")
    })
    return (
        <S.SignPage>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <S.MyForm>
                    <S.Title>Регистрация</S.Title>
                    <Input
                        label="Фамилия"
                        type="text"
                        name="lastname"
                        placeholder="Введите фамилию"
                    />
                    <Input label="Имя" type="text" name="firstname" placeholder="Введите имя" />
                    <Input label="Email*" type="text" name="email" placeholder="Введите email" />
                    <Input
                        label="Пароль*"
                        type="text"
                        name="password"
                        placeholder="Введите пароль"
                    />
                    <S.Buttons>
                        <Button type="submit">Зарегистрироваться</Button>
                        <DefaultButton onClick={() => nav("/signin")}>
                            У меня есть аккаунт
                        </DefaultButton>
                    </S.Buttons>
                </S.MyForm>
            </Formik>
        </S.SignPage>
    )
}
