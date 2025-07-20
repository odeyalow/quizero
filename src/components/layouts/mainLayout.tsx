import Header from "./header";
import Footer from "./footer";
import Providers from "./providers";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Providers>
            <main className="mt-[2rem] sm:mt-[4.5rem] relative h-max">
                <Header />
                {children}
                {/* <Footer /> */}
            </main>
        </Providers>
    );
}
 
export default MainLayout;