import React from 'react';
import FormField from '../common/FormField.jsx';

const PostControls = ({
    search,
    setSearch,
    sort,
    setSort,
    asc,
    toggleSortOrder,
    filters,
    setFilters,
    toggleControls,
}) => {
    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div>
            <div className="search-bar flex w-full justify-around relative">
                <FormField
                    type="text"
                    placeholder="Search posts..."
                    value={search}
                    onChange={handleSearchChange}
                    className={
                        'w-[94vw] p-2 m-2 rounded-xl mx-4 px-4 bg-cyan-100 focus:outline-none ring-2 ring-slate-300'
                    }
                />
                <button
                    onClick={() => setSearch('')}
                    className="absolute text-white p-1 px-2 bg-cyan-500 hover:bg-cyan-600 right-[4vw] top-5 rounded-xl"
                >
                    Clear
                </button>
            </div>

            <div className="controls flex flex-wrap w-[100vw] justify-evenly mt-4">
                <select
                    className="p-2 my-auto rounded-md ml-6"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="created_at">Sort by Created At</option>
                    <option value="title">Sort by Title</option>
                    <option value="location">Sort by Location</option>
                </select>

                <button
                    onClick={toggleSortOrder}
                    className="p-1 px-2 mx-auto text-white bg-cyan-500 hover:bg-cyan-600 transition duration-300 ease-in-out my-auto rounded-xl"
                >
                    {asc ? 'Sort Descending' : 'Sort Ascending'}
                </button>

                <button
                    onClick={() =>
                        setFilters((prev) =>
                            prev === null ? 'following' : null,
                        )
                    }
                    className="p-1 px-2 mx-auto text-white bg-cyan-500 hover:bg-cyan-600 transition duration-300 ease-in-out my-auto rounded-xl"
                >
                    {filters ? 'Show All' : 'Show Following'}
                </button>

                <button
                    onClick={toggleControls}
                    className="p-1 px-2 text-white bg-cyan-500 hover:bg-cyan-600 transition duration-300 ease-in-out ml-auto mr-[4vw] my-auto rounded-xl"
                >
                    Hide controls
                </button>
            </div>
        </div>
    );
};

export default PostControls;
