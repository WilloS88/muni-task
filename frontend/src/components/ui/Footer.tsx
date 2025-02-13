import { Github as GithubIcon } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mx-auto flex w-full min-w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-5 py-6 text-gray-600">
      <span className="text-sm">
        © {currentYear} John Doe Company, Inc. All rights reserved.
      </span>

      <div className="flex gap-4">
        <a href="#" className="transition hover:text-gray-900" target="_blank">
          <GithubIcon size={20} />
        </a>
      </div>
    </footer>
  );
};
