import NotFoundImg from "./not-found.png";

function NotFound() {
  return (
    <div
      className="bg-background w-full flex flex-col items-center
     justify-items-center gap-8"
    >
      <img src={NotFoundImg} className="w-52 mt-20" />
      <h2 className="font-semibold">Page Not Found</h2>
    </div>
  );
}

export default NotFound;
