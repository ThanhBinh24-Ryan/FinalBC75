import Header from "../components/Header";
import ProfileLeft from "./left-profile";
import ProfileRight from "./right-Profile";
export default function ProfileUser() {
  return (
    <>
    <Header />
    <div className="flex justify-center container">
    <div className="w-4/6"><ProfileLeft/></div>
    <div className="mt-5" ><ProfileRight/></div>
    </div>
    </>
  )
}
