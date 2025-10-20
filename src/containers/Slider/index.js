import { useEffect, useState ,useRef,} from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {

  const { data } = useData();
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null)
  
// filtre les silide par orde descroissant   
const byDateDesc = data?.focus?.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  useEffect(() => {
    
    
    const nextCard = () => {
     timerRef.current = setTimeout(() =>
       setIndex(index < byDateDesc.length - 1 ? index + 1 :0 ), 5000);
    };
nextCard()
    return () => clearTimeout(timerRef.current);   
    
  },[index,byDateDesc]);

  return (
    <div className="SlideCardList">
    {byDateDesc?.map((event, idx) => (
  <div key={event.id || event.title}>
    <div className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
      <img className='SlideCard-img' src={event.cover} alt="forum" />
      <div className="SlideCard__descriptionContainer">
        <div className="SlideCard__description">
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <div>{getMonth(new Date(event.date))}</div>
        </div>
      </div>
    </div>
  </div>
))}

          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
          {byDateDesc?.map((event, radioIdx) => (
  <input
    key={`radio-${event.id || radioIdx}`}
    type="radio"
    name={`radio-group-${event.id || 'slider'}`}
    checked={index === radioIdx}
    onChange={() => setIndex(radioIdx)}
  />
))}

            </div>
          </div>
    </div>
  );
};

export default Slider;
