import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "./Card";
import { BarLoader } from "react-spinners";
import type { Issue } from "../../types/Issue";

type CardListProps = {
  onOpenModal: (issue: Issue) => void;
};

export const CardList = ({ onOpenModal }: CardListProps) => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageInput, setPageInput] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const pageSize = 9;

  useEffect(() => {
    const fetchIssues = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/data.json");
        if (Array.isArray(response.data)) {
          setIssues(response.data);
        } else if (
          response.data.issues &&
          Array.isArray(response.data.issues)
        ) {
          setIssues(response.data.issues);
        } else {
          console.error("Unexpected data format:", response.data);
          setIssues([]);
        }
      } catch (error) {
        console.error("Error fetching issues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, []);

  useEffect(() => {
    setPageInput(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(issues.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedIssues = issues.slice(startIndex, endIndex);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center py-10">
          <BarLoader color="#3498db" width={200} />
        </div>
      ) : (
        <>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {paginatedIssues.map((issue) => (
              <Card key={issue.id} issue={issue} onOpenModal={onOpenModal} />
            ))}
          </div>

          {totalPages > 1 && (
            <nav
              className="my-4 border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
              aria-label="Pagination"
            >
              <div className="flex flex-col items-center justify-between sm:flex-row">
                <div className="flex flex-col items-center gap-2 sm:flex-row">
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">{startIndex + 1}</span> to{" "}
                    <span className="font-medium">
                      {Math.min(endIndex, issues.length)}
                    </span>{" "}
                    of <span className="font-medium">{issues.length}</span>{" "}
                    results
                  </p>

                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="pageInput"
                      className="text-sm text-gray-700"
                    >
                      Go to page:
                    </label>
                    <input
                      id="pageInput"
                      type="number"
                      min="1"
                      max={totalPages}
                      value={pageInput}
                      onChange={(e) => setPageInput(Number(e.target.value))}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          const newPage = Number(e.currentTarget.value);
                          if (newPage >= 1 && newPage <= totalPages) {
                            setCurrentPage(newPage);
                          }
                        }
                      }}
                      className="w-16 rounded border border-gray-300 p-1"
                    />
                    <p>
                      Make sure to press{" "}
                      <span className="font-bold uppercase">enter</span>
                    </p>
                  </div>
                </div>

                <div className="mt-2 flex flex-1 justify-between sm:mt-0 sm:justify-end">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 duration-150 ring-inset focus:outline-none ${
                      currentPage === 1
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer hover:bg-gray-200"
                    }`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 duration-150 ring-inset focus:outline-none ${
                      currentPage === totalPages
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer hover:bg-gray-200"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </nav>
          )}
        </>
      )}
    </div>
  );
};
