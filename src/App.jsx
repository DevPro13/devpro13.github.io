import Nav from "./Nav";
import Body from "./Body";
import Footer from "./Footer";
import About from "./About";
import Projects from "./Projects";
// import Blogs from "./Blogs";
import Publication from "./Publication";
import News from "./News";
import Research from "./Research";
import VisitorMap from "./VisitorMap";
import CustomCursor from "./CustomCursor";
export default function App() {
  return (
    <>
      <CustomCursor />
      <Nav />
      <Body />
      <About />
      <Projects />
      <Research />
      <Publication />
      <News />
      <VisitorMap />
      <Footer />
    </>
  );}