import { FC } from "react";

interface PageTitleProps {
    text: string
}

const PageTitle:FC<PageTitleProps> = (props) => {
    const { text } = props;
    return (
        <h1 className="text-primary font-semibold text-lg">{text}</h1>
    );
}
 
export default PageTitle;