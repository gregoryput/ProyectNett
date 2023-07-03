import { useEffect, useState } from "react";
import { NotificationContainer } from "../components";



export default function Notification({showbolean, message}) {
    const [show, setShow] = useState(showbolean);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setShow(false);
      }, 5000);
  
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <>
        {show && (
          <NotificationContainer show={show}>
            <p>¡Notificación!</p>
          </NotificationContainer>
        )}
      </>
    );
  }
  