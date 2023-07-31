import { getAuth, updateProfile } from 'firebase/auth';
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../firebase.config'
import homeIcon from '../assets/svg/homeIcon.svg';
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import ListingItem from '../components/ListingItem';

const Profile = () => {
    const auth = getAuth()
    const [chageDetails, setChangeDetails] = useState(false)
    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    })

    const { name, email } = formData

    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserListing = async () => {
            const listingsRef = collection(db, 'listings')

            const q = query(listingsRef, where('userRef', '==', auth.currentUser.uid), orderBy('timestamp', 'desc'))

            const querySnap = await getDocs(q)

            let listings = []

            querySnap.forEach((doc) => {
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })

            setListings(listings)
            setLoading(false)
        }
        fetchUserListing()
    }, [auth.currentUser.uid])

    const onLogout = () => {
        auth.signOut()
        navigate('/')
    }

    const onSubmit = async () => {
        try {
            if (auth.currentUser.displayName !== name) {
                // update display name
                await updateProfile(auth.currentUser, {
                    displayName: name
                })

                // update in firestore
                const userRef = doc(db, 'users', auth.currentUser.uid)
                await updateDoc(userRef, {
                    // name:name
                    name
                })
            }
        } catch (error) {
            toast.error('Could not update profile details')
        }
    }

    const onDelete = async (listingId) => {
        if (window.confirm('Are You Sure You Want to Delete ?')) {
            await deleteDoc(doc(db, 'listings', listingId))

            const updatedListings = listings.filter((listing) => listing.id !== listingId)

            setListings(updatedListings)

            toast.success('Successfully Deleted listing')
        }
    }

    const onEdit = (listingId) => {
        navigate(`/edit-listing/${listingId}`)
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    return <div className='profile'>
        <header className="profileHeader">
            <p className="pageHeader">My Profile</p>
            <button type='button' className="logOut" onClick={onLogout}>Logout</button>
        </header>
        <main>
            <div className="profileDetailsHeader">
                <p className="profileDetailsText">Personal Details</p>
                <p className="changePersonalDetails" onClick={() => {
                    chageDetails && onSubmit()
                    setChangeDetails((prevState) => !prevState)
                }}>{chageDetails ? 'done' : 'change'}</p>
            </div>
            <div className="profileCard">
                <form >
                    <input type="text" id="name" className={!chageDetails ? 'profileName' : 'profileNameActive'} disabled={!chageDetails} value={name} onChange={onChange} />

                    <input type="text" id="email" className={!chageDetails ? 'profileEmail' : 'profileEmailActive'} disabled={!chageDetails} value={email} onChange={onChange} />
                </form>
            </div>
            <Link to="/create-listing" className='createListing'>
                <img src={homeIcon} alt="home" />
                <p>Sell or Rent Your Home</p>
                <img src={arrowRight} alt="arrow-right" />
            </Link>

            {!loading && listings?.length > 0 && (
                <>
                    <p className="listingText">Your Listings</p>
                    <ul className="listingList">
                        {listings.map((listing) => (
                            <ListingItem key={listing.id} listing={listing.data} id={listing.id} onDelete={() => onDelete(listing.id)} onEdit={() => onEdit(listing.id)} />
                        ))}
                    </ul>
                </>
            )}
        </main>
    </div>
};

export default Profile;