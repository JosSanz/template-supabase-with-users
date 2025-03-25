import FormGroupSkeleton from "@/app/_components/form-group-skeleton";

export default async function FormSkeleton() {
    return (
        <div className="animate-pulse grid grid-cols-2 gap-x-3 gap-y-4">
            <FormGroupSkeleton />
            <FormGroupSkeleton />
            <div className="col-span-2">
                <FormGroupSkeleton />
            </div>
            <div className="col-span-2">
                <FormGroupSkeleton />
            </div>
        </div>
    )
}