import {
  Button,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  OrderedList,
  Text,
} from '@chakra-ui/react';

type ExplanationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ExplanationModal = ({
  isOpen,
  onClose,
}: ExplanationModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size='lg' isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Instructions</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb='25px'>
            Cette application est un générateur de combinaison aléatoire.
          </Text>
          <OrderedList>
            <ListItem>
              Choisissez le nombre d'élément à générer aléatoirement
            </ListItem>
            <ListItem>
              Rentrez des valeurs (séparées par un passage à la ligne) dans
              chaque liste
            </ListItem>
            <ListItem>Cliquez sur le bouton</ListItem>
            <ListItem>
              Et vous voilà avec une liste d'éléments générés !
            </ListItem>
          </OrderedList>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Fermer
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
