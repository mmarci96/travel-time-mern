import { Link } from 'react-router-dom';
import ImageWithPlaceholder from '../common/ImageWithPlaceholder.jsx';

function CountryCardLittle({ country }) {
    return (
        <div className="bg-white border border-gray-300 rounded-xl shadow-md overflow-hidden w-full max-w-xs p-4">
            <Link to={`/countries/${country._id}`}>
                <ImageWithPlaceholder
                    alt={country.name}
                    image_url={
                        'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQ3G9orHhCXgQphuvFN5MTfiYFPt1meQdOBLprQLlUIXH9-ehOwGyOcSW9ElNFMDgVvz1KuyLk&s=19'
                    }
                    className="w-full h-32 object-cover"
                />
            </Link>
            <div className="flex flex-col mt-2">
                <h3 className="text-base font-bold mb-1 mt-4 max-h-8 overflow-hidden text-ellipsis">
                    Country: {country.name}
                </h3>
                <h3 className="text-base mb-1 max-h-8 overflow-hidden text-ellipsis">
                    Capital: {country.capital}
                </h3>
            </div>
        </div>
    );
}

export default CountryCardLittle;
