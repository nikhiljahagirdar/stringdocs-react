import PropTypes from "prop-types";
import DynamicIcon from "./DynamicIcon";

function NavLink({ title, icons, path, collapsed }) {
    
  return (
    <a href={path} className="flex items-center gap-4 hover:text-violet-500 transition">
      {[...icons].map((icon,ind)=>{
         return <DynamicIcon  key={`sbdi-${ind}`} iconName={icon} className={`text-xl text-white ${collapsed ? "mx-auto" : ""}`} />
      })}
      {!collapsed && (
        <span className="text-violet-800 font-medium">{title}</span>
      )}
    </a>
  );
}

NavLink.propTypes = {
  title: PropTypes.string.isRequired,
  icons: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired,
  collapsed: PropTypes.bool.isRequired,
};

export default NavLink;
