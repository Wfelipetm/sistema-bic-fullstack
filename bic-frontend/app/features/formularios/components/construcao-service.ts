import { infoConstrucaoAPI } from "../../../../lib/api-services";

// Apenas repassa o payload já pronto
export async function createConstrucao(data: any) {
    return infoConstrucaoAPI.create(data);
}