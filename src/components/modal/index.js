import modalLayout from './index.html';
import createElement from '../../utils/createElement';
import './styles.scss';

export default class Modal {
  OPEN_TIME = 2000;

  BUILD_DELAY = 30;

  constructor({ title, content, blockClose }) {
    this.modalElement = createElement(modalLayout);
    this.modalElement.querySelector('h2').innerHTML = title;
    this.modalElement.insertAdjacentHTML('beforeend', content);

    this.modalBG = document.createElement('div');
    this.modalBG.classList.add('modal__background');
    this.modalBG.prepend(this.modalElement);
    this.showTransform = '20vh';

    if (!blockClose) this.addListeners();
  }

  show() {
    window.scrollTo(0, 0);
    document.body.prepend(this.modalBG);
    document.body.style = 'overflow: hidden';
    setTimeout(() => {
      this.modalElement.style = `transform: translateY(${this.showTransform})`;
      this.modalBG.style = 'background: rgba(0, 0, 0, 0.75)';
    }, 30);
  }

  close() {
    this.modalElement.style = '';
    this.modalBG.style = '';
    setTimeout(() => {
      document.body.removeChild(this.modalBG);
      document.body.style = '';
    }, this.OPEN_TIME);
  }

  addListeners() {
    this.modalBG.addEventListener('click', (event) => {
      if (event.target === event.currentTarget) this.close();
    });
  }
}
