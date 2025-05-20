import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { deleteRecord, getRecords } from "@/utils/recordsFunctions";

const MainPage = () => {
  const router = useRouter();
  const [records, setRecords] = useState([]);

  const fetchRecords = async () => {
    try {
      const response = await getRecords();
      setRecords(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteRecord = async (id) => {
    try {
      const response = await deleteRecord(id);
      if (response.deletedCount === 1) {
        const newRecords = records.filter((record) => record._id !== id);
        setRecords(newRecords);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateRecord = (id) => {
    router.push(`/carti/edit?id=${id}`);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="min-h-screen bg-green-50 dark:bg-green-900 py-10 px-4">
      {/* Titlu */}
      <h1 className="text-4xl font-bold text-center text-green-800 dark:text-green-100 mb-6">
        Cărțile mele
      </h1>

      {/* Buton Adăugare */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => router.push("/carti/add")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
        >
          + Adaugă carte
        </button>
      </div>

      {/* Listă cărți */}
      <div className="flex flex-col items-center space-y-6">
        {records.map((record) => (
          <div
            key={record._id}
            className="w-full max-w-2xl bg-green-100 dark:bg-green-800 border border-green-300 dark:border-green-700 rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-semibold text-green-900 dark:text-green-100 mb-3">
              {record.title}
            </h2>
            <div className="text-green-800 dark:text-green-200 space-y-1 mb-4">
              <p><strong>Autor:</strong> {record.author}</p>
              <p><strong>Gen:</strong> {record.genre}</p>
              <p><strong>Status:</strong> {record.read ? "Citită" : "De citit"}</p>
              <p><strong>Rating:</strong> {record.rating}/5</p>
              <p><strong>Adăugată la:</strong> {new Date(record.dateAdded).toLocaleDateString()}</p>
              <p><strong>Note:</strong> {record.notes}</p>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => handleUpdateRecord(record._id)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteRecord(record._id)}
                className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
