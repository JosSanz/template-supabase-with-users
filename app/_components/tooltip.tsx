import { FC } from "react";

const TooltipVariants = {
    top: 'bottom-full left-1/2 -ml-16 after:absolute after:top-full after:size-0 after:left-[calc(50%-8px)] after:border-l-[8px] after:border-l-transparent after:border-r-[8px] after:border-r-transparent after:border-t-[8px] after:border-neutral-900/75',
    right: 'top-1/2 left-full -mt-3 after:absolute after:right-full after:size-0 after:top-[calc(50%-8px)] after:border-b-[8px] after:border-b-transparent after:border-t-[8px] after:border-t-transparent after:border-r-[8px] after:border-neutral-900/75',
    left: 'top-1/2 right-full -mt-3 after:absolute after:left-full after:size-0 after:top-[calc(50%-8px)] after:border-b-[8px] after:border-b-transparent after:border-t-[8px] after:border-t-transparent after:border-l-[8px] after:border-neutral-900/75',
    bottom: 'top-full left-1/2 -ml-16 after:absolute after:bottom-full after:size-0 after:left-[calc(50%-8px)] after:border-l-[8px] after:border-l-transparent after:border-r-[8px] after:border-r-transparent after:border-b-[8px] after:border-neutral-900/75'
}

type TooltipVariantKeys = keyof typeof TooltipVariants;

interface TooltipProps {
    text: string
    position: TooltipVariantKeys
}

const Tooltip:FC<TooltipProps> = (props) => {
    const { text, position } = props;

    const varianClass = TooltipVariants[position];

    return (
        <span className={`hidden absolute w-max max-w-32 text-xs bg-neutral-900/75 text-white text-center rounded px-2 py-1 shadow-md z-20 group-hover:inline-block ${varianClass}`}>
            {text}
        </span>
    );
}
 
export default Tooltip;