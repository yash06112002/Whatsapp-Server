import googleCloudSDK from '../sdks/gcp.sdk.js';

export const uploadFile = async (file) => {
    try {
        const publicUrl = await googleCloudSDK.uploadFile(file);
        return publicUrl;
    } catch (error) {
        throw new Error(`File upload failed: ${error.message}`);
    }
};