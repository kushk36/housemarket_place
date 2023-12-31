import React, { useEffect, useState } from 'react';
import db from '../firebase.config';
import Spinner from '../components/Spinner';
import shareIcon from '../assets/svg/shareIcon.svg'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Navigation, Pagination, Scrollbar, A11y, Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/virtual';
// import 'swiper/swiper-bundle.css';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const Listing = () => {
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [shareLinkCopied, setShareLinkCopied] = useState(false)

    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()

    useEffect(() => {
        const fetchListing = async () => {
            const docRef = doc(db, 'listings', params.listingId)

            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                console.log(docSnap.data());
                setListing(docSnap.data());
                setLoading(false)
            }
        }

        fetchListing()
    }, [navigate, params.listingId])

    if (loading) {
        return <Spinner />
    }

    return (
        <main>
            {/* SLIDER */}
            <Swiper modules={[Navigation, Pagination, Scrollbar, A11y]} navigation scrollbar={{ draggable: true }} slidesPerView={1} pagination={{ clickable: true }}>
                {listing.imgUrls.map((url, index) => (
                    <SwiperSlide key={index}>
                        <div className='swiperSlideDiv' style={{ background: `url(${listing.imgUrls[index]}) center no-repeat`, backgroundSize: 'cover' }}>
                        </div>
                        {/* {url} */}
                    </SwiperSlide>
                ))}

            </Swiper>
            <div className="shareIconDiv" onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                setShareLinkCopied(true)
                setTimeout(() => {
                    setShareLinkCopied(false)
                }, 2000);
            }}>
                <img src={shareIcon} alt="" />
            </div>
            {shareLinkCopied && <p className='linkCopied'>Link Copied!..</p>}
            <div className="listingDetails">
                <p className="listingName">{listing.name} - ${listing.offer ? listing.discountedPricee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                <p className="listingLocation">{listing.location}</p>
                <p className="listingType">
                    For {listing.type === 'rent' ? 'Rent' : 'Sale'}
                </p>
                {listing.offer && (
                    <p className="discountPrice">
                        ${listing.regularPrice - listing.discountedPricee} discount
                    </p>
                )}
                <ul className="listingDetailsList">
                    <li>
                        {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : '1 Bedroom'}
                        {console.log(listing.bedroom)}
                    </li>
                    <li>
                        {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : '1 Bathroom'}
                    </li>
                    <li>{listing.parking && 'Parking Spot'}</li>
                    <li>{listing.furnished && 'Furnished'}</li>
                </ul>
                <p className="listingLocationTitle">Location</p>

                {/* Map */}

                {auth.currentUser.uid !== listing.userRef && (
                    <Link to={`/contact/${listing.userRef}?listingName=${listing.name}&listingLocation=${listing.location}`} className='primaryButton'>Contact Landlord</Link>
                )}
            </div>
        </main>
    );
};

export default Listing;