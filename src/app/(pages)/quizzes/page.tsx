import QuizzesGrid from "@/components/layouts/quizzesGrid";
import SectionWithHeader from "@/components/layouts/sectionWithHeader";

export default function Discover() {
    return (
        <SectionWithHeader bigTitle="Все квизы">
            <QuizzesGrid />
        </SectionWithHeader>
    )
}