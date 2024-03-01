import { CssBaseline, ThemeProvider } from "@mui/material";
import Dashboard from "./dashboard/dashboard";
import React, { useState } from "react";
import { Route, Routes } from 'react-router';
import Login from "./pages/login";
import Web from './scenes/web'
import Mobile from './scenes/mobile'
import Iot from './scenes/iot'
import ProductInfo from "./pages/productinfo";
import Signup from './pages/signup'
import Orginfo from "./pages/orginfo";
import Controls from "./pages/controls"
import Chatbot from "./pages/Chatbot";
import Firstpage from "./pages/firstpage"



function App() {

  return (
    <>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/firstpage" element={<Firstpage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/controls/:control" element={<Controls />} />
        <Route path="/controls/:control" element={<Chatbot />} />

        {/* <Route path="/web" element={<Page page="web" />} />
            <Route path="/mobile" element={<Page page="mobile" />} />
            <Route path="/iot" element={<Page page="iot" />} /> */}
        <Route path="/productinfo" element={<ProductInfo />} />
        <Route path="/orginfo" element={<Orginfo />} />

      </Routes>
    </>
  );
}


// function Page (props){
//   const {page} = props

//   const [theme, colorMode] = useMode();
//   const [isSidebar, setIsSidebar] = useState(true);

//   return (
//     <ColorModeContext.Provider value= {colorMode}>
//       <ThemeProvider theme ={theme}>
//         <CssBaseline/>
//         <div className="app">
//           <Sidebar isSidebar={isSidebar} />
//           <main className="content">
//             <Topbar setIsSidebar={setIsSidebar}/>
//             <div style={{
//               marginTop: '80px',
//               marginLeft: '270px'
//             }}>
//               { 
//                  page === "web" 
//                 ? <Web />
//                 : page === "mobile"
//                 ? <Mobile />
//                 : page === "iot"
//                 ? <Iot />
//                 : <Dashboard />
//               }
//             </div>

//           </main>
//         </div>
//     </ThemeProvider>
//   </ColorModeContext.Provider>
//   )
//  }
export default App;
