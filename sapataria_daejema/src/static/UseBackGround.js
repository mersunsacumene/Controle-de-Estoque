
import { useEffect } from "react";

export const useBackground = (imageUrl) => {
    useEffect(() => {
        document.body.style.backgroundImage = `url('${imageUrl}')`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundBlendMode = "overlay";

        return () => {
            document.body.style.backgroundImage = "";
        };
    }, [imageUrl]);
};
