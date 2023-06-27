import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import Highlights from "../components/Highlights";
import Products from "./Products";

export default function Home (){
    return(
        <div style={{ minHeight: '100vh' }}>
            <Banner />
            <Highlights />
            <Products/>

        </div>

        
    )
}