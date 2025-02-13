import Modal from "react-modal";
import { Issue } from "../../types/Issue";

Modal.setAppElement("#root");

type CardDetailsModalProps = {
  issue: Issue | null;
  isOpen: boolean;
  onClose: () => void;
};

export const CardDetailsModal = ({
  issue,
  isOpen,
  onClose,
}: CardDetailsModalProps) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    contentLabel="Issue Details"
    className="mx-auto mt-10 max-h-[80vh] w-full max-w-3xl overflow-auto rounded bg-white p-6 shadow-lg outline-none"
    overlayClassName="fixed inset-0 backdrop-blur-md flex justify-center items-start z-50"
  >
    {issue && (
      <div>
        <button
          onClick={onClose}
          className="mt-4 cursor-pointer rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Close
        </button>
        <div>
          <h2 className="text-2xl font-bold">{issue.title}</h2>
          <p className="mt-2">
            <strong>First Message:</strong>
          </p>
          <p className="mt-1 whitespace-pre-wrap">{issue.first}</p>
          <div className="mt-4">
            <strong>Messages:</strong>
            <div className="mt-1 bg-gray-100 p-2 whitespace-pre-wrap">
              {issue.messages.replace(/\n---\n/g, "\n---\n")}
            </div>
          </div>
        </div>
      </div>
    )}
  </Modal>
);
