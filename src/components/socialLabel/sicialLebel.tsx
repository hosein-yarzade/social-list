import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const SocialLabel = (props:string) => {
    const showIcons = (id:string) => {
        console.log(props)
        switch (id) {
            case "1":
                return <TelegramIcon/>;
            case "2":
                return <WhatsAppIcon/>;
            case "3":
                return <InstagramIcon/>;
            case "4":
                return <TwitterIcon/>;
            default :
                return ""
        }
    }
    return (
        <>
            {showIcons(props)}
        </>
    );
};

export default SocialLabel;
