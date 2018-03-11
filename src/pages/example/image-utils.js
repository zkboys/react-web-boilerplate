/**
 * 获取图片数据，可直接赋值到img的src属性，进行显示
 * @param {Blob} file 用户选择的图片文件
 * @returns {Promise}
 */
export function getImageData(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/**
 * 图片压缩，接受一个options参数，具体参数如下：
 * @param {string} data 图片数据 FileReader readAsDataURL方法得到的数据
 * @param {string} [type='image/jpeg'] 处理完之后的图片类型
 * @param {Number} [quality=0.8] 图片压缩比例
 * @returns {Promise}
 */
export function compressImage({
                                  data,
                                  type = 'image/jpeg',
                                  quality = 0.8,
                              }) {
    if (!data) return;
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const img = new Image();
        img.onload = function () {
            img.width *= quality;
            img.height *= quality;
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;

            // canvas清屏
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 将图像绘制到canvas上
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // 必须等压缩完才读取canvas值，否则canvas内容是黑帆布
            resolve(canvas.toDataURL(type));
        };
        img.onerror = reject;
        // 记住必须先绑定事件，才能设置src属性，否则img没有内容可以画到canvas
        img.src = data;
    });
}

/**
 * 根据图片base64数据，获取图片文件实际大小，最终结果会有<3的偏差（比实际大1~3）
 * @param imageBase64Data
 * @returns {number}
 */
export function getImageSizeByBase64(imageBase64Data) {
    // (((4 * e.file.size) / 3) + 3) & ~3 === base64Data.length
    // ~3 = -4

    let arr = imageBase64Data.split(',');
    const base64Data = arr[1];
    const fileSize = ((base64Data.length - 3) * 3) / 4;
    return window.parseInt(fileSize) + 3;
}

/**
 * 将图片大约压缩到指定大小以下
 * @param {string} data 图片数据 FileReader readAsDataURL方法得到的数据
 * @param {string} [type='image/jpeg'] 处理完之后的图片类型
 * @param {Number} [size=300 * 1024] 压缩后大小
 * @param {Number} [qualityStep=0.9] 每次压缩比，数值越大越精确，但是压缩时间越长
 * @returns {Promise}
 */
export function compressImageToSize({
                                        data,
                                        type = 'image/jpeg',
                                        size = 300 * 1000, // 默认 300K左右
                                        qualityStep = 0.9, // 每次压缩比
                                    }) {
    if (getImageSizeByBase64(data) < size) {
        return Promise.resolve(data);
    }
    const loop = (d) => {
        return compressImage({
            data: d,
            type,
            quality: qualityStep,
        }).then(result => {
            const resultSize = getImageSizeByBase64(result);
            if (resultSize < size) {
                return Promise.resolve({base64Data: result, size: resultSize});
            }
            return loop(result);
        }, err => Promise.reject(err));
    };
    return loop(data);
}

/**
 * 根据用户上传的文件，获取图片信息
 * @param {Blob} file 任意文件
 * @param {Function} cb 获取图片信息的回调函数
 */
export function getImageFileInfo(file, cb) {
    const fileName = file.name;
    const fileSize = file.size;
    const fileType = file.type;
    if (fileType.startsWith('image')) { // 是图片
        getImageData(file).then(data => {
            cb(null, {
                name: fileName,
                size: fileSize,
                type: fileType,
                data,
            });
        }, err => cb(err));
    }
}

export function compressImageFile(file, {size, qualityStep}) {
    return new Promise((resolve, reject) => {
        getImageFileInfo(file, (err, result) => {
            if (err) {
                return reject(err);
            }
            if (result) {
                return compressImageToSize({
                    data: result.data,
                    type: result.type,
                    size,
                    qualityStep,
                }).then(({base64Data, size}) => {
                    resolve({base64Data, size, fileName: result.name, type: result.type});
                }).catch(() => {
                    reject(new Error('处理失败'));
                });
            }
        })
    });
};
