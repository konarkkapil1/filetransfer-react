import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalExample = (props) => {
  const {
    buttonLabel,
    className,
    title,
    body,
    toplabel
  } = props;

  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal);

  return (
      <React.Fragment>
        <Modal className="info-modal" isOpen={modal} toggle={toggle} className={className}>
            <ModalHeader toggle={toggle}>{title}</ModalHeader>
            <ModalBody>
            <h6>{toplabel}</h6>
            <h5>{body}</h5>
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={toggle}>Close</Button>
            </ModalFooter>
        </Modal>
      </React.Fragment>
  );
}

export default ModalExample;