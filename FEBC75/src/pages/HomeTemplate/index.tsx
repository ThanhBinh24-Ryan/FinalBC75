import { Outlet } from "react-router-dom";
import  ResponsiveLayout  from "./components/Footer/index"
export default function HomeTemplate() {
  return (
    <>
     <Outlet/>
     <ResponsiveLayout/>
     </>
  )
}
