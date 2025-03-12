import AnimatedComponent from '../common/AnimatedComponent.jsx';
import ImageWithPlaceholder from '../common/ImageWithPlaceholder.jsx';
import LoadAnimation from '../common/LoadAnimation.jsx';

function CountryDetailsCard({ country }) {
  return (
    <AnimatedComponent
      children={
        <div className="my-4 p-1 ring-1 rounded-xl shadow-slate-400 shadow-md w-full max-w-2xl mx-auto">
          <div className="flex flex-wrap md:flex-nowrap">
            <div className="w-full md:w-1/2">
              <ImageWithPlaceholder
                alt={country?.name}
                image_url={"https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcQ3G9orHhCXgQphuvFN5MTfiYFPt1meQdOBLprQLlUIXH9-ehOwGyOcSW9ElNFMDgVvz1KuyLk&s=19"}
                className="w-full h-auto object-cover rounded-l-xl"
              />
            </div>
            <div className="w-full ml-2 md:w-1/2 p-4">
              <h3 className="text-lg font-bold mb-2 max-h-8 overflow-hidden text-ellipsis">
                Country: {country?.name}
              </h3>
              <h3 className="text-lg mb-2 max-h-8 overflow-hidden text-ellipsis">
                Capital: {country?.capital}
              </h3>
              <h3 className="text-lg mb-2 max-h-8 overflow-hidden text-ellipsis">
                Continent: {country?.continent}
              </h3>
              <h3 className="text-lg mb-2 max-h-8 overflow-hidden text-ellipsis">
                Population: {country?.population}
              </h3>
              <h3 className="text-lg mb-2 max-h-8 overflow-hidden text-ellipsis">
                Timezones: {country?.timezones}
              </h3>
              <h3 className="text-lg mb-2 max-h-8 overflow-hidden text-ellipsis">
                Start of week: {country?.start_of_week}
              </h3>
            </div>
          </div>
          <LoadAnimation />
        </div>
      }
    />

  )
}

export default CountryDetailsCard;