import { Outlet } from "react-router-dom";
import  ResponsiveLayout  from "./components/Footer/index"
import ChatBubble from "./chatBox";
export default function HomeTemplate() {
  return (
    <>
     <Outlet/>
      <ChatBubble/>
     <ResponsiveLayout/>
     </>
  )
}
