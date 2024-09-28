const options = ["All", "Ongoing", "In next 24hrs", "In next 7days"];

const FilterMenu = ({ curFilter, updateFilter }) => {
  return (
    <div className="self-start flex items-center gap-4 flex-wrap">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => updateFilter(option)}
          aria-pressed={curFilter === option} // Accessibility improvement
          className={`p-2 text-sm rounded-md transition duration-200 ease-in-out ${
            curFilter === option
              ? "bg-blue-500 text-white shadow-md"
              : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default FilterMenu;
