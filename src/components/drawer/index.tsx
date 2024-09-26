import { MenuUnfoldOne } from "@icon-park/react";
import { Button, Card, CardBody, CardHeader, Modal, ModalContent } from "@nextui-org/react";

interface Props {
  isOpen: boolean;
  onClose: VoidFunction;
  onOpenChange: (open: boolean) => void;
  children?: React.ReactNode;
}

function Drawer({ isOpen, onClose, onOpenChange, children }: Props) {
  return (
    <Modal
      hideCloseButton
      scrollBehavior="inside"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      backdrop="opaque"
      size="full"
      classNames={{
        wrapper: "flex justify-start",
      }}
      motionProps={{
        variants: {
          enter: {
            x: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            x: 0,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
      className="rounded-md max-w-sm w-full h-screen max-h-screen"
    >
      <ModalContent>
        <Card radius="none" className="flex-1" shadow="none">
          <CardHeader className="flex gap-3">
            <Button size="sm" isIconOnly variant="light" onClick={onClose}>
              <MenuUnfoldOne theme="outline" size={18} className="dark:text-white" />
            </Button>
          </CardHeader>
          <CardBody className="block">{children}</CardBody>
        </Card>
      </ModalContent>
    </Modal>
  );
}

export default Drawer;
