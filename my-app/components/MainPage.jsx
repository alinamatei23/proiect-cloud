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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4">
      {/* Titlu */}
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">
        Cărțile mele
      </h1>

      {/* Buton Adăugare */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => router.push("/carti/add")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
        >
          + Adaugă carte
        </button>
      </div>

      {/* Listă cărți */}
      <div className="flex flex-col items-center space-y-6">
        {records.map((record) => (
          <div
            key={record._id}
            className="w-full max-w-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-6"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              {record.title}
            </h2>
            <div className="text-gray-700 dark:text-gray-300 space-y-1 mb-4">
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
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteRecord(record._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
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
