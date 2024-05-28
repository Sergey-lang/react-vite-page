import { ICourse } from '@entity/course';

interface IProps {
    item: ICourse
}

export const CourseCard = ({item}: IProps) => {
    const {id, bgColor, name, image} = item;
    return (
        <a href={'#'} key={id} className="course_card" aria-label={name}>
            <div style={{backgroundColor: bgColor}} className="course_card__image">
                <img src={image} alt={name}/>
            </div>
            <div className="course_card__name">
                <h3>{name}</h3>
            </div>
        </a>
    )
}