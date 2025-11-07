
import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";
import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  // Sort events by date descending
  const sortedEvents = [...(data?.events || [])].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  // Filter events by type if type is selected
  const totalFiltered = sortedEvents.filter((event) => (type ? event.type === type : true));
  const pageNumber = Math.ceil(totalFiltered.length / PER_PAGE);
  const typeList = new Set(data?.events.map((event) => event.type));
  // Paginate events
  const filteredEvents = totalFiltered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="selectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="list-container">
            {filteredEvents.map((event) =>

              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                    imageAlt={event.description}
                  />
                )}
              </Modal>

            )}
          </div>
          <div className="pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;

