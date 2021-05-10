import SearchIcon from '../../../public/assets/icons/search.svg';

export const SearchBar = (): JSX.Element => (
  <div className="w-full flex justify-center my-3">
    <form className="relative bg-white p-2 pl-9 rounded-lg" role="search">
      <input type="search outline-none" aria-label="Search bar" />
      <label>
        <input className="visually-hidden" type="submit" />
        {/* <img src="./assets/images/search-icon.svg" alt=""> */}
        <SearchIcon className="absolute top-0 bottom-0 my-auto left-2" />
      </label>
    </form>
  </div>
);
