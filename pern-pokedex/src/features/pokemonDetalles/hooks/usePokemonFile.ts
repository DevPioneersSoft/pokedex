import { useQuery } from "@tanstack/react-query";
import api from "../../../shered/utils/api";

export function usePokemonFile(id: number) {
    return useQuery({
        queryKey: ["pokemon", id],
        queryFn: async () => {
            const response = await api.get(`/pokemon/${id}/ficha`, {
                responseType: "blob",
            });

            const blob = response.data;
            const urlBlob = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = urlBlob;
            a.download = `pokemon-${id}.pdf`;
            document.body.appendChild(a);
            a.click();

            a.remove();
            window.URL.revokeObjectURL(urlBlob);
        },
        enabled: false,
    });
}