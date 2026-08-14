import './SearchInput.css';

export default function SearchInput({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="search-input">
      <span className="search-input__icon">🔍</span>
      <input
        type="text"
        className="search-input__field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
