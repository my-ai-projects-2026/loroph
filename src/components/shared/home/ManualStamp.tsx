const ManualStamp = () => {
  return (
    <div className="relative group transform -rotate-3 lg:-rotate-6 transition-transform duration-500 hover:rotate-0">
      <div
        role="img"
        aria-label="Traditional loyalty punch card"
        className="w-[280px] h-[180px] bg-[#fdfaf1] p-4 rounded-lg shadow-2xl flex flex-col relative overflow-hidden border border-amber-100"
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB2hiUB6HF0zaD14X6h2UylzjET2GwePVTyVAxdk61ExsCg2d6rqSdSjAQFQxCrniHH_s7ynLL-z4HGFBI-D7c1VnowhPoelkEtEyec6cA5cVV7H8GBS4KaenzbG7ATMQo3qgHLLwSg341QylYNst3p2hSgf02i8nznlx7Fp1rtXafZwOXpbgu9BvIpn4WaZWTxdfKMac4rvelXGiblS3_U5vUKqu91hwwEDExuk2IIfbTZ1CsP-YuYgUi8mz9-beqDxbsFcmMlFMI')",
          }}
        ></div>

        <div className="flex justify-between items-start mb-4">
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
          <div className="w-8 h-8 rounded-full border border-gray-200"></div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300"></div>
          <div className="w-12 h-12 rounded-full border-2 border-amber-300 flex items-center justify-center bg-blue-50/50">
            <span className="text-amber-600 font-bold rotate-12 scale-110">
              ✓
            </span>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300"></div>
          <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-300"></div>
        </div>

        <div className="mt-auto flex justify-center">
          <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest border border-red-500 px-2 py-0.5 rounded rotate-[-5deg]">
            NO PUNCH CARDS
          </span>
        </div>
      </div>
    </div>
  );
};
export default ManualStamp;
