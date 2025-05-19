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
    <div className="flex justify-center p-4">
      <div className="border p-4 rounded-md shadow-sm flex flex-col gap-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Titlu"
          value={entry.title}
          onChange={(e) => updateEntry("title", e.target.value)}
          className="input"
        />

        <input
          type="text"
          placeholder="Autor"
          value={entry.author}
          onChange={(e) => updateEntry("author", e.target.value)}
          className="input"
        />

        <input
          type="text"
          placeholder="Gen"
          value={entry.genre}
          onChange={(e) => updateEntry("genre", e.target.value)}
          className="input"
        />

        <textarea
          placeholder="Note"
          value={entry.notes}
          onChange={(e) => updateEntry("notes", e.target.value)}
          className="textarea"
        />

        <input
          type="number"
          min={1}
          max={5}
          value={entry.rating}
          onChange={(e) => updateEntry("rating", parseInt(e.target.value))}
          className="input"
          placeholder="Rating (1-5)"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={entry.read}
            onChange={(e) => updateEntry("read", e.target.checked)}
          />
          Marcată ca citită
        </label>

        <input
          type="date"
          value={entry.dateAdded?.substring(0, 10)}
          onChange={(e) => updateEntry("dateAdded", e.target.value)}
          className="input"
        />

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="btn bg-red-600 hover:bg-red-700"
          >
            Anulează
          </button>
          <button
            type="button"
            onClick={() => onSubmit(entry)}
            className="btn bg-green-600 hover:bg-green-700"
          >
            {entry._id ? "Actualizează" : "Adaugă"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordForm;
