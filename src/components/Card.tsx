import { Button } from "@/components/ui/button";

function Card({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <div className="max-w-sm mx-auto rounded-lg shadow-lg overflow-hidden border-4 border-[#D4AF37] bg-[#F2E2C5] card-hover">
      <div className="bg-[#4A606B] text-white text-center py-4 relative">
        <h2 className="text-xl font-bold">{title}</h2>
        <div className="absolute top-1/2 left-0 w-4 h-4 bg-[#D4AF37] rounded-full transform -translate-y-1/2 -translate-x-1/2"></div>
        <div className="absolute top-1/2 right-0 w-4 h-4 bg-[#D4AF37] rounded-full transform -translate-y-1/2 translate-x-1/2"></div>
      </div>

      <div className="h-48 relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover border-t-4 border-b-4 border-[#D4AF37]"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      <div className="bg-[#F2E2C5] p-4 text-center relative flex flex-col items-center justify-center space-y-4">
        <p className="text-gray-800">{description}</p>
        <Button className="bg-[#8e610c] text-white rounded-full px-6 py-2 hover:bg-[#2c562b] flex items-center justify-center space-x-2 hover:cursor-pointer">
          <span>Découvrir</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 2.25c-5.376 0-9.75 4.374-9.75 9.75s4.374 9.75 9.75 9.75 9.75-4.374 9.75-9.75-4.374-9.75-9.75-9.75zm0 1.5a8.25 8.25 0 1 1 0 16.5 8.25 8.25 0 0 1 0-16.5zm2.25 4.5-1.5 4.5-4.5 1.5 1.5-4.5 4.5-1.5z"
            />
          </svg>
        </Button>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-10 h-1 bg-[#D4AF37] rounded-full"></div>
      </div>
    </div>
  );
}

export default Card;
