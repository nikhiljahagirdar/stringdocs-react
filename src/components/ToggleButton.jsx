import PropTypes from "prop-types";

function ToggleButton({ collapsed, setCollapsed }) {
  return (
    <button
      className="absolute top-4 right-4 p-2 bg-gray-800 rounded-md hover:bg-gray-700"
      onClick={() => setCollapsed(!collapsed)}
    >
      {collapsed ? "▶" : "◀"}
    </button>
  );
}

ToggleButton.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  setCollapsed: PropTypes.func.isRequired,
};

export default ToggleButton;
