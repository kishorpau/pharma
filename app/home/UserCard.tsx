import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

const UserCard = ({ user = {} }) => {
  const { name = "Unknown", location = "No location provided", id } = user;
  const router = useRouter();

  const handleUserClick = () => {
    if (id) {
      router.push(`/users/${id}`);
    }
  };

  console.log("Location:", location);

  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-lg bg-white p-8">
      <div className="px-6 py-4">
        <div className="font-bold text-2xl mb-4">{name}</div>

        <Image
          src="/images/pharmacy.jpg"
          alt="Pharmacy"
          width={250}
          height={250}
        />
      </div>
      <div className="px-6 pt-4 pb-2">
        <Button
          onClick={handleUserClick}
          className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition duration-300"
        >
          Visit Shop
        </Button>
      </div>
    </div>
  );
};

export default UserCard;
