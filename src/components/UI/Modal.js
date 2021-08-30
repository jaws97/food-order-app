import classes from "./Modal.module.css";
import ReactDom from 'react-dom';

const Backdrop = (props) => {
  return <div className={classes.backdrop}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div>
      <div className={classes.modal} onClick={props.onClose}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays')

function Modal(props) {
  return (
    <>
      {ReactDom.createPortal(<Backdrop onClose={props.onClick} />, portalElement)}
      {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </>
  );
}

export default Modal;
