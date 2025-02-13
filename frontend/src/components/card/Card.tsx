import { motion } from "framer-motion";
import { Issue } from "../../types/Issue";
import { CheckCircle, XCircle } from "lucide-react";

type CardProps = {
  issue: Issue;
  onOpenModal: (issue: Issue) => void;
};

export const Card = ({ issue, onOpenModal }: CardProps) => (
  <motion.div
    className="rounded border bg-white p-4 shadow"
    whileHover={{ scale: 1.01 }}
  >
    <h2 className="text-xl font-semibold">{issue.title}</h2>
    <p
      className={`mt-1 text-sm font-bold ${
        issue.state === "open"
          ? "text-green-600"
          : issue.state === "closed"
            ? "text-red-600"
            : "text-gray-600"
      }`}
    >
      <span className="inline-flex items-center">
        {issue.state === "open" ? (
          <CheckCircle className="mr-1 h-4 w-4" />
        ) : (
          <XCircle className="mr-1 h-4 w-4" />
        )}
        State: {issue.state}
      </span>
    </p>
    <button
      onClick={() => onOpenModal(issue)}
      className="mt-2 cursor-pointer rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
    >
      View Details
    </button>
  </motion.div>
);
