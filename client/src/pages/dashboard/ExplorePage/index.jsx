import Card from "./Card"
import TemplatePageFilter from "../TemplatesPage/TemplatePageFilter";
import Trending from "./Trending"
const ExplorePage = ()=>{
    return(
    <>
    <TemplatePageFilter />
    <Trending />
    <Card />
    </>
    );
}
export default ExplorePage;