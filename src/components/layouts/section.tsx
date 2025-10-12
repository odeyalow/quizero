const Section = ({ children, styles }: { children: React.ReactNode, styles?: string }) => {
    return (
        <section
        className={`w-full ${styles}`}>
            <div className="mx-auto w-full max-w-[1200px] px-[2.5rem] relative">
                {children}
            </div>
        </section>
    );
}
 
export default Section;