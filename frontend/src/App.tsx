import { useState } from "react";
import { Header } from "./components/ui/Header";
import { Footer } from "./components/ui/Footer";
import { CardList } from "./components/card/CardList";
import { CardDetailsModal } from "./components/card/CardDetailsModal";
import { Issue } from "./types/Issue";

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  const openModal = (issue: Issue) => {
    setSelectedIssue(issue);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedIssue(null);
    setModalIsOpen(false);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex-grow p-4">
        <CardList onOpenModal={openModal} />
      </main>
      <Footer />
      <CardDetailsModal
        issue={selectedIssue}
        isOpen={modalIsOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default App;
