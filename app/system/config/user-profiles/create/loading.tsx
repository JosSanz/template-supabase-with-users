import PageTitleSkeleton from "@/app/_components/page-title-skeleton";
import FormUserProfileSkeleton from "../_components/form-skeleton";

export default async function Loading() {
    return (
        <>
            <PageTitleSkeleton />
            <FormUserProfileSkeleton />
        </>
    );
}