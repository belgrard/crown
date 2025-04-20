export interface BoxProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function Box({ title, description, children }: BoxProps) {
  return (
    <div className="bg-gray-900 shadow">
      <div className="flex gap-x-2 border-b border-gray-700 bg-gray-900 p-3 rounded-t">
        <div className="w-[50px] h-[50px] relative flex items-center justify-center hotel-icon rounded-full"></div>
        <div className="flex flex-col justify-center text-sm">
          <p className="font-semibold text-gray-300">{title}</p>
          <p className="text-gray-500">{description}</p>
        </div>
      </div>
      <div className="bg-gray-900 rounded-b p-5 text-gray-300">{children}</div>
    </div>
  );
}
