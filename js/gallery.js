const gallery = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

/* Render gallery */

const renderGallery = (pictures) => {

  const similarListFragment = document.createDocumentFragment();

  pictures.forEach(({id, url, description, comments, likes}) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.id = id;
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__img').alt = description;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.href = url;
    similarListFragment.append(picture);
  });
  gallery.append(similarListFragment);
};

/* Clear gallery */

const clearGallery = () => {

  const pictures = document.querySelectorAll('.picture');

  pictures.forEach((picture) => {
    picture.remove();
  });
};

export { renderGallery, clearGallery, gallery };
