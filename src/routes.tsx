import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import AuthLaout from "./layout/AuthLayout";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./layout/AppLayout";
import ProfilePage from "./pages/ProfilePage";
import LinkTreePage from "./pages/LinkTreePage";
import HandlePage from "./pages/HandlePage";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";

const AppRouter = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLaout />}>
                    <Route path="/auth/register" element={<RegisterPage />}></Route>
                    <Route path="/auth/login" element={<LoginPage />}></Route>
                </Route>

                <Route path="/admin" element={<AppLayout/>}>
                    <Route index element={<LinkTreePage/>}/>
                    <Route path="profile" element={<ProfilePage/>}></Route>
                </Route>

                <Route path="/:handle" element={<AuthLaout />} >
                    <Route index element={<HandlePage/>}/>
                </Route>

                <Route path="/404" element={<AuthLaout />} >
                    <Route index element={<NotFound/>}/>
                </Route>

                <Route path="/" element={<HomePage/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter