import Header from "./header";
import Footer from "./footer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="mt-[2rem] sm:mt-[4.5rem] relative h-max">
            <Header />
            {children}
            {/* <Footer /> */}
        </main>
    );
}
 
export default MainLayout;