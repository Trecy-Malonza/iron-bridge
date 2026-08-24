const WHATSAPP_URL =
  "https://wa.me/254700000000?text=Hello%20IronBridge%2C%20I%27d%20like%20to%20enquire%20about%20industrial%20space.";

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-[90] inline-flex h-14 w-14 animate-bounce items-center justify-center rounded-full bg-[#25D366] shadow-float transition hover:scale-105"
      style={{ animationDuration: "2.5s" }}
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.95 1.16-.17.2-.35.22-.65.07-.3-.15-1.12-.41-2.14-1.32-.79-.7-1.32-1.57-1.47-1.87-.15-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.19-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47 0 1.45 1.06 2.86 1.21 3.06.15.2 2.09 3.19 5.06 4.47.71.3 1.26.48 1.69.62.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35zM12.02 21.5h-.01a9.44 9.44 0 0 1-4.8-1.31l-.35-.2-3.57.93.96-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.98 6.67 2.77a9.38 9.38 0 0 1 2.76 6.68c0 5.2-4.24 9.43-9.45 9.43zM20.1 3.9A11.3 11.3 0 0 0 12.02.55C5.78.55.71 5.62.71 11.86c0 2 .52 3.94 1.51 5.66L.5 23.45l6.07-1.59a11.3 11.3 0 0 0 5.44 1.39h.01c6.23 0 11.31-5.07 11.31-11.31 0-3.02-1.18-5.86-3.23-8.04z" />
      </svg>
    </a>
  );
}
