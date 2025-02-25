import React, { useEffect, useState } from 'react';
import useAuthContext from '../../hooks/useAuthContext.js';
import useAuthRequest from '../../hooks/useAuthRequest.js';
import PostControls from '../posts/PostControls.jsx';
import PostCard from '../posts/PostCard.jsx';
import LoadAnimation from '../common/LoadAnimation.jsx';
import Button from '../common/Button.jsx';
import CountryCardLittle from './CountryCardLittle.jsx';

function CountryList() {
  const [countries, setCountries] = useState([]);
  //const [search, setSearch] = useState('');
  //const [limit, setLimit] = useState(8);
 // const [sort, setSort] = useState('created_at');
  //const [asc, setAsc] = useState(true);
  //const [showControls, setShowControls] = useState(false);
  const {  isAuthenticated } = useAuthContext();

  const { sendRequest } = useAuthRequest();

  useEffect(() => {
    let url = `/api/countries/all`

   // ?page=${1}&limit=${limit}&search=${search}&sort=${sort}&asc=${asc}`;

    sendRequest(url, 'GET').then((data) =>
      data ? setCountries(data.countries) : setCountries([]),
    );
  }, [isAuthenticated]);

 // limit, sort, asc, search,

  //const toggleSortOrder = () => {
  //  setAsc(!asc);
  //};

  //const handleNextPage = () => setLimit((prev) => prev + 5);
  //const toggleControls = () => setShowControls(!showControls);

  return (

      <ul>
        {countries?.length > 0 ? (
          countries.map((country) => (
            <li key={country.id}>
              <CountryCardLittle
                country={country}
               // onDeleteCount={setDeleteCount}
              />
            </li>
          ))
        ) : (
          <LoadAnimation />
        )}
      </ul>);

    //  <div className="pagination-controls">
      //  <Button onClick={handleNextPage} children="More" />
      //</div>
   // </div>

}
export default CountryList;