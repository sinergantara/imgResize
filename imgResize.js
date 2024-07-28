/**
 * Resize image and return base 64 image and file object
 *
 * @param {file} file
 * @param {{}} [_opt={maxWidth: 1366,contentType: imgType[0],quality: 0.65,name: file.name}]
 * @returns {Promise<{size: number, file: function, url: Object}>}
 * @example
 * resizeImage(file).then((res)=>{img.src=res.url; label.innerHtml=res.size; resizedFile = res.file()})
 */
function resizeImage(file, _opt = {}) {
    const imgType = ["image/jpeg", "image/png", "image/webp"];
    let opt = {
        maxWidth: 1366,
        contentType: imgType[0],
        quality: 0.65,
        name: file.name
    }
    _opt.quality = Math.max(Math.min(_opt.quality, 1), 0);
    Object.assign(opt, _opt);
    imgType.includes(opt.contentType) || (opt.contentType = imgType[0]);

    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onerror = reject;

        img.onload = function () {
            const img_src = this.src;

            function keepOri() {
                resolve({ size: file.size, file() { return file; }, url: img_src });
            }
            let w = img.width, h = img.height;
            if (w > h) {
                if (w > opt.maxWidth) {
                    h *= opt.maxWidth / w;
                    w = opt.maxWidth;
                } else keepOri();
            } else {
                if (h > opt.maxWidth) {
                    w *= opt.maxWidth / h;
                    h = opt.maxWidth;
                } else keepOri();
            }

            const canvas = document.createElement("canvas");
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, w, h);

            canvas.toBlob(async (blob) => {
                const result = { size: blob.size };
                result.file = function () {
                    return new File([blob], opt.name, {
                        type: blob.type,
                    })
                };
                const bReader = new FileReader();
                bReader.onload = (e) => {
                    result.url = e.target.result;
                    resolve(result);
                };
                bReader.readAsDataURL(blob);

            },
                opt.contentType,
                opt.quality
            );

        };

        const reader = new FileReader();
        reader.onload = (e) => {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);

    });
};
