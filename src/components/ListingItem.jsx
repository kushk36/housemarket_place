// import React from 'react';
// import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg';
// import bedIcon from '../assets/svg/bedIcon.svg';
// import bathtubIcon from '../assets/svg/bathtubIcon.svg'
// import { Link } from 'react-router-dom';
// const ListingItem = ({ listing, id, onDelete }) => {
//     { console.log(listing) }
//     const price = listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//     const dprice = listing.discountedPricee.toString()
//     return (
//         <li className="categoryListing">
//             <Link to={`/category/${listing.type}/${id}`} className='categoryListingLink'>
//                 <img src={listing.imgUrls} alt={listing.name} className='categoryListingImg' />
//                 <div className="categoryListingDetails">
//                     <p className="categoryListingLocation">
//                         {listing.location}
//                     </p>
//                     <p className="categoryListingName">{listing.name}</p>
//                     {/* <p className="categoryListingPrice">${listing.offer ? dprice.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
//                         {listing.type === 'rent' && '/ Month'}
//                     </p> */}
//                     <p>{price}</p>
//                     <div className="categoryListingInfoDiv">
//                         <img src={bedIcon} alt="bed" />
//                         <p className="categoryListingInfoText">
//                             {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : '1 Bedroom'}
//                         </p>
//                         <img src={bathtubIcon} alt="bath" />
//                         <p className="categoryListingInfoText">
//                             {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : '1 Bathroom'}
//                         </p>
//                     </div>
//                 </div>
//             </Link>
//             {onDelete && (
//                 <DeleteIcon className='removeIcon' fill='rgb(231,76,60)' onClick={() => { onDelete(listing.id, listing.name) }} />
//             )}
//         </li>
//     );
// };

// export default ListingItem;




import React from 'react';
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg';
import bedIcon from '../assets/svg/bedIcon.svg';
import bathtubIcon from '../assets/svg/bathtubIcon.svg';
import { Link } from 'react-router-dom';

const ListingItem = ({ listing, id, onDelete }) => {

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    // const formattedPrice = listing.regularPrice;
    // const formattedDiscountedPrice = listing.discountedPricee;

    const regularPrice = formatPrice(listing.regularPrice);
    const discountedPrice = formatPrice(listing.discountedPricee);


    return (
        <li className="categoryListing">
            <Link to={`/category/${listing.type}/${id}`} className="categoryListingLink">
                <img src={listing.imgUrls} alt={listing.name} className="categoryListingImg" />
                <div className="categoryListingDetails">
                    <p className="categoryListingLocation">{listing.location}</p>
                    <p className="categoryListingName">{listing.name}</p>
                    <p className="categoryListingPrice">${listing.offer ? discountedPrice : regularPrice}
                        {listing.type === 'rent' && '/ Month'}
                    </p>
                    <div className="categoryListingInfoDiv">
                        <img src={bedIcon} alt="bed" />
                        <p className="categoryListingInfoText">
                            {`${listing.bedrooms} ${listing.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}`}
                        </p>
                        <img src={bathtubIcon} alt="bath" />
                        <p className="categoryListingInfoText">
                            {`${listing.bathrooms} ${listing.bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}`}
                        </p>
                    </div>
                </div>
            </Link>
            {onDelete && (
                <DeleteIcon
                    className="removeIcon"
                    fill="rgb(231,76,60)"
                    onClick={() => onDelete(listing.id, listing.name)}
                />
            )}
        </li>
    );
};

export default ListingItem;
