interface CurrencyBarProps {
  duckets: number;
  diamonds: number;
  credits: number;
}

export default async function CurrencyBar({
  duckets,
  diamonds,
  credits,
}: CurrencyBarProps) {
  return (
    <div className="w-full min-h-[60px] px-15 flex items-center justify-between bg-gray-900">
      <div className="flex gap-x-6">
        <div className="gap-x-3 flex">
          <div className="h-[25px] w-[25px] rounded-full nav-credit-icon outline-offset-[3px]"></div>
          <div className="text-gray-400">
            <span className="font-bold text-white">{credits}</span> Credits
          </div>
        </div>

        <div className="gap-x-3 flex">
          <div className="h-[25px] w-[25px] rounded-full nav-ducket-icon outline-offset-[3px]"></div>
          <div className="text-gray-400">
            <span className="font-bold text-white">{duckets}</span> Duckets
          </div>
        </div>

        <div className="gap-x-3 flex">
          <div className="h-[25px] w-[25px] rounded-full nav-diamond-icon outline-offset-[3px]"></div>
          <div className="text-gray-400">
            <span className="font-bold text-white">{diamonds}</span> Diamonds
          </div>
        </div>
      </div>
    </div>
  );
}
