import { Outlet } from "react-router-dom";
import FooterBar from "../components/FooterBar";
import NavBar from "../components/NavBar";


const Layout = () => {
  return (

    <>
      <NavBar />
      <main className="-mt-2 relative z-10 bg-white p-6 mx-6 xl:p-6 rounded-b-2xl xl:mx-50 min-h-[80vh]" >
        <Outlet />
      </main>
      <FooterBar />
    </>
  )
}

export default Layout;
