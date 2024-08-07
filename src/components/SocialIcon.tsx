import Image from "next/image";

interface SocialIconProps {
	type: 'whatsapp' | 'instagram';
	username: string;
	message?: string;
  }
  
  const socialDetails = {
	whatsapp: {
	  baseUrl: 'https://wa.me/',
	  icon: '/whatsapp.svg',
	  alt: 'WhatsApp'
	},
	instagram: {
	  baseUrl: '',
	  icon: '/instagram.svg',
	  alt: 'Instagram'
	}
  }
  
  const SocialIcon: React.FC<SocialIconProps> = ({ type, username, message }) => {
	const { baseUrl, icon, alt } = socialDetails[type];
	let url = `${baseUrl}${username}`;
  
	if (type === 'whatsapp' && message) {
	  url += `?text=${encodeURIComponent(message)}`;
	}
  
	return (
	  <a
		href={url}
		target='_blank'
		rel='noopener noreferrer'
	  >
		<Image src={icon} alt={alt} width={24} height={24} />
	  </a>
	);
  }
  
  export default SocialIcon;