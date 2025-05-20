import React, { useState } from "react";
import { useRouter } from "next/router";

const RecordForm = ({ data, onSubmit }) => {
  const router = useRouter();
  const [entry, setEntry] = useState(data);

  const updateEntry = (field, value) => {
    setEntry({ ...entry, [field]: value });
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <div className="flex justify-center p-6 bg-green-50 dark:bg-green-900 min-h-screen">
      <div className="border border-green-300 dark:border-green-700 bg-green-100 dark:bg-green-800 p-6 rounded-xl shadow-md flex flex-col gap-5 w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-900 dark:text-green-100 text-center">{entry._id ? "Actualizează cartea" : "Adaugă o carte nouă"}</h2>

        <input
          type="text"
          placeholder="Titlu"
          value={entry.title}
          onChange={(e) => updateEntry("title", e.target.value)}
          className="px-4 py-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-green-700 dark:text-white"
        />

        <input
          type="text"
          placeholder="Autor"
          value={entry.author}
          onChange={(e) => updateEntry("author", e.target.value)}
          className="px-4 py-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-green-700 dark:text-white"
        />

        <input
          type="text"
          placeholder="Gen"
          value={entry.genre}
          onChange={(e) => updateEntry("genre", e.target.value)}
          className="px-4 py-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-green-700 dark:text-white"
        />

        <textarea
          placeholder="Note"
          value={entry.notes}
          onChange={(e) => updateEntry("notes", e.target.value)}
          className="px-4 py-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none h-24 bg-white dark:bg-green-700 dark:text-white"
        />

        <input
          type="number"
          min={1}
          max={5}
          value={entry.rating}
          onChange={(e) => updateEntry("rating", parseInt(e.target.value))}
          className="px-4 py-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-green-700 dark:text-white"
          placeholder="Rating (1-5)"
        />

        <label className="flex items-center gap-2 text-green-800 dark:text-green-200">
          <input
            type="checkbox"
            checked={entry.read}
            onChange={(e) => updateEntry("read", e.target.checked)}
            className="accent-green-600"
          />
          Marcată ca citită
        </label>

        <input
          type="date"
          value={entry.dateAdded?.substring(0, 10)}
          onChange={(e) => updateEntry("dateAdded", e.target.value)}
          className="px-4 py-2 rounded-lg border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-green-700 dark:text-white"
        />

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow transition"
          >
            Anulează
          </button>
          <button
            type="button"
            onClick={() => onSubmit(entry)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition"
          >
            {entry._id ? "Actualizează" : "Adaugă"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordForm;