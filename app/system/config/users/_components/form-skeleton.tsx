import FormGroupSkeleton from "@/app/_components/form-group-skeleton";

export default function FormUsersSkeleton() {
    return (
        <div className="md:max-w-[728px] mx-auto grid grid-cols-2 gap-x-3 gap-y-4">
            <FormGroupSkeleton />
            <FormGroupSkeleton />
            <FormGroupSkeleton />
            <FormGroupSkeleton />
            <div className="space-y-2 animate-pulse">
                <div className="h-5 w-32 skeleton"></div>
                <div className="h-80 skeleton"></div>
            </div>
            <div className="space-y-2 animate-pulse">
                <div className="h-5 w-32 skeleton"></div>
                <div className="h-80 skeleton"></div>
            </div>
        </div>
    )
}