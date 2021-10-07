import Axios from "axios";
// const DB_URL = "http://computerssqlapiv1-env.eba-tkhyap3p.eu-west-1.elasticbeanstalk.com";
const DB_URL = "http://localhost:4000";


export const getImagesFromDB = async () => {
    try {
        const res = await Axios.get(DB_URL + `/images`);
        if (res.status === 500 || res.status === 400 || res.status === 404) {
            throw res
        }
        return res.data;
    } catch (err) {
        throw (err)
    }
};

export const uploadImage = async (formData) => {
    try {
        const res = await Axios.post(DB_URL + `/upload-image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        if (res.status === 500 || res.status === 400 || res.status === 404) {
            throw res
        }
        return res.data;
    } catch (err) {
        throw (err)
    }
};

export const deleteImage = async (id, key) => {
    try {
        await Axios.delete(DB_URL + "/delete-image", {
            data: { id, key }
        })
        return
    } catch (err) {
        console.log(err);
    }
}
