import FormGroupSkeleton from "@/app/_components/form-group-skeleton";
import { Fragment } from "react";

export default function FormUserProfileSkeleton() {
    return (
        <>
            <FormGroupSkeleton />
            <div className="animate-pulse grid grid-cols-[1fr_100px_100px_100px_100px]">
                <div></div>
                <div className="p-2">
                    <div className="h-5 skeleton"></div>
                </div>
                <div className="p-2">
                    <div className="h-5 skeleton"></div>
                </div>
                <div className="p-2">
                    <div className="h-5 skeleton"></div>
                </div>
                <div className="p-2">
                    <div className="h-5 skeleton"></div>
                </div>
                {[...Array(2)].map((_, i) => (
                    <Fragment key={i}>
                        <div className="pl-4 bg-neutral-100 flex items-center">
                            <div className="h-6 w-40 skeleton"></div>
                        </div>
                        <div className="p-2 flex justify-center bg-neutral-100 items-center">
                            <div className="size-5 skeleton"></div>
                        </div>
                        <div className="p-2 flex justify-center bg-neutral-100 items-center">
                            <div className="size-5 skeleton"></div>
                        </div>
                        <div className="p-2 flex justify-center bg-neutral-100 items-center">
                            <div className="size-5 skeleton"></div>
                        </div>
                        <div className="p-2 flex justify-center bg-neutral-100 items-center">
                            <div className="size-5 skeleton"></div>
                        </div>
                        {[...Array(5)].map((_, j) => (
                            <Fragment key={j}>
                                <div className="pl-6 flex items-center">
                                    <div className="h-6 w-40 skeleton"></div>
                                </div>
                                <div className="p-2 flex justify-center">
                                    <div className="size-5 skeleton"></div>
                                </div>
                                <div className="p-2 flex justify-center">
                                    <div className="size-5 skeleton"></div>
                                </div>
                                <div className="p-2 flex justify-center">
                                    <div className="size-5 skeleton"></div>
                                </div>
                                <div className="p-2 flex justify-center">
                                    <div className="size-5 skeleton"></div>
                                </div>
                            </Fragment>
                        ))}
                    </Fragment>
                ))}
            </div>
        </>
    )
}