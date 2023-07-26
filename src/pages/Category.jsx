import { collection, doc, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';

const Category = () => {
    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)

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
                </>) : (<p>No listing for {params.categoryName}</p>)}
        </div>
    );
};

export default Category;



