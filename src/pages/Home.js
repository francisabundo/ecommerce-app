import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import Highlights from "../components/Highlights";
import Products from "./Products";

export default function Home (){
    return(
        <>
            <Banner />
            <Highlights />
            <Products/>

        </>

        
    )
}