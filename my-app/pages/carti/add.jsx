import RecordForm from "@/components/RecordForm";
import { addRecord } from "@/utils/recordsFunctions";
import { useRouter } from "next/router";

const AddPage = () => {
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      await addRecord(data);
      router.push("/");
    } catch (error) {
      console.error("Eroare la adăugare:", error);
    }
  };

  return (
    <RecordForm
      data={{
        title: "",
        author: "",
        genre: "",
        read: false,
        notes: "",
        rating: 1,
        dateAdded: new Date().toISOString().substring(0, 10),
      }}
      onSubmit={handleSubmit}
    />
  );
};

export default AddPage;
