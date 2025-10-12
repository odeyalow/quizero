import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

import Input from "./input";
import useGetData from "@/hooks/useGetData";
import quizzesService from "@/services/quizzesService";
import { QuizDataType } from "@/types/QuizDataType";

const SearchField = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const { data } = useGetData<QuizDataType>('quizzes', quizzesService.getAll);
    const [searchResults, setSearchResults] = useState<QuizDataType[]>();
    const [searchFocused, setSearchFocused] = useState<boolean>(false);
    const searchValidation = searchValue.trim() && searchResults && searchResults.length > 0 && searchFocused;
    const noResultValidation = searchResults && searchResults.length === 0 && searchValue && searchValue.length > 0 && searchFocused;
    const pathname = usePathname();
    const { push } = useRouter();
    const resultsRef = useRef<HTMLUListElement | null>(null);

    useEffect(() => {
       if ( searchValue && data ) {
            quizzesService.getBySearchQuery(searchValue, data)
            .then(result => setSearchResults(result));
       }
    }, [searchValue, data])

    useEffect(() => {
       setSearchValue('')
    }, [pathname])

    const onSearch = (value: string) => {
        setSearchValue(value);
    }
    const handleFocus = (value: boolean) => {
        setSearchFocused(value);
    }
    const onResultRoute = (slug: string, id: string) => {
        push(`quizzes/${slug}?id=${id}`);
        setSearchValue('');
    }

    return (
        <div className="relative">
            <Input value={searchValue} type="text" name="search" placeholder="Искать квизы..." onChange={onSearch} onFocus={handleFocus}/>
            {
                searchValidation && (
                    <ul ref={resultsRef} className={`bg-white border-[3.5px] border-gray rounded-[1rem] text-[1.6rem] max-h-[450px] absolute z-99 w-full mt-[1rem] ${searchResults.length > 1 && 'overflow-y-scroll'}`}>
                        {
                            searchResults.map((result: QuizDataType) => {
                                return(
                                        <button
                                        key={result.id}
                                        className="w-full hover:bg-gray p-[1.5rem] text-left"
                                        onMouseDown={() => onResultRoute(result.slug, result.id)}>
                                            {result.title}
                                        </button>                                    
                                )
                            })
                        }
                    </ul>
                )
            }
            
            {
                noResultValidation && (
                    <div className="bg-white border-[3.5px] border-gray rounded-[1rem] text-[1.6rem] max-h-[450px] overflow-y-hidden absolute z-99 w-full mt-[1rem] p-[1.25rem]">Квизов по вашему запросу не найдено</div>
                )
            }
        </div>
    );
}
 
export default SearchField;