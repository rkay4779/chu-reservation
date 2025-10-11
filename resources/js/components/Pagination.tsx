import React from "react";
import { router } from "@inertiajs/react";

interface Link {
  url: string | null;
  label: string;
  active: boolean;
}

interface Props {
  links: Link[];
}

const Pagination: React.FC<Props> = ({ links }) => {
  return (
    <div className="flex space-x-2 mt-4 justify-center">
      {links.map((link, i) => (
        <button
          key={i}
          disabled={!link.url}
          onClick={() => link.url && router.visit(link.url)}
          className={`px-3 py-1 border rounded ${
            link.active ? "bg-blue-500 text-white" : "bg-white text-gray-700"
          }`}
          dangerouslySetInnerHTML={{ __html: link.label }}
        />
      ))}
    </div>
  );
};

export default Pagination;
