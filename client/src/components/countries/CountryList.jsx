import React, { useEffect, useState } from 'react';
import useAuthContext from '../../hooks/useAuthContext.js';
import useAuthRequest from '../../hooks/useAuthRequest.js';
import LoadAnimation from '../common/LoadAnimation.jsx';
import CountryCardLittle from './CountryCardLittle.jsx';
import Button from '../common/Button.jsx';
import CountryControls from './CountryControls.jsx';

function CountryList() {
    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState('');
    const [limit, setLimit] = useState(8);
    const [sort, setSort] = useState('created_at');
    const [asc, setAsc] = useState(true);
    const [showControls, setShowControls] = useState(false);
    const { isAuthenticated } = useAuthContext();

    const { sendRequest } = useAuthRequest();

    useEffect(() => {
        let url = `/api/countries?page=${1}&limit=${limit}&search=${search}&sort=${sort}&asc=${asc}`;

        sendRequest(url, 'GET').then((data) =>
            data ? setCountries(data.countries) : setCountries([]),
        );
    }, [limit, sort, asc, search, isAuthenticated]);

    const toggleSortOrder = () => {
        setAsc(!asc);
    };

    const handleNextPage = () => setLimit((prev) => prev + 5);
    const toggleControls = () => setShowControls(!showControls);

    return (
        <div className="flex flex-col items-center">
            {showControls ? (
                <CountryControls
                    search={search}
                    setSearch={setSearch}
                    sort={sort}
                    setSort={setSort}
                    asc={asc}
                    toggleSortOrder={toggleSortOrder}
                    toggleControls={toggleControls}
                />
            ) : (
                <button
                    onClick={toggleControls}
                    className="p-1 px-2 bg-cyan-500 text-white hover:bg-cyan-600 transition duration-300 ease-in-out mx-auto mt-4 rounded-xl"
                >
                    Show controls
                </button>
            )}
            <div className="container mx-auto p-4">
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {countries?.length > 0 ? (
                        countries.map((country) => (
                            <li
                                key={country.id}
                                className="flex justify-center"
                            >
                                <CountryCardLittle country={country} />
                            </li>
                        ))
                    ) : (
                        <LoadAnimation />
                    )}
                </ul>
            </div>

            <div className="pagination-controls">
                <Button onClick={handleNextPage} children="More" />
            </div>
        </div>
    );
}

export default CountryList;
