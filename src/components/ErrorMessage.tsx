export default function ErrorMessage({children} : { children : React.ReactNode }) {
  return (
    <p className="bg-red-100 rounded-md py-2 text-center text-red-800 font-bold">
    {children}
    </p>
  );
};