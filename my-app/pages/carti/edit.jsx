import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RecordForm from "@/components/RecordForm";
import { getRecordById, updateRecord } from "@/utils/recordsFunctions";

const EditPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchRecord = async () => {
        try {
          const record = await getRecordById(id);
          setData(record);
        } catch (error) {
          console.error("Eroare la preluarea cărții:", error);
        }
      };
      fetchRecord();
    }
  }, [id]);

  const handleSubmit = async (updatedData) => {
    try {
      await updateRecord(id, updatedData);
      router.push("/");
    } catch (error) {
      console.error("Eroare la actualizare:", error);
    }
  };

  return data ? <RecordForm data={data} onSubmit={handleSubmit} /> : <p>Se încarcă...</p>;
};

export default EditPage;
