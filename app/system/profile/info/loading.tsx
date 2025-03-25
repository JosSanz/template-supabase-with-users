import PageTitleSkeleton from "@/app/_components/page-title-skeleton";
import FormSkeleton from "./_components/form-skeleton";

export default async function Loading() {
    return (
        <>
            <PageTitleSkeleton />
            <FormSkeleton />
        </>
    )
}