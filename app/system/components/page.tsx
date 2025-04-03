'use client';

import Alert from "@/app/_components/alert";
import Button from "@/app/_components/button";
import PageTitle from "@/app/_components/page-title";
import { useSystemContext } from "../_components/system-state";
import { ToastVariantKeys } from "@/app/_components/toast";
import Tooltip from "@/app/_components/tooltip";

export default function Page () {
    const { triggerToast } = useSystemContext();

    const onShowToast = (type: ToastVariantKeys) => {
        triggerToast('In amet nisi do voluptate eu minim labore ea cillum dolor irure adipisicing.', type);
    }

    return (
        <>
            <PageTitle text="Componentes" />
            <div className="space-y-2">
                <h2 className="text-primary text-2xl">Botones</h2>
                <div className="flex gap-2">
                    <Button variant='primary'>Botón</Button>
                    <Button variant='secondary'>Botón</Button>
                    <Button variant='success'>Botón</Button>
                    <Button variant='danger'>Botón</Button>
                    <Button variant='warning'>Botón</Button>
                    <Button variant='info'>Botón</Button>
                    <Button variant='light'>Botón</Button>
                    <Button variant='dark' >Botón</Button>
                </div>
                <div className="flex gap-2">
                    <Button variant='outline_primary'>Botón</Button>
                    <Button variant='outline_secondary'>Botón</Button>
                    <Button variant='outline_success'>Botón</Button>
                    <Button variant='outline_danger'>Botón</Button>
                    <Button variant='outline_warning'>Botón</Button>
                    <Button variant='outline_info'>Botón</Button>
                    <Button variant='outline_light'>Botón</Button>
                    <Button variant='outline_dark' >Botón</Button>
                </div>
            </div>
            <div className="space-y-2">
                <h2 className="text-primary text-2xl">Tooltips</h2>
                <div className="flex gap-2">
                    <div className="group relative border border-neutral-100 p-2 rounded">
                        Hover me
                        <Tooltip text="Tooltip top message" position="top"/>
                    </div>
                    <div className="group relative border border-neutral-100 p-2 rounded">
                        Hover me
                        <Tooltip text="Tooltip right message" position="right"/>
                    </div>
                    <div className="group relative border border-neutral-100 p-2 rounded">
                        Hover me
                        <Tooltip text="Tooltip bottom message" position="bottom"/>
                    </div>
                    <div className="group relative border border-neutral-100 p-2 rounded">
                        Hover me
                        <Tooltip text="Tooltip left message" position="left"/>
                    </div>
                </div>
            </div>
            <div className="space-y-2">
                <h2 className="text-primary text-2xl">Alertas</h2>
                <Alert variant="success" text="Consectetur consectetur nostrud eu est ad ad adipisicing anim aliqua. Do aute id do aute consectetur in consectetur adipisicing excepteur sit cupidatat. Sunt fugiat fugiat id sit voluptate magna dolor esse irure deserunt anim do. Magna anim minim quis est magna commodo excepteur." isVisible={true} />
                <Alert variant="danger" text="Consectetur consectetur nostrud eu est ad ad adipisicing anim aliqua. Do aute id do aute consectetur in consectetur adipisicing excepteur sit cupidatat. Sunt fugiat fugiat id sit voluptate magna dolor esse irure deserunt anim do. Magna anim minim quis est magna commodo excepteur." isVisible={true} />
                <Alert variant="warning" text="Consectetur consectetur nostrud eu est ad ad adipisicing anim aliqua. Do aute id do aute consectetur in consectetur adipisicing excepteur sit cupidatat. Sunt fugiat fugiat id sit voluptate magna dolor esse irure deserunt anim do. Magna anim minim quis est magna commodo excepteur." isVisible={true} />
                <Alert variant="info" text="Consectetur consectetur nostrud eu est ad ad adipisicing anim aliqua. Do aute id do aute consectetur in consectetur adipisicing excepteur sit cupidatat. Sunt fugiat fugiat id sit voluptate magna dolor esse irure deserunt anim do. Magna anim minim quis est magna commodo excepteur." isVisible={true} />
            </div>

            <div className="space-y-2">
                <h2 className="text-primary text-2xl">Toast</h2>
                <div className="flex gap-2">
                    <Button variant='success' onClick={() => onShowToast('success')}>Success</Button>
                    <Button variant='danger' onClick={() => onShowToast('error')}>Error</Button>
                    <Button variant='warning' onClick={() => onShowToast('warning')}>Warning</Button>
                    <Button variant='info' onClick={() => onShowToast('info')}>Information</Button>
                </div>
            </div>
        </>
    );
}