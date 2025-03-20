import { i } from "motion/react-client";
import { createClient } from "../supabase/server";
import { PermissionGroup } from "./dtos";
import { Permit } from "./entities";

export async function getPermits():Promise<PermissionGroup[]> {
    const supabase = await createClient();

    const { data } = await supabase.from('permits').select<'*',Permit>();

    if (!data) return [];

    const permits = data.reduce<PermissionGroup[]>((arr, permit) => {
        const pos = arr.findIndex(a => a.key === permit.menu);

        if (pos < 0) {
            return [...arr, {
                key: permit.menu,
                crud_actions: permit.crud ? [permit] : [],
                tasks: permit.crud ? [] : [permit]
            }];
        }
        else {
            return arr.map(a => {
                if (a.key === permit.menu) {
                    if (permit.crud) {
                        return {
                            ...a,
                            crud_actions: [...a.crud_actions, permit]
                        };
                    }
                    else {
                        return {
                            ...a,
                            tasks: [...a.tasks, permit]
                        };
                    }
                }

                return a;
            });
        }
    }, []);

    return permits;
}