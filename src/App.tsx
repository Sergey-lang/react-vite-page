import { useCallback, useEffect, useMemo, useState } from 'react'
import { ICourse } from '@entity/course';
import { CourseCard } from '@components/CourseCard/CourseCard.tsx';
import { LeftNav } from '@components/LeftNav/LeftNav.tsx';
import { CATEGORIES } from '@const/navigation.ts';
import './index.scss'

const initialCategory = CATEGORIES[0].title;

function App() {
    const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
    const [allCourses, setAllCourses] = useState<ICourse[]>([]);

    const fetchCategoryList = useCallback(async () => {
        // set loading
        try {
            const res = await fetch(`${import.meta.env.MY_BASE_API_URL}/docs/courses.json`)
            if (!res.ok) {
                throw new Error('Произошла Ошибка');
            }
            const data = await res.json();
            setAllCourses(data);
        } catch (e) {
            // set error
        } finally {
            // set loading
        }
    }, [])

    const filteredCourses = useMemo(() => {
        if (allCourses.length < 1) return [];
        if (selectedCategory === initialCategory) return allCourses;
        return allCourses.filter((c) => c.tags.includes(selectedCategory));
    }, [allCourses, selectedCategory])


    useEffect(() => {
        (async () => {
            await fetchCategoryList();
        })();
    }, [fetchCategoryList])

    return (
        <div className="container">
            <img src="/cat.svg" alt="cat" width={50} height={50}/>
            <div className="main-wrapper">
                <LeftNav
                    items={CATEGORIES}
                    setCategory={setSelectedCategory}
                    selectedCategory={selectedCategory}
                />
                <main className="courses-block">
                    {filteredCourses?.map((item) => {
                        return (
                            <CourseCard key={item.id} item={item}/>
                        )
                    })}
                </main>
            </div>
        </div>
    )
}

export default App
