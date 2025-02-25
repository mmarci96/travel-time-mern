import { useEffect, useState } from 'react';
import useAuthContext from '../hooks/useAuthContext.js';
import useAuthRequest from '../hooks/useAuthRequest.js';
import CountryDetailsCard from '../components/countries/CountryDetailsCard.jsx';
import { useParams } from 'react-router-dom';

function CountryDetail() {
  const [country, setCountry] =useState(null);

  const {  isAuthenticated } = useAuthContext();
  const {country_id}=useParams();

  const { sendRequest } = useAuthRequest();

  useEffect(() => {
    let url = `/api/countries/${country_id}`
console.log(url);

    sendRequest(url, 'GET').then((data) =>
      data ? setCountry(data.country): setCountry([]),
    );
  }, [isAuthenticated, country_id]);

  return (

      <div >
        <p> hi </p>
        <CountryDetailsCard country={country} />
      </div>

  )
}

export default CountryDetail;