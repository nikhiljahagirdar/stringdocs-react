import React from "react";  
import cn from "../../utils/tailwindMerge"
import PropTypes from "prop-types";

// Define DropdownMenu components with basic structure and Tailwind classes
const DropdownMenu = ({ children, ...props }) => (
    <div className="relative inline-block" {...props}>
        {children}
    </div>
);

const DropdownMenuTrigger = ({ children, asChild, ...props }) => {
    const Component = asChild ? 'span' : 'div';  // Use span if asChild is true
    return (
        <Component {...props} className={cn(asChild ? "" : "cursor-pointer")}>
            {children}
        </Component>
    );
};


const DropdownMenuContent = ({ align = "start", className, children, ...props }) => {
    let alignmentClass = '';
    switch (align) {
        case 'center':
            alignmentClass = 'left-1/2 transform -translate-x-1/2';
            break;
        case 'end':
            alignmentClass = 'right-0';
            break;
        default:
            alignmentClass = 'left-0';
    }
    return (
        <div
            {...props}
            className={cn(
                "absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5",
                alignmentClass,
                className
            )}
        >
            {children}
        </div>
    );
};

const DropdownMenuLabel = ({ children, className, ...props }) => (
    <div {...props} className={cn("block px-4 py-2 text-sm text-gray-700", className)}>
        {children}
    </div>
);

const DropdownMenuItem = ({ children, className, ...props }) => (
    <button
        {...props}
        className={cn(
            "block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 rounded-md",
            "transition-colors duration-200",
            className
        )}
    >
        {children}
    </button>
);

const DropdownMenuSeparator = ({ className, ...props }) => (
    <div {...props} className={cn("h-px my-1 bg-gray-100", className)} />
);

DropdownMenu.propTypes = {
    children: PropTypes.node,
};

DropdownMenuTrigger.propTypes = {
    children: PropTypes.node,
    asChild: PropTypes.bool,
};

DropdownMenuContent.propTypes = {
    align: PropTypes.oneOf(["start", "center", "end"]),
    className: PropTypes.string,
    children: PropTypes.node,
};

DropdownMenuLabel.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

DropdownMenuItem.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
};

DropdownMenuSeparator.propTypes = {
    className: PropTypes.string,
};

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator };