

export const uploadFile = async (file: File): Promise<string | undefined> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET!);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        )

        if (!response.ok) {
            throw new Error("Error uploading file");
        }

        const responseData = await response.json();
        return responseData.url;

    } catch (error) {
        console.error("Error uploading file:", error)
        return undefined
    }
    
};
