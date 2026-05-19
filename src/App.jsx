import Nav from "./Nav";
import Body from "./Body";
import Footer from "./Footer";
import About from "./About";
import Projects from "./Projects";
// import Blogs from "./Blogs";
import Publication from "./Publication";
// import VisitorMap from "./VisitorMap";
import CustomCursor from "./CustomCursor";
export default function App() {
  return (
    <>
      <CustomCursor />
      <Nav />
      <Body />
      <About />
      <Projects />
      <Publication />
      {/* <Blogs />*/}
      {/* <VisitorMap /> */}
      <Footer />
    </>
  );}