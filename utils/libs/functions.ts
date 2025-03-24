import { format } from "@formkit/tempo";

export function formatDateTime(datetime: string | undefined) {
    if (!datetime) {
        return "";
    }

    return format({ date: datetime, format: "D/MM/YYYY HH:mm", tz: "Etc/GMT" });
}

export function formatPhone(phone: string | undefined) {
    if (!phone) {
        return "";
    }
    
    return phone.replace(/^(\+\d+)(\d{3})(\d{3})(\d{4})$/, '($1) $2-$3-$4');
}