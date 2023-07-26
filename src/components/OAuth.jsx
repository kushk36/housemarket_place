import React from 'react';
import googleIcon from '../assets/svg/googleIcon.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

const OAuth = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const GoogleClick = async () => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            // check for user
            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)

            // If user doesn't exist create user
            if (!docSnap.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timeStamp: serverTimestamp()
                })
            }
            navigate('/')
        } catch (error) {
            toast.error('Could not Authorize with Google')
        }
    }

    return (
        <div className='socialLogin'>
            <p>Sign {location.pathname === '/sign-in' ? 'in' : 'up'} With</p>
            <button className="socialIconDiv">
                <img className='socialIconImg' src={googleIcon} alt="Google Icon" onClick={GoogleClick} />
            </button>
        </div>
    );
};

export default OAuth;