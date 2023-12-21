import NavBar from "@/components/nav"
import classes from '../styles/error.module.css'
import { FaHome } from "react-icons/fa"
import { useRouter } from "next/router"
const Error = () => {
    const router = useRouter()
    const GoHome = () => {
        router.push('/page')
    }
    return <>
        <NavBar />
        <div className={classes.div}>
            <div><p>404</p></div>
            <div><center><p>The page not found error</p>
                <button onClick={GoHome}><FaHome /> <span>Home</span></button></center></div>
        </div>
    </>
}
export default Error