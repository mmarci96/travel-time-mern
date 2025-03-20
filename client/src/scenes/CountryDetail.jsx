import { useEffect, useState } from 'react';
import useAuthContext from '../hooks/useAuthContext.js';
import useAuthRequest from '../hooks/useAuthRequest.js';
import CountryDetailsCard from '../components/countries/CountryDetailsCard.jsx';
import { Link, useParams } from 'react-router-dom';
import Button from '../components/common/Button.jsx';

function CountryDetail() {
    const [country, setCountry] = useState(null);

    const { isAuthenticated } = useAuthContext();
    const { country_id } = useParams();

    const { sendRequest } = useAuthRequest();

    useEffect(() => {
        let url = `/api/countries/${country_id}`;

        sendRequest(url, 'GET').then((data) =>
            data ? setCountry(data.country) : setCountry([]),
        );
    }, [isAuthenticated, country_id]);

    return (
        <div className="flex flex-col items-center">
            <div className="mt-4">
                <Link to="/countries">
                    <Button>Back to countries</Button>
                </Link>
            </div>
            <div className="flex justify-center items-center mt-8">
                <CountryDetailsCard country={country} />
            </div>
        </div>
    );
}

export default CountryDetail;
