import { collection, doc, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';

const Category = () => {
    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)
    const [lastFetchedListing, SetLastFetchedListing] = useState(null)

    const params = useParams()

    useEffect(() => {
        const fetchListings = async () => {
            try {
                // get reference
                const listingRef = collection(db, 'listings')

                // Create a query
                const q = query(listingRef, where('type', '==', params.categoryName), orderBy('timestamp', 'desc'), limit(10))

                // Excute a query
                const querySnap = await getDocs(q)

                const lastVisible = querySnap.docs[querySnap.docs.length - 1]

                SetLastFetchedListing(lastVisible)

                const listings = []

                querySnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })

                setListings(listings)
                // { console.log(listings) }
                setLoading(false)
            } catch (error) {
                toast.error('could not fetch listings')
            }
        }
        fetchListings()
    }, [params.categoryName])

    // Pagination / Load More

    const onFetchMoreListings = async () => {
        try {
            // get reference
            const listingRef = collection(db, 'listings')

            // Create a query
            const q = query(listingRef, where('type', '==', params.categoryName), orderBy('timestamp', 'desc'), startAfter(lastFetchedListing), limit(10))

            // Excute a query
            const querySnap = await getDocs(q)

            const lastVisible = querySnap.docs[querySnap.docs.length - 1]
            SetLastFetchedListing(lastVisible)

            const listings = []

            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })

            setListings((prevState) => [...prevState, ...listings])
            // { console.log(listings) }
            setLoading(false)
        } catch (error) {
            toast.error('could not fetch listings')
            console.log(error);
        }
    }
    return (
        <div className='category'>
            <header>
                <p className="pageHeader">
                    {params.categoryName === 'rent' ? 'places for rent' : 'places for sale'}
                </p>
            </header>
            {loading ? (<Spinner />) : listings && listings.length > 0 ?
                (<>
                    <main>
                        <ul className="categoryListings">
                            {listings.map((listing) => (
                                <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
                            ))}
                            {/* {console.log(listings)} */}
                        </ul>
                    </main>
                    <br />
                    <br />

                    {lastFetchedListing && (
                        <p className="loadMore" onClick={onFetchMoreListings}>Load More</p>
                    )}
                </>) : (<p>No listing for {params.categoryName}</p>)}
        </div>
    );
};

export default Category;



