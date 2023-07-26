import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import db from '../firebase.config';
import Spinner from './Spinner'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Slider = () => {
    const [loading, setLoading] = useState(true)
    const [listings, SetListing] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchListing = async () => {
            const listingsRef = collection(db, 'listings')

            const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))

            const querySnap = await getDocs(q)

            let listings = []

            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            // console.log(listings[0].data.imgUrls[0]);
            SetListing(listings)
            setLoading(false)
        }
        fetchListing()
    }, [])

    if (loading) {
        return <Spinner />
    }
    return listings && (
        <>
            <p className="exploreHeading">Recommended</p>
            <div>

                {/* <Swiper modules={[Navigation, Pagination, Scrollbar, A11y]} navigation scrollbar={{ draggable: true }} slidesPerView={1} pagination={{ clickable: true }} >
                    {listings.map(({ data, id }) => {
                        console.log(id);
                        <SwiperSlide key={id}>
                            <div className='swiperSlideDiv' style={{ background: `url(${data.imgUrls[0]}) center no-repeat`, backgroundSize: 'cover' }} onClick={() => navigate(`/category/${data.type}/${id}`)}>

                            </div>
                        </SwiperSlide>
                    })}
                </Swiper> */}
                <Swiper modules={[Navigation, Pagination, Scrollbar, A11y]} navigation scrollbar={{ draggable: true }} slidesPerView={1} pagination={{ clickable: true }}>
                    {listings.map(({ data }, index) => (
                        <SwiperSlide key={index}>
                            <div className='swiperSlideDiv' style={{ background: `url(${data.imgUrls[0]}) center no-repeat`, backgroundSize: 'cover' }}>
                            </div>
                        </SwiperSlide>
                    ))}

                </Swiper>
            </div>
        </>
    );
};

export default Slider;