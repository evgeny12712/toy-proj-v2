export const imgUploadService = {
    getImg
}

async function getImg() {
    // console.log('example');
    // let imgs = await uploadImg()
    // console.log('imgs', imgs);
    return `http://res.cloudinary.com/dcdsywieo/image/list/tag.json`;
}

function uploadImg(ev) {
    const UPLOAD_PRESET = 'toy-proj' //insert yours
    const CLOUD_NAME = 'dcdsywieo' //insert yours
    const UPLOAD_URL = `http://res.cloudinary.com/dcdsywieo/image/list/tag.json`
    const FORM_DATA = new FormData();
    // FORM_DATA.append('file', ev.target.files[0])
    FORM_DATA.append('upload_preset', UPLOAD_PRESET)
    return fetch(UPLOAD_URL, {
            method: 'POST',
            body: FORM_DATA
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.error(err))
}