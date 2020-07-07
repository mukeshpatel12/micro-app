import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

interface Props {
  openModal: boolean;
  toggle: () => void;
  currentQuestion: QueInterface
}

interface QueInterface {
  title: string;
  link: string
}

const TitleModal = ({ openModal, toggle, currentQuestion } : Props) => (
  <>
    <Modal isOpen={openModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Question: </ModalHeader>
      <ModalBody>
        <p>{currentQuestion.title}</p>
        <p>
          Link:
          <a href={currentQuestion.link} target='_blank' rel="noopener noreferrer">
            click here to visit page
          </a>
        </p>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  </>
)

export default TitleModal