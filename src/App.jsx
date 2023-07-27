import { useRoutes } from "react-router-dom"
import { routers } from "./routers"
import { Suspense, useEffect } from 'react'
import '@/assets/css/tailwind.css'
import { useDispatch } from "react-redux"
import { cleartCheckinsAction } from "./store/userReducer"
import { clearDeleteCheckins, getDeleteCheckins } from "./utils/token"
import { notification } from "antd"


function App() {
  const element = useRoutes(routers)
  const dispath = useDispatch()
  useEffect(() => {
    const interval = setInterval(async () => {
      const currentTime = new Date();
      const currentDay = currentTime.getDate();
      const tomorrowMidnight = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentDay + 1, 0, 0, 0);

      if (currentTime >= tomorrowMidnight) {
        // Thực hiện sự kiện khi đến 0 giờ 0 phút 0 giây mỗi ngày
        console.log('Đã đến 0 giờ 0 phút 0 giây mỗi ngày');
        // Thực hiện các hành động khác tại đây\
        clearDeleteCheckins()
        await dispath(cleartCheckinsAction())
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {element}
    </Suspense>
  )
}

export default App
