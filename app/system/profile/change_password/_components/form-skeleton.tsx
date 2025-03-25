import FormGroupSkeleton from "@/app/_components/form-group-skeleton";

export default async function FormSkeleton() {
    return (
        <div className="animate-pulse space-y-4">
            <FormGroupSkeleton />
            <FormGroupSkeleton />
            <FormGroupSkeleton />
        </div>
    )
}