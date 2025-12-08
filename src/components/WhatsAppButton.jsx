const WhatsAppButton = () => {
  // Reemplaza con tu número de WhatsApp (formato: país + número sin espacios)
  const phoneNumber = '234541371'; // Ejemplo: '5491234567890' para Argentina
  const message = '¡Hola! Me gustaría obtener más información.'; // Mensaje por defecto

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button 
      className="whatsapp-button"
      onClick={handleWhatsAppClick}
      title="Contáctanos por WhatsApp"
      aria-label="Botón de WhatsApp"
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    </button>
  );
};

export default WhatsAppButton;
