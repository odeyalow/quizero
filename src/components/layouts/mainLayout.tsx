import Header from "./header";
import Footer from "./footer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="mt-[4.5rem] relative h-max">
            <div className="mx-auto max-w-[1200px] px-[2.5rem]">
                <Header />
                {children}
            </div>
            <Footer />
        </div>
    );
}
 
export default MainLayout;