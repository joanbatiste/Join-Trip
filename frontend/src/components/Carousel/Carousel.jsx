// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import Swiper core and required modules
import SwiperCore, { A11y, Navigation, Pagination, Scrollbar } from 'swiper/core';
import { connect } from 'react-redux';
import TripCard from '../TripCard/TripCard';
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

function Carousel(props) {
  return (
    <div className="swiper-container">
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}

      >
        {props.trip.map(mytrips =>
          <SwiperSlide key={mytrips.id}>
            <div className="swiper-slide">
              <TripCard
                title={mytrips.title}
                destination={mytrips.destination}
                description={mytrips.description}
                date={mytrips.date}
                days={mytrips.days}
                link={mytrips.link}
                id={mytrips.id}
                username={mytrips.username}
              />
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>

  );
};
const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    trip: state.tripReducer.trip
  }
};
export default connect(mapStateToProps)(Carousel);
