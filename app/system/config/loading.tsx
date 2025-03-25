import { SpinnerIcon } from "@/app/_components/icons";

export default function Loading () {
    return (
        <div className="flex justify-center pt-40">
            <SpinnerIcon className="animate-spin size-10 text-neutral-300" />
        </div>
    )
}