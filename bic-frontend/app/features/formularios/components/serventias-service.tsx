import { apiUrl } from "@/lib/api"


// SERVENTIAS
export const serventiasAPI = {
    get: () => fetch(apiUrl("/serventias/")).then(r => r.json()),
    create: (data: any) => {
        return fetch(apiUrl("/serventias/"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(r => r.json());
    },
    update: (id: number, data: any) => fetch(apiUrl(`/serventias/${id}`), {
        method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
    }).then(r => r.json()),
    delete: (id: number) => fetch(apiUrl(`/serventias/${id}`), { method: "DELETE" }),
}