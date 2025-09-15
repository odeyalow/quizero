import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import Input from "./input";
import useGetData from "@/hooks/useGetData";
import quizzesService from "@/services/quizzesService";
import { QuizDataType } from "@/types/QuizDataType";

const SearchField = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const { data } = useGetData<QuizDataType>('quizzes', quizzesService.getAll);
    const [searchResults, setSearchResults] = useState<QuizDataType[]>();
    const [searchFocused, setSearchFocused] = useState<boolean>(false);
    const searchValidation = searchValue && searchValue.length > 0 && searchResults && searchResults.length > 0 && searchFocused;
    const noResultValidation = searchResults && searchResults.length === 0 && searchValue && searchValue.length > 0 && searchFocused;
    const pathname = usePathname();

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
    const linkHandle = (slug: string, id: string) => {
        return {
            pathname: `quizzes/${slug}`,
            query: {
                id: id
            }
        }
    }

    return (
        <div className="relative">
            <Input value={searchValue} type="text" name="search" placeholder="Искать квизы..." onChange={onSearch} onFocus={handleFocus}/>
            {
                searchValidation && (
                    <ul className="bg-white border-[3.5px] border-gray rounded-[1rem] text-[1.6rem] max-h-[450px] overflow-y-scroll absolute z-99 w-full mt-[1rem]">
                        {
                            searchResults.map((result: QuizDataType) => {
                                return(
                                    <Link
                                    key={result.id}
                                    href={linkHandle(result.slug, result.id)}
                                    onClick={() => setSearchValue('')}>
                                        <li className="p-[1.25rem] hover:bg-gray">{result.title}</li>
                                    </Link>
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