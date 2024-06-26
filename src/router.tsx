import { Route as DomRoute, Routes, BrowserRouter } from "react-router-dom";
import { Homepage } from "@Pages/Homepage";
import { Boilerplate } from "@Components/Boilerplate";
import { Translate } from "@Pages/Translate";
import { SignIn } from "@Pages/SignIn";
import { SignUp } from "@Pages/SignUp";
import { ErrorPage } from "@Pages/ErrorPage";
import { ForgotPassword } from "@Pages/ForgotPassword";
import { Logout } from "@Pages/Logout";
import { EmailVerification } from "@Pages/EmailVerification";
import { Prices } from "@Pages/Prices";
import { ForgotPasswordEmailSend } from "@Pages/ForgotPasswordEmailSend";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {Route('/', <Homepage />)}
                {Route("/translate", <Translate />)}
                {Route("/signin", <SignIn />)}
                {Route("/signup", <SignUp />)}
                {Route("/email-verification", <EmailVerification />)}
                {Route("/prices", <Prices />)}
                {Route("/logout", <Logout />, false)}
                {Route("/forgotpassword", <ForgotPasswordEmailSend />)}
                {Route("/forgotpassword/:changePasswordId", <ForgotPassword />, false)}
                {Route("*", <ErrorPage />, false)}
            </Routes>
        </BrowserRouter>
    );
};

const Route = (path: string, element: JSX.Element, boilerplate: boolean = true) => {
    return (
        <DomRoute path={path} element={
        boilerplate ? <Boilerplate>{element}</Boilerplate> : element
    } />
    )
}

export default Router;