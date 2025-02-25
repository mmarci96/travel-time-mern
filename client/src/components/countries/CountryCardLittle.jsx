import AnimatedComponent from '../common/AnimatedComponent.jsx';
import { Link } from 'react-router-dom';
import ImageWithPlaceholder from '../common/ImageWithPlaceholder.jsx';

import LoadAnimation from '../common/LoadAnimation.jsx';

function CountryCardLittle({country}) {
  return (
    <AnimatedComponent
      children={
        <div className="my-4 p-1 ring-1 rounded-xl max-h-[640px] h-[80vh] shadow-slate-400 shadow-md min-w-[320px] w-[60vw] max-w-[480px] mx-auto">
          <Link to={`/countries/${country._id}`}>
            <ImageWithPlaceholder
              alt={country.name}
              image_url={"https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQ3G9orHhCXgQphuvFN5MTfiYFPt1meQdOBLprQLlUIXH9-ehOwGyOcSW9ElNFMDgVvz1KuyLk&s=19"}
            />
          </Link>
          <span className="flex flex-col">
                        <h3 className="country-name text-lg px-2  mb-1 max-h-8 overflow-hidden text-ellipsis">
                           Country: {country.name}
                        </h3>
             <h3 className="country-capital text-lg px-2  mb-1 max-h-8 overflow-hidden text-ellipsis">
                           capital: {country.capital}
                        </h3>
                    </span>


          <LoadAnimation />
          )
        </div>
      }
    />
  )
}

export default CountryCardLittle;