import { FC } from "react";

interface TooltipProps {
    text: string
    position: 'top' | 'right' | 'bottom' | 'left'
}

const Tooltip:FC<TooltipProps> = (props) => {
    const { text, position } = props;

    const varianClass = position === 'top' ? 'top-full left-1/2 -ml-16 after:absolute after:bottom-full after:size-0 after:left-[calc(50%-8px)] after:border-l-[8px] after:border-l-transparent after:border-r-[8px] after:border-r-transparent after:border-b-[8px] after:border-neutral-900/75' 
        : position === 'right' ? 'top-1/2 left-full -mt-3 after:absolute after:right-full after:size-0 after:top-[calc(50%-8px)] after:border-b-[8px] after:border-b-transparent after:border-t-[8px] after:border-t-transparent after:border-r-[8px] after:border-neutral-900/75'
        : '';

    return (
        <span className={`hidden absolute max-w-32 text-xs bg-neutral-900/75 text-white rounded px-2 py-1 shadow-md z-20 group-hover:inline-block ${varianClass}`}>
            {text}
        </span>
    );
}
 
export default Tooltip;