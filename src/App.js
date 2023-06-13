import './App.css';
import { ThemeProvider} from '@mui/material';
import { useEffect, useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store';
import { LightTheme, DarkTheme, ThemeContext } from './Theme/Theme.provider';
import { createBrowserRouter, BrowserRouter, Routes, Route } from 'react-router-dom';
import { Indexpage } from './IndexPage';
import { AnimePage } from './Anime';
import { HeaderLayout } from './components/header.layout';

function App() {
  const getTheme = ()=>{
    let theme = localStorage.getItem('theme')
    if(theme){
      document.documentElement.dataset.theme = theme == 'light' ? 'light' : 'dark'
      return theme == 'light' ? LightTheme : DarkTheme
    }
    return LightTheme
  }
  const [currentTheme, setcurrentTheme] = useState(getTheme())

  useEffect(()=>{
    let theme = currentTheme?.palette?.mode
    if(theme){
      document.documentElement.dataset.theme = theme == 'light' ? 'light' : 'dark'
      localStorage.setItem('theme', theme)
    }
  },[currentTheme])
  const toggleTheme = (isDark)=>{
    if(isDark){
      setcurrentTheme(DarkTheme)
      localStorage.setItem('theme', 'dark')
      return
    }
    setcurrentTheme(LightTheme)
    localStorage.setItem('theme', 'light')
  }
  document.body.style.background = currentTheme.custom.bodyBg
   return (
     <ThemeContext.Provider value={setcurrentTheme}>
       <Provider store={store}>
         <ThemeProvider theme={currentTheme}>
           <HeaderLayout>
           <Routes>
              <Route path="/" element={<Indexpage/>}/>
              <Route path="/anime/:id" element={<AnimePage/>}/>
            </Routes>
           </HeaderLayout>
         </ThemeProvider>
       </Provider>
     </ThemeContext.Provider>
  
  );
}

export default App;
