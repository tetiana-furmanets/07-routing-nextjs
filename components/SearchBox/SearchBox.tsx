import css from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onSearch: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onSearch }) => {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes..."
      value={value}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBox;
