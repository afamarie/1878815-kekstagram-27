const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const DEFAULT_IMAGE = 'img/upload-default-image.jpg';
const preview = document.querySelector('.img-upload__preview-image');
const fileChooser = document.querySelector('.img-upload__input[type=file]');

/* Show user's image in upload form */

const onChangeAddImage = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
};

/* Clear user's image */

const clearImage = () => {
  preview.src = DEFAULT_IMAGE;
};

fileChooser.addEventListener('change', onChangeAddImage);

export {clearImage};
